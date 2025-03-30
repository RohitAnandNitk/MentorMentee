import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import axios from "axios";
import config from "../config";
import { useAuth } from "./AuthContext";
import { Rate } from "antd";
const BaseURL = config.BASE_URL;
gsap.registerPlugin(Flip);

const MentorMenteeMatching = () => {
  const { user } = useAuth();
  const [currentMentor, setCurrentMentor] = useState(null);
  const [mentorsList, setMentorList] = useState([]);
  const cardRef = useRef(null);

  useEffect(() => {
    const getMatchedMentors = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/suggest/matching-mentor/${user.userId}`
        );
        console.log(response);
        if (!response.data.success) {
          console.log("Error at matching function at backend!");
          return;
        }
        console.log(response.data.sortedMentors);
        setMentorList(response.data.sortedMentors);
      } catch (error) {
        console.log("Error at fetching matching mentors : ", error);
      }
    };
    getMatchedMentors();
  }, [user]);

  const handleMatch = () => {
    const randomMentor =
      mentorsList[Math.floor(Math.random() * mentorsList.length)];
    setCurrentMentor(randomMentor);
  };

  useEffect(() => {
    if (currentMentor && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 100, scale: 0.8, rotateY: 90 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      );
    }
  }, [currentMentor]);

  return (
    <div className="h-[100%] flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Heading and Button */}
      <div className="w-full max-w-md p-6 text-center">
        <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
          Click on the Match button until you find your desired Mentor
        </h2>
        <button
          onClick={handleMatch}
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
        >
          Match
        </button>
      </div>

      {/* Mentor Card */}
      <div className="mt-8 w-full max-w-md flex justify-center">
        {currentMentor && (
          <div
            ref={cardRef}
            className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center text-center border border-gray-200 w-full transform transition-all duration-300 ease-in-out"
          >
            {/* Profile Image */}
            <img
              src={currentMentor.profilePicture[0].url}
              alt={currentMentor.name}
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md mb-4"
            />

            {/* Mentor Name & Bio */}
            <h4 className="text-2xl font-semibold text-gray-900">
              {currentMentor.name}
            </h4>
            <p className="text-md text-gray-600 italic px-4">
              {currentMentor.bio}
            </p>

            {/* Rating Section */}
            <div className="mt-3">
              <span className="text-lg font-semibold text-gray-800">
                Rating
              </span>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Rate allowHalf value={currentMentor.ratings} />
                <span className="text-gray-700 text-sm font-medium">
                  {currentMentor.ratings} / 5
                </span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {currentMentor.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorMenteeMatching;
