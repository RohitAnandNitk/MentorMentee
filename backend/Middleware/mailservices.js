import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMailForQuery = async ({ name, email, subject, message }) => {
  try {
    // Configure Nodemailer Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Helps prevent SSL certificate issues
      },
    });

    // Send Email to Admin
    let adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "mentormentee000@gmail.com", // Change to your admin email
      subject: `New Query: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };
    await transporter.sendMail(adminMailOptions);

    // Send Confirmation Email to User
    let userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for your query at MentorMentee",
      text: `Hi ${name},\n\nThank you for reaching out. We have received your query and will get back to you soon.\n\nBest Regards,\nYour Support Team Mentor-Mentee`,
    };
    await transporter.sendMail(userMailOptions);

    console.log("mail send successfully !");
    return true;
  } catch (error) {
    console.log("Error at mailservice : ", error);
    return false;
  }
};
