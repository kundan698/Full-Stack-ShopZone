const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { transporter } = require("../../../../middleware/Config/nodemailer");
const { PendingRegistration } = require("../../../../Modal/website/user/register-modal");
const { status } = require("init");
const jwt = require('jsonwebtoken');
const { User } = require("../../../../Modal/website/user/User-Modal");

// Configuration constants
const SALT_ROUNDS = 12;
const MAX_OTP_ATTEMPTS = 5;
const OTP_EXPIRES_MINUTES = Number(process.env.OTP_EXPIRES_MINUTES) || 5;

// Temporary OTP storage: email => { otpHash, expiresAt, attempts, userData }
const MyMap = new Map();

/**
 * Generate a random 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Hash OTP using SHA256
 */
const hashOTP = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

/**
 * User sign up - Generate and send OTP to email
 */




const UserSignUp = async (request, response) => {
  try {

    const {
      username,
      email,
      password,
      confirmPassword,
      phone
    } = request.body;


    // ==========================================
    // 1. Required validation
    // ==========================================

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone
    ) {
      return response.status(400).json({
        status: 0,
        message:
          "Username, email, password, confirmPassword and phone are required"
      });
    }


    // ==========================================
    // 2. Normalize
    // ==========================================

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.toString().trim();


    // ==========================================
    // 3. Username validation
    // ==========================================

    if (cleanUsername.length < 3) {
      return response.status(400).json({
        status: 0,
        message:
          "Username must be at least 3 characters"
      });
    }

    if (cleanUsername.length > 20) {
      return response.status(400).json({
        status: 0,
        message:
          "Username cannot exceed 20 characters"
      });
    }

    const usernameRegex = /^[A-Za-z]/;

    if (!usernameRegex.test(cleanUsername)) {
      return response.status(400).json({
        status: 0,
        message:
          "Invalid username character"
      });
    }


    // ==========================================
    // 4. Email validation
    // ==========================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return response.status(400).json({
        status: 0,
        message:
          "Please enter a valid email address"
      });
    }


    // ==========================================
    // 5. Phone validation
    // ==========================================

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(cleanPhone)) {
      return response.status(400).json({
        status: 0,
        message:
          "Please enter a valid 10 digit phone number"
      });
    }


    // ==========================================
    // 6. Password validation
    // ==========================================

    if (password.length < 8) {
      return response.status(400).json({
        status: 0,
        message:
          "Password must contain at least 8 characters"
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

    if (!passwordRegex.test(password)) {
      return response.status(400).json({
        status: 0,
        message:
          "Password must contain uppercase, lowercase, number and special character"
      });
    }


    // ==========================================
    // 7. Confirm password
    // ==========================================

    if (password !== confirmPassword) {
      return response.status(400).json({
        status: 0,
        message:
          "Password and confirm password do not match"
      });
    }


    // ==========================================
    // 8. CHECK ACTUAL USER DATABASE
    // ==========================================

    const existingUser = await User.findOne({
      $or: [
        { email: cleanEmail },
        { phone: cleanPhone }
      ]
    });

    if (existingUser) {

      if (existingUser.email === cleanEmail) {
        return response.status(409).json({
          status: 0,
          message:
            "Email already registered"
        });
      }

      if (existingUser.phone === cleanPhone) {
        return response.status(409).json({
          status: 0,
          message:
            "Phone number already registered"
        });
      }
    }


    // ==========================================
    // 9. Remove old pending registration
    // ==========================================

    await PendingRegistration.deleteMany({
      $or: [
        { email: cleanEmail },
        { phone: cleanPhone }
      ]
    });


    // ==========================================
    // 10. Generate OTP
    // ==========================================

    const userOtp = generateOTP();

    const otpHash = hashOTP(userOtp);

    const expiresAt =
      Date.now() +
      OTP_EXPIRES_MINUTES * 60 * 1000;


    // ==========================================
    // 11. Hash password
    // ==========================================

    const hashedPassword =
      await bcrypt.hash(
        password,
        SALT_ROUNDS
      );


    // ==========================================
    // 12. TEMPORARY DATABASE RECORD
    // ==========================================

    const pendingUser =
      await PendingRegistration.create({

        username: cleanUsername,

        email: cleanEmail,

        password: hashedPassword,

        phone: cleanPhone,

        otpHash: otpHash,

        otpExpiresAt:
          new Date(expiresAt),

        isVerified: false,

        otpAttempts: 0
      });


    console.log(
      "PENDING REGISTRATION CREATED:",
      pendingUser._id,
      pendingUser.email
    );


    // ==========================================
    // 13. SEND OTP EMAIL
    // ==========================================

    try {

      await transporter.sendMail({

        to: cleanEmail,

        subject:
          "Email Verification OTP",

        html: `
          <div style="font-family: Arial;">

            <h2>Verify Your Email</h2>

            <p>Hello ${cleanUsername},</p>

            <p>Your registration OTP is:</p>

            <h1>${userOtp}</h1>

            <p>
              This OTP will expire in
              ${OTP_EXPIRES_MINUTES} minutes.
            </p>

          </div>
        `
      });

      console.log(userOtp, "OTP sent to:", cleanEmail);

    } catch (mailError) {

      console.error(
        "SMTP SEND ERROR:",
        mailError
      );

      await PendingRegistration.findByIdAndDelete(
        pendingUser._id
      );

      return response.status(500).json({
        status: 0,
        message:
          "Unable to send OTP email. Please try again."
      });
    }


    // ==========================================
    // 14. SUCCESS
    // ==========================================

    return response.status(200).json({

      status: 1,

      message:
        "Registration created and OTP sent successfully",

      data: {

        id: pendingUser._id,

        email: pendingUser.email,

        expiresIn:
          OTP_EXPIRES_MINUTES * 60,

        // ONLY FOR PLAYWRIGHT TESTING
        userOtp: userOtp
      }
    });

  } catch (err) {

    console.error(
      "UserSignUp Error:",
      err
    );

    if (err.code === 11000) {
      return response.status(409).json({
        status: 0,
        message:
          "Email or phone number already registered"
      });
    }

    return response.status(500).json({
      status: 0,
      message:
        "Internal server error"
    });
  }
};

/**
 * Verify OTP and register user
 */
const VerifyOTP = async (request, response) => {
  try {

    const {
      email,
      otp
    } = request.body;


    // ==========================================
    // 1. Required validation
    // ==========================================

    if (!email || !otp) {
      return response.status(400).json({
        status: 0,
        message:
          "Email and OTP are required"
      });
    }


    // ==========================================
    // 2. Normalize
    // ==========================================

    const cleanEmail =
      email.trim().toLowerCase();

    const cleanOtp =
      otp.toString().trim();


    // ==========================================
    // 3. OTP format validation
    // ==========================================

    if (!/^\d{6}$/.test(cleanOtp)) {
      return response.status(400).json({
        status: 0,
        message:
          "OTP must be exactly 6 digits"
      });
    }


    // ==========================================
    // 4. FIND TEMPORARY REGISTRATION
    // ==========================================

    const pendingRegistration =
      await PendingRegistration.findOne({
        email: cleanEmail
      });


    if (!pendingRegistration) {
      return response.status(404).json({
        status: 0,
        message:
          "Registration not found or OTP expired"
      });
    }


    // ==========================================
    // 5. OTP EXPIRY CHECK
    // ==========================================

    if (
      !pendingRegistration.otpExpiresAt ||
      Date.now() >
      pendingRegistration.otpExpiresAt.getTime()
    ) {

      await PendingRegistration.deleteOne({
        _id: pendingRegistration._id
      });

      return response.status(400).json({
        status: 0,
        message:
          "OTP has expired. Please request a new OTP."
      });
    }


    // ==========================================
    // 6. COMPARE OTP
    // ==========================================

    const enteredOtpHash =
      hashOTP(cleanOtp);


    if (
      enteredOtpHash !==
      pendingRegistration.otpHash
    ) {

      pendingRegistration.otpAttempts += 1;

      await pendingRegistration.save();

      return response.status(400).json({
        status: 0,
        message:
          "Invalid OTP"
      });
    }


    // ==========================================
    // 7. FINAL DUPLICATE CHECK
    // ==========================================

    const existingUser =
      await User.findOne({
        $or: [
          {
            email:
              pendingRegistration.email
          },
          {
            phone:
              pendingRegistration.phone
          }
        ]
      });


    if (existingUser) {

      if (
        existingUser.email ===
        pendingRegistration.email
      ) {
        return response.status(409).json({
          status: 0,
          message:
            "Email already registered"
        });
      }

      if (
        existingUser.phone ===
        pendingRegistration.phone
      ) {
        return response.status(409).json({
          status: 0,
          message:
            "Phone number already registered"
        });
      }
    }


    // ==========================================
    // 8. CREATE PERMANENT USER
    // ==========================================

    const newUser =
      await User.create({

        username:
          pendingRegistration.username,

        email:
          pendingRegistration.email,

        password:
          pendingRegistration.password,

        phone:
          pendingRegistration.phone,

        isVerified: true
      });


    console.log(
      "NEW USER CREATED:",
      newUser._id,
      newUser.email
    );


    // ==========================================
    // 9. DELETE TEMPORARY RECORD
    // ==========================================

    await PendingRegistration.deleteOne({
      _id: pendingRegistration._id
    });


    // ==========================================
    // 10. SUCCESS
    // ==========================================

    return response.status(201).json({

      status: 1,

      success: true,

      message:
        "Email verified and user registered successfully",

      data: {

        id: newUser._id,

        username:
          newUser.username,

        email:
          newUser.email,

        phone:
          newUser.phone,

        isVerified:
          newUser.isVerified
      }
    });

  } catch (err) {

    console.error(
      "VerifyOTP Error:",
      err
    );


    if (err.code === 11000) {
      return response.status(409).json({
        status: 0,
        message:
          "Email or phone number already registered"
      });
    }


    return response.status(500).json({
      status: 0,
      message:
        "Internal server error"
    });
  }
};

// ==========================================
// USER LOGIN
// ==========================================

const UserLogin = async (request, response) => {
  try {

    const { email, password } = request.body;


    // ==========================================
    // 1. Required Validation
    // ==========================================

    if (!email || !password) {
      return response.status(400).json({
        status: 0,
        message: "Email and password are required",
      });
    }


    // ==========================================
    // 2. Normalize Email
    // ==========================================

    const cleanEmail =
      email.trim().toLowerCase();


    // ==========================================
    // 3. Email Format Validation
    // ==========================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return response.status(400).json({
        status: 0,
        message:
          "Please enter a valid email address",
      });
    }


    // ==========================================
    // 4. Find User By Email ONLY
    // ==========================================

    const user = await User.findOne({
      email: cleanEmail,
    });


    // ==========================================
    // 5. User Not Found
    // ==========================================

    if (!user) {
      return response.status(401).json({
        status: 0,
        message:
          "Invalid email or password",
      });
    }


    // ==========================================
    // 6. Check Email Verification
    // ==========================================

    if (!user.isVerified) {
      return response.status(403).json({
        status: 0,
        message:
          "Please verify your email before login",
      });
    }


    // ==========================================
    // 7. Compare Password
    // ==========================================

    const isPasswordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    // ==========================================
    // 8. Password NOT Match
    // ==========================================

    if (!isPasswordMatch) {
      return response.status(401).json({
        status: 0,
        message:
          "Invalid email or password",
      });
    }


    // ==========================================
    // 9. ONLY AFTER EMAIL + PASSWORD MATCH
    //    CREATE JWT TOKEN
    // ==========================================

    const token = jwt.sign(
      {
        userId: user._id,
       
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );


    // ==========================================
    // 10. Remove Password From Response
    // ==========================================

    const userResponse =
      user.toObject();

    delete userResponse.password;


    // ==========================================
    // 11. Login Success
    // ==========================================

    return response.status(200).json({

      status: 1,

      message:
        "Login successful",

      token,

      user: userResponse,
    });


  } catch (error) {

    console.error(
      "User Login Error:",
      error
    );

    return response.status(500).json({
      status: 0,
      message:
        "Internal server error",
    });
  }
};


module.exports = {
  UserSignUp,
  VerifyOTP,
  UserLogin
};
