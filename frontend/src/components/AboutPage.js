import React from "react";
import PrimarySearchAppBar from "../components/ResponsiveAppBar";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      <PrimarySearchAppBar />
      <div className="font-sans">
        {/* Hero Section */}
        <header className="bg-gray-100 p-6 rounded-lg shadow">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              About Our Mentorship Platform
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Connecting mentees with industry experts to accelerate learning
              and career growth.
            </p>
          </div>
        </header>

        {/* Our Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We aim to bridge the gap between aspiring professionals and
              experienced mentors by providing a seamless platform for guidance,
              support, and skill development.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-gray-800">Sign Up</h3>
                <p className="text-gray-600">Create your account and set up your profile.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-gray-800">Find a Match</h3>
                <p className="text-gray-600">Search for mentors or mentees based on interests.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-gray-800">Start Learning</h3>
                <p className="text-gray-600">Connect, communicate, and grow through mentorship.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <p className="text-gray-600">Trusted mentors from top industries.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <p className="text-gray-600">Flexible mentorship options tailored to you.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <p className="text-gray-600">A strong community of learners and professionals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-800 py-12 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-8">
              Become a mentor or mentee today and start your growth journey.
            </p>
            <Link to="/signup" className="bg-white text-gray-800 px-6 py-3 rounded">
              Get Started
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
