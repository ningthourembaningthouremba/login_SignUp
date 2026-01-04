import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export const sendEmail = async (to, subject, html) => {
  console.log(to);
  console.log(process.env.EMAIL_PASS);
  console.log(process.env.EMAIL_USER);

 
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,           // ✅ dynamic
      subject,      // ✅ dynamic
      html,         // ✅ dynamic
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Email could not be sent");
  }
};
