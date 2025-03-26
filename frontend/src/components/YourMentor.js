import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.js";
import { getAuthDetails } from "./../User/auth";
const { userType, userId } = getAuthDetails();
const BaseURL = config.BASE_URL;

const MentorYour = () => {
  const [userData, setUserData] = useState(null);

  // Sample mentor data (Replace with API response)
  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const response = await axios.get(`${BaseURL}/${userType}/${userId}`);

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
  }, [userType, userType]);

  // Sample Mentor Data
  const mentorData = {
    name: userData?.name,
    email: userData?.email,
    bio: userData?.bio,
    skills: userData?.fieldOfInterest || [],
    image: userData?.profilePicture[0].url,
    rating: userData?.ratings,
  };

  // Sample Mentees Data
  const mentees = [
    {
      name: "Alice Smith",
      email: "alice.smith@example.com",
      bio: "Aspiring Data Scientist | Passionate about AI",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      bio: "Frontend Developer | Loves JavaScript",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Charlie Johnson",
      email: "charlie.johnson@example.com",
      bio: "Backend Engineer | Focused on APIs & Databases",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="h-[95%] flex justify-center items-center bg-gray-100">
      {/* Fixed Window Container */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 h-[80vh] flex flex-col">
        {/* Mentor Profile Header */}
        <div className="border-b pb-4">
          <div className="flex flex-col items-center">
            <img
              src={mentorData.image}
              alt={mentorData.name}
              className="w-24 h-24 rounded-full border-4 border-gray-200"
            />
            <h2 className="text-xl font-bold mt-2">{mentorData.name}</h2>
            <p className="text-gray-500">{mentorData.email}</p>
            <p className="text-sm text-gray-600 mt-1 text-center">
              {mentorData.bio}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {mentorData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="mt-2 text-center">
            <p className="text-yellow-500 font-semibold">
              ⭐ {mentorData.rating} / 5
            </p>
          </div>
        </div>

        {/* Scrollable Mentees Section */}
        <div className="flex-1 overflow-y-auto mt-4 px-2">
          <h3 className="text-lg font-semibold mb-3">
            Mentees Under {mentorData.name}
          </h3>
          {mentees.length === 0 ? (
            <p className="text-gray-500 text-center">
              No mentees assigned yet.
            </p>
          ) : (
            <div className="space-y-4">
              {mentees.map((mentee, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <img
                    src={mentee.image}
                    alt={mentee.name}
                    className="w-12 h-12 rounded-full border mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{mentee.name}</h4>
                    <p className="text-xs text-gray-500">{mentee.email}</p>
                    <p className="text-sm text-gray-600 mt-1">{mentee.bio}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700">
                    Message
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

export default MentorYour;
