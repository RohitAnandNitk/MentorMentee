import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import useChatbase from "./ChatBot";
import axios from "axios";
import config from "../config.js";
const BaseURL = config.BASE_URL;

const LandingPage = () => {
  // useChatbase();
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/All-mentors"); // Update this path based on your routing
  };

  // fetch top mentors data from backend
  useEffect(() => {
    const getTopMentor = async () => {
      try {
        const response = await axios.get(`${BaseURL}/mentor/get-top-mentor`);

        if (response.status !== 200) {
          console.log("Error at getting top mentor data");
          return;
        }

        console.log("Top three Mentors:", response.data.mentors);
        setMentors(response.data.mentors);
      } catch (error) {
        console.error("Error fetching top mentors:", error);
      }
    };

    getTopMentor();
  }, []);

  return (
    <>
      <div className="font-sans">
        {/* Hero Section */}
        <header className="bg-gray-100 p-6 rounded-lg shadow">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Connect with the Best Mentors
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Achieve your goals with personalized guidance from industry
              experts.
            </p>
            <button
              onClick={handleNavigate}
              className="bg-slate-600 text-white px-6 py-3 rounded"
            >
              Find a Mentor
            </button>
          </div>
        </header>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              What People Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-4">
                  "My mentor helped me land my dream job!"
                </p>
                <h3 className="font-bold text-gray-800">- Alex D.</h3>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-4">
                  "Amazing experience with great guidance."
                </p>
                <h3 className="font-bold text-gray-800">- Sarah K.</h3>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-4">
                  "Helped me grow professionally and personally."
                </p>
                <h3 className="font-bold text-gray-800">- Michael T.</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Mentor Profiles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate(`/profile/${mentor.id}`)} // Navigate to mentor profile page
                >
                  <img
                    src={mentor.image || "https://via.placeholder.com/150"}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800 text-center">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {mentor.expertise}
                  </p>
                  <p className="text-gray-500 text-sm text-center">
                    "{mentor.bio}"
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="bg-slate-600 text-white px-6 py-3 rounded">
                Explore All Mentors
              </button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-800 py-12 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8">
              Join thousands of professionals learning with top mentors.
            </p>
            <button className="bg-white text-slate-600 px-6 py-3 rounded">
              Sign Up Now
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
