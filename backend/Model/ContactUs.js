import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String, // ✅ "type" should be lowercase
      required: true,
    },
    subject: {
      type: String, // ✅ Fixed
      required: true,
    },
    email: {
      type: String, // ✅ Fixed
      required: true,
    },
    message: {
      type: String, // ✅ Fixed
      required: true,
    },
  },
  {
    timestamps: true, // ✅ This will add createdAt and updatedAt fields
  }
);

const ContactUs = mongoose.model("ContactUs", ContactUsSchema); // ✅ "mongoose.model", not "Model"
export default ContactUs;
