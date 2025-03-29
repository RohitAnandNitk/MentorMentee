import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.js";
import { useAuth } from "./AuthContext";
import { Typography, Box } from "@mui/material";
import { Rate } from "antd";
const BaseURL = config.BASE_URL;

const MentorYour = () => {
  const { user } = useAuth(); // Get userId and userType
  const [userData, setUserData] = useState(null);
  const [mentees, setMentees] = useState([]);

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

      // get your all mentees
      const youMentees = async () => {
        const response = await axios.get(
          `${BaseURL}/request/accepted-request`,
          {
            params: {
              userId: user.userId,
              role: user.userType,
            },
          }
        );
        console.log("your all mentees : ", response.data.requests);
        setMentees(response.data.requests);
      };

      fetchUserData();
      youMentees();
    } catch (error) {
      console.log(error);
    }
  }, [user.userType, user.userType]);

  // Sample Mentor Data
  const mentorData = {
    name: userData?.name,
    email: userData?.email,
    bio: userData?.bio,
    skills: userData?.fieldOfInterest || [],
    image: userData?.profilePicture[0].url,
    rating: userData?.ratings,
  };

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
            {/* Rating */}
            <Box mt={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Rating
              </Typography>
              <Rate allowHalf value={mentorData.rating} />
              <Typography variant="body2" color="textSecondary">
                {mentorData.rating} / 5
              </Typography>
            </Box>
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
                    src={mentee.menteeId.profilePicture[0].url}
                    alt={mentee.menteeId.name}
                    className="w-12 h-12 rounded-full border mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{mentee.menteeId.name}</h4>
                    <p className="text-xs text-gray-500">
                      {mentee.menteeId.email}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {mentee.menteeId.bio}
                    </p>
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
