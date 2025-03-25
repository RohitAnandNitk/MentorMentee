import React from "react";

const MenteeYour = () => {
  // Sample Mentee Data
  const menteeData = {
    name: "Alice Smith",
    email: "alice.smith@example.com",
    bio: "Aspiring Data Scientist | Passionate about AI & ML",
    interests: ["Data Science", "Machine Learning", "Python", "Deep Learning"],
    level: "Beginner",
    image: "https://via.placeholder.com/150",
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
            <p className="text-sm text-gray-600 mt-1 text-center">{menteeData.bio}</p>
          </div>

          {/* Interests */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {menteeData.interests.map((interest, index) => (
              <span key={index} className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded">
                {interest}
              </span>
            ))}
          </div>

          {/* Level */}
          <div className="mt-2 text-center">
            <p className="text-blue-500 font-semibold">📘 {menteeData.level} Level</p>
          </div>
        </div>

        {/* Scrollable Mentors Section */}
        <div className="flex-1 overflow-y-auto mt-4 px-2">
          <h3 className="text-lg font-semibold mb-3">Assigned Mentors</h3>
          {mentors.length === 0 ? (
            <p className="text-gray-500 text-center">No mentors assigned yet.</p>
          ) : (
            <div className="space-y-4">
              {mentors.map((mentor, index) => (
                <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                  <img src={mentor.image} alt={mentor.name} className="w-12 h-12 rounded-full border mr-3" />
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
