const nodemailer = require("nodemailer");


// ==========================================
// SMTP TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),

    secure: process.env.SMTP_SECURE === "true",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },

    
});


// ==========================================
// VERIFY SMTP CONNECTION
// ==========================================




// ==========================================
// SEND EMAIL
// ==========================================




module.exports = {
    transporter,
     
};