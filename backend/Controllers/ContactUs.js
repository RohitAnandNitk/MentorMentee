import { sendMailForQuery } from "../Middleware/mailservices.js";
import ContactUs from "../Model/ContactUs.js";

export const createContactUs = async (req, res) => {
  console.log("Enter in the funcion for send contactus mail");

  const { name, email, subject, message } = req.body;

  try {
    // Store the query in the database
    const newQuery = new ContactUs({ name, email, subject, message });
    await newQuery.save();

    // send mail to user and admin
    const response = await sendMailForQuery({ name, email, subject, message });

    if (!response) {
      return res.status(500).json({
        success: false,
        message: "Error at send mail service",
      });
    }
    res.json({ success: true, message: "Query submitted successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
