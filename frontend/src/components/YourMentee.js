import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.js";
import { useAuth } from "./AuthContext";

const BaseURL = config.BASE_URL;

const MenteeYour = () => {
  const { user } = useAuth(); // Get userId and userType
  const [userData, setUserData] = useState(null);

  // Sample mentor data (Replace with API response)
  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const response = await axios.get(
          `${BaseURL}/${user.userType}/${user.userId}`
        );

        console.log(
          "User data received at yourMantee Page : " + response.data.data.name
        );
        // console.log("name : " + response.data.data.name);

        setUserData(response.data.data);
      };
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  }, [user.userType, user.userType]);

  // Sample Mentee Data
  const menteeData = {
    name: userData?.name,
    email: userData?.email,
    bio: userData?.bio,
    interests: userData?.fieldOfInterest || [],
    image: userData?.profilePicture[0].url,
  };

  // Sample Assigned Mentors Data
  const mentors = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Senior Data Scientist | 10+ years experience",
      expertise: "Machine Learning, AI, Python",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Emma Johnson",
      email: "emma.johnson@example.com",
      bio: "ML Engineer | Loves teaching AI concepts",
      expertise: "Deep Learning, TensorFlow, NLP",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="h-[95%] flex justify-center items-center bg-gray-100">
      {/* Fixed Window Container */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 h-[80vh] flex flex-col">
        {/* Mentee Profile Header */}
        <div className="border-b pb-4">
          <div className="flex flex-col items-center">
            <img
              src={menteeData.image}
              alt={menteeData.name}
              className="w-24 h-24 rounded-full border-4 border-gray-200"
            />
            <h2 className="text-xl font-bold mt-2">{menteeData.name}</h2>
            <p className="text-gray-500">{menteeData.email}</p>
            <p className="text-sm text-gray-600 mt-1 text-center">
              {menteeData.bio}
            </p>
          </div>

          {/* Interests */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {menteeData.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded"
              >
                {interest}
              </span>
            ))}
          </div>

          {/* Level */}
          <div className="mt-2 text-center">
            <p className="text-blue-500 font-semibold">
              📘 {menteeData.level} Level
            </p>
          </div>
        </div>

        {/* Scrollable Mentors Section */}
        <div className="flex-1 overflow-y-auto mt-4 px-2">
          <h3 className="text-lg font-semibold mb-3">Assigned Mentors</h3>
          {mentors.length === 0 ? (
            <p className="text-gray-500 text-center">
              No mentors assigned yet.
            </p>
          ) : (
            <div className="space-y-4">
              {mentors.map((mentor, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full border mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{mentor.name}</h4>
                    <p className="text-xs text-gray-500">{mentor.email}</p>
                    <p className="text-sm text-gray-600 mt-1">{mentor.bio}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenteeYour;
