import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

const mentorsList = [
  {
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    bio: "Experienced AI Specialist | Passionate Educator",
    image: "https://via.placeholder.com/150",
    skills: ["Machine Learning", "Deep Learning", "Python"],
    rating: 4.8,
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    bio: "Frontend Developer | UI/UX Enthusiast",
    image: "https://via.placeholder.com/150",
    skills: ["React", "JavaScript", "CSS"],
    rating: 4.5,
  },
  {
    name: "Dr. Mark Brown",
    email: "mark.brown@example.com",
    bio: "Backend Engineer | Database Expert",
    image: "https://via.placeholder.com/150",
    skills: ["Node.js", "MongoDB", "SQL"],
    rating: 4.7,
  },
];

const MentorMenteeMatching = () => {
  const [currentMentor, setCurrentMentor] = useState(null);
  const cardRef = useRef(null);

  const handleMatch = () => {
    const randomMentor = mentorsList[Math.floor(Math.random() * mentorsList.length)];
    setCurrentMentor(randomMentor);
  };

  useEffect(() => {
    if (currentMentor && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 100, scale: 0.8, rotateY: 90 },
        { opacity: 1, y: 0, scale: 1, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, [currentMentor]);

  return (
    <div className="h-[85%] flex flex-col items-center  bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-6">
      <div className="w-full max-w-md  p-6 text-center">
        <button
          onClick={handleMatch}
          className="bg-gray-700 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Match
        </button>
      </div>

      <div className="mt-6 w-full max-w-md relative">
        {currentMentor && (
          <div
            ref={cardRef}
            className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center text-center border border-gray-300 absolute w-full transform origin-center"
          >
            <img
              src={currentMentor.image}
              alt={currentMentor.name}
              className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-lg mb-3"
            />
            <h4 className="font-semibold text-xl text-gray-800">{currentMentor.name}</h4>
            <p className="text-md text-gray-600 italic">{currentMentor.bio}</p>
            <p className="text-yellow-500 text-md mt-2 font-bold">⭐ {currentMentor.rating} / 5</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {currentMentor.skills.map((skill, index) => (
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
