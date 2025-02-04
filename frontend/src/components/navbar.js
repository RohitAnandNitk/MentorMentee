import React from "react";

function navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-black dark:text-white">
          MentorConnect
        </a>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="/about" className="text-gray-900 dark:text-white hover:text-blue-600">
            ABOUT
          </a>
          <a href="/contact" className="text-gray-900 dark:text-white hover:text-blue-600">
            CONTACT
          </a>
          <a href="/login" className="text-gray-900 dark:text-white hover:text-blue-600">
            LOGIN
          </a>
          <a
            href="/signup"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            SIGN UP
          </a>
        </div>
      </div>
    </nav>
  );
}

export default navbar;
