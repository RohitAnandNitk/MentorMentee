import React from "react";

import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <>

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
            <form className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Message</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Message"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button className="bg-slate-600 text-white px-6 py-3 rounded w-full">
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Contact Details */}
        <section className="bg-gray-50 py-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Details</h2>
          <p className="text-lg text-gray-600 mb-2">Email: support@mentorconnect.com</p>
          <p className="text-lg text-gray-600 mb-2">Phone: +1 123 456 7890</p>
          <p className="text-lg text-gray-600">Address: 123 Mentor Street, Tech City, USA</p>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 text-center">
          <p>&copy; 2025 MentorConnect. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default ContactPage;
