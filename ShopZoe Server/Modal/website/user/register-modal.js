const mongoose = require("mongoose");

const pendingRegistrationSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    otpHash: {
      type: String,
      required: true,
    },

    otpExpiresAt: {
      type: Date,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otpAttempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


// ==========================================
// TTL
// OTP expire hone ke baad document automatically
// delete ho jayega
// ==========================================

pendingRegistrationSchema.index(
  { otpExpiresAt: 1 },
  {
    expireAfterSeconds: 0,
  }
);


// ==========================================
// IMPORTANT
// Pending registration par email/phone unique
// nahi rakha gaya
// ==========================================

const PendingRegistration = mongoose.model(
  "PendingRegistration",
  pendingRegistrationSchema
);

module.exports = {
  PendingRegistration,
};