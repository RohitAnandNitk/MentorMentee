import React from 'react';
import PrimarySearchAppBar from '../components/ResponsiveAppBar';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const scrollToSearchBar = () => {
    const searchBarSection = document.getElementById('search-bar-section');
    const searchInput = searchBarSection ? searchBarSection.querySelector('input') : null;
  
    if (searchBarSection && searchInput) {
      searchBarSection.scrollIntoView({ behavior: 'smooth' });
      searchInput.focus(); // This will focus the input field for typing
    }
  };

  return (
    <>
    <PrimarySearchAppBar/>
    <div className="font-sans">
      {/* Hero Section */}
      <header className="bg-gray-100 p-6 rounded-lg shadow">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Connect with the Best Mentors</h1>
          <p className="text-lg text-gray-600 mb-8">Achieve your goals with personalized guidance from industry experts.</p>
          <button onClick={scrollToSearchBar} className="bg-slate-600 text-white px-6 py-3 rounded">Find a Mentor</button>
        </div>
      </header>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">"My mentor helped me land my dream job!"</p>
              <h3 className="font-bold text-gray-800">- Alex D.</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">"Amazing experience with great guidance."</p>
              <h3 className="font-bold text-gray-800">- Sarah K.</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">"Helped me grow professionally and personally."</p>
              <h3 className="font-bold text-gray-800">- Michael T.</h3>
            </div>
          </div>
        </div>
      </section>

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

      {/* Sample Mentor Profiles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <img src="https://via.placeholder.com/150" alt="John Doe" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 text-center">John Doe</h3>
              <p className="text-gray-600 text-center">Web Development Expert</p>
              <p className="text-gray-500 text-sm text-center">"I help developers build scalable and robust applications."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <img src="https://via.placeholder.com/150" alt="Jane Smith" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 text-center">Jane Smith</h3>
              <p className="text-gray-600 text-center">Data Science Mentor</p>
              <p className="text-gray-500 text-sm text-center">"Passionate about teaching machine learning and AI concepts."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <img src="https://via.placeholder.com/150" alt="Alice Johnson" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 text-center">Alice Johnson</h3>
              <p className="text-gray-600 text-center">UI/UX Designer</p>
              <p className="text-gray-500 text-sm text-center">"Helping designers create user-friendly and beautiful interfaces."</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="bg-slate-600 text-white px-6 py-3 rounded">Explore All Mentors</button>
          </div>
        </div>
      </section>

      

      {/* Call to Action */}
      <section className="bg-gray-800 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Join thousands of professionals learning with top mentors.</p>
          <button className="bg-white text-slate-600 px-6 py-3 rounded">Sign Up Now</button>
        </div>
      </section>

{/*footer */}


<footer className="bg-gray-800 text-white py-12">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
      {/* Logo and Description */}
      <div>
        <h2 className="text-lg font-bold mb-4">MentorCruise</h2>
        <p className="text-gray-400">
          Your trusted source to find highly-vetted mentors & industry
          professionals to move your career ahead.
        </p>
        <div className="flex space-x-4 mt-4">
          <Link to="/facebook" aria-label="Facebook">
            <img src="/icons/facebook.svg" alt="Facebook" />
          </Link>
          <Link to="/instagram" aria-label="Instagram">
            <img src="/icons/instagram.svg" alt="Instagram" />
          </Link>
          <Link to="/twitter" aria-label="Twitter">
            <img src="/icons/twitter.svg" alt="Twitter" />
          </Link>
          <Link to="/linkedin" aria-label="LinkedIn">
            <img src="/icons/linkedin.svg" alt="LinkedIn" />
          </Link>
        </div>
      </div>

      {/* Platform Links */}
      <div>
        <h3 className="text-lg font-bold mb-4">PLATFORM</h3>
        <ul className="space-y-2">
          <li><Link to="/browse-mentors" className="text-gray-400 hover:text-white">Browse Mentors</Link></li>
          <li><Link to="/book-session" className="text-gray-400 hover:text-white">Book a Session</Link></li>
          <li><Link to="/become-mentor" className="text-gray-400 hover:text-white">Become a Mentor</Link></li>
          <li><Link to="/mentorship-teams" className="text-gray-400 hover:text-white">Mentorship for Teams</Link></li>
          <li><Link to="/testimonials" className="text-gray-400 hover:text-white">Testimonials</Link></li>
        </ul>
      </div>

      {/* Resources Links */}
      <div>
        <h3 className="text-lg font-bold mb-4">RESOURCES</h3>
        <ul className="space-y-2">
          <li><Link to="/newsletter" className="text-gray-400 hover:text-white">Newsletter</Link></li>
          <li><Link to="/books" className="text-gray-400 hover:text-white">Books</Link></li>
          <li><Link to="/perks" className="text-gray-400 hover:text-white">Perks</Link></li>
          <li><Link to="/templates" className="text-gray-400 hover:text-white">Templates</Link></li>
          <li><Link to="/career-paths" className="text-gray-400 hover:text-white">Career Paths</Link></li>
          <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
        </ul>
      </div>

      {/* Company Links */}
      <div>
        <h3 className="text-lg font-bold mb-4">COMPANY</h3>
        <ul className="space-y-2">
          <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
          <li><Link to="/case-studies" className="text-gray-400 hover:text-white">Case Studies</Link></li>
          <li><Link to="/partner-program" className="text-gray-400 hover:text-white">Partner Program</Link></li>
          <li><Link to="/code-of-conduct" className="text-gray-400 hover:text-white">Code of Conduct</Link></li>
          <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
          <li><Link to="/dmca" className="text-gray-400 hover:text-white">DMCA</Link></li>
        </ul>
      </div>

      {/* Support Links */}
      <div>
        <h3 className="text-lg font-bold mb-4">SUPPORT</h3>
        <ul className="space-y-2">
          <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
          <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
        </ul>
        <div className='mt-4'>
        <h3 className="text-lg font-bold mb-4">EXPLORE</h3>
      <div className="flex flex-wrap space-x-4">
      <ul className="space-y-2">
        <li><Link to="/groups" className="text-gray-400 hover:text-white">Groups</Link></li>
        <li><Link to="/companies" className="text-gray-400 hover:text-white">Companies</Link></li>
        <li><Link to="/fractional-executives" className="text-gray-400 hover:text-white">Fractional Executives</Link></li>
        <li><Link to="/part-time-experts" className="text-gray-400 hover:text-white">Part-Time Experts</Link></li>
        </ul>
        </div>
      </div>
      </div>
    </div>

    {/* Explore Section */}
    <div className="mt-12">
      
    </div>

    {/* Footer Bottom */}
    <div className="mt-12 text-center text-gray-400">
      <p>&copy; 2025 MentorConnect. All rights reserved.</p>
    </div>
  </div>
</footer>



    </div>
    </>
  );
}

export default LandingPage;
