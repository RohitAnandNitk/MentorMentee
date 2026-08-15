import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.js";

const BaseURL = config.BASE_URL;

const AllMentee = () => {
  const navigate = useNavigate();
  const [allMentees, setAllMentees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getAllMentees = async () => {
      try {
        const response = await axios.get(`${BaseURL}/mentee/get-all-mentee`);

        if (response.status !== 200) {
          console.log("Error at getting all mentee data");
          return;
        }

        console.log("All Mentees:", response.data.mentees);
        setAllMentees(response.data.mentees || []);
      } catch (error) {
        console.error("Error fetching all mentees:", error);
      }
    };

    getAllMentees();
  }, []);

  const filteredMentees = allMentees.filter((mentee) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const nameMatch = mentee.name?.toLowerCase().includes(query);
    const bioMatch = mentee.bio?.toLowerCase().includes(query);
    const interestMatch = Array.isArray(mentee.fieldOfInterest)
      ? mentee.fieldOfInterest.some((interest) => interest.toLowerCase().includes(query))
      : false;
    return nameMatch || bioMatch || interestMatch;
  });

  return (
    <>
      {/* Search Bar Section */}
      <section id="search-bar-section" className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Our Mentees</h2>
            <p className="text-gray-600">
              Search and filter mentees based on your needs.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search for a mentee..."
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Mentee Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 m-4">
        {filteredMentees.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">No mentees found.</p>
        ) : (
          filteredMentees.map((mentee) => (
            <div
              key={mentee._id}
              className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/mentee-profile/${mentee._id}`)}
            >
              <img
                src={
                  mentee.profilePicture?.[0]?.url ||
                  "https://via.placeholder.com/150"
                }
                alt={mentee.name || "Mentee"}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 text-center">
                {mentee.name}
              </h3>
              <p className="text-green-600 text-center font-medium text-sm mt-1">
                {Array.isArray(mentee.fieldOfInterest)
                  ? mentee.fieldOfInterest.join(", ")
                  : mentee.fieldOfInterest}
              </p>
              <p className="text-gray-500 text-sm text-center mt-2">"{mentee.bio}"</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AllMentee;
