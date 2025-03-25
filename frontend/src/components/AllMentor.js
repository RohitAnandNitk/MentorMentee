import React from "react";
import { useNavigate } from "react-router-dom";

const AllMentor = () => {
  const navigate = useNavigate();

  // Sample Mentor Data
  const mentors = [
    {
      id: 1,
      name: "John Doe",
      expertise: "Web Development",
      bio: "Passionate about teaching full-stack web development.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      expertise: "Data Science",
      bio: "Helping students master AI and Machine Learning.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Emily Clark",
      expertise: "UI/UX Design",
      bio: "Creating intuitive and user-friendly designs.",
      image: "https://randomuser.me/api/portraits/women/48.jpg",
    },
  ];

  return (
    <>
      {/* Search Bar Section */}
      <section id="search-bar-section" className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Find Your Mentor</h2>
            <p className="text-gray-600">Search and filter mentors based on your needs.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search for a mentor..."
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <select className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">Filter by Expertise</option>
              <option value="web-development">Web Development</option>
              <option value="data-science">Data Science</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
            <select className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">Filter by Availability</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="weekends">Weekends</option>
            </select>
            <button className="bg-slate-600 text-white px-6 py-2 rounded">Search</button>
          </div>
        </div>
      </section>

      {/* Mentor Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
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
            <h3 className="text-xl font-bold text-gray-800 text-center">{mentor.name}</h3>
            <p className="text-gray-600 text-center">{mentor.expertise}</p>
            <p className="text-gray-500 text-sm text-center">"{mentor.bio}"</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllMentor;
