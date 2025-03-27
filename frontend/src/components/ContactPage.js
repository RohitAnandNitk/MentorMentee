import React, { useState } from "react";
import axios from "axios";
import config from "./../config";
const BaseURL = config.BASE_URL;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BaseURL}/contact/send-query`,
        formData
      );
      alert("Message sent successfully!");
      console.log(response);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans">
      {/* Contact Header */}
      <header className="bg-gray-100 p-6 rounded-lg shadow text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We're here to help. Reach out with any questions or concerns.
        </p>
      </header>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Get in Touch
          </h2>
          <form
            className="bg-gray-50 p-6 rounded-lg shadow"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Subject"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your Message"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-slate-600 text-white px-6 py-3 rounded w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-gray-50 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Contact Details
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Email: support@mentorconnect.com
        </p>
        <p className="text-lg text-gray-600 mb-2">Phone: +1 123 456 7890</p>
        <p className="text-lg text-gray-600">
          Address: 123 Mentor Street, Tech City, USA
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 text-center">
        <p>&copy; 2025 MentorConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
