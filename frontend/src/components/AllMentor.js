import { useNavigate } from "react-router-dom";
import { useState } from "react";

const mentors = [
  {
    id: 1,
    name: "John Doe",
    role: "Web Development Expert",
    quote: "I help developers build scalable and robust applications.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Data Science Mentor",
    quote: "Passionate about teaching machine learning and AI concepts.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "UI/UX Designer",
    quote: "Helping designers create user-friendly and beautiful interfaces.",
    image: "https://via.placeholder.com/150",
  },
];

export default function AllMentor() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      
      
      <section id="search-bar-section" className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Find Your Mentor</h2>
            <p className="text-gray-600">Search and filter mentors based on your needs.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <input
          type="text"
          placeholder="Search mentors..."
          className="px-4 py-2 border rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
            <select 
              className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">Filter by Expertise</option>
              <option value="web-development">Web Development</option>
              <option value="data-science">Data Science</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
            <select 
              className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">Filter by Availability</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="weekends">Weekends</option>
            </select>
            <button className="bg-slate-600 text-white px-6 py-2 rounded">Search</button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/mentor/${mentor.id}`)}
          >
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 text-center">
              {mentor.name}
            </h3>
            <p className="text-gray-600 text-center">{mentor.role}</p>
            <p className="text-gray-500 text-sm text-center">"{mentor.quote}"</p>
          </div>
        ))}
      </div>
      
    </div>
  );
}
