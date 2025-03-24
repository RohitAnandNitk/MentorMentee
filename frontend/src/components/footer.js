import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
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
                  <li>
                    <Link
                      to="/browse-mentors"
                      className="text-gray-400 hover:text-white"
                    >
                      Browse Mentors
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/book-session"
                      className="text-gray-400 hover:text-white"
                    >
                      Book a Session
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/become-mentor"
                      className="text-gray-400 hover:text-white"
                    >
                      Become a Mentor
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/mentorship-teams"
                      className="text-gray-400 hover:text-white"
                    >
                      Mentorship for Teams
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/testimonials"
                      className="text-gray-400 hover:text-white"
                    >
                      Testimonials
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h3 className="text-lg font-bold mb-4">RESOURCES</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/newsletter"
                      className="text-gray-400 hover:text-white"
                    >
                      Newsletter
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/books"
                      className="text-gray-400 hover:text-white"
                    >
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/perks"
                      className="text-gray-400 hover:text-white"
                    >
                      Perks
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/templates"
                      className="text-gray-400 hover:text-white"
                    >
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/career-paths"
                      className="text-gray-400 hover:text-white"
                    >
                      Career Paths
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-white">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-lg font-bold mb-4">COMPANY</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className="text-gray-400 hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/case-studies"
                      className="text-gray-400 hover:text-white"
                    >
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/partner-program"
                      className="text-gray-400 hover:text-white"
                    >
                      Partner Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/code-of-conduct"
                      className="text-gray-400 hover:text-white"
                    >
                      Code of Conduct
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="text-gray-400 hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/dmca" className="text-gray-400 hover:text-white">
                      DMCA
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="text-lg font-bold mb-4">SUPPORT</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/faq" className="text-gray-400 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-gray-400 hover:text-white"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-4">EXPLORE</h3>
                  <div className="flex flex-wrap space-x-4">
                    <ul className="space-y-2">
                      <li>
                        <Link
                          to="/groups"
                          className="text-gray-400 hover:text-white"
                        >
                          Groups
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/companies"
                          className="text-gray-400 hover:text-white"
                        >
                          Companies
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/fractional-executives"
                          className="text-gray-400 hover:text-white"
                        >
                          Fractional Executives
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/part-time-experts"
                          className="text-gray-400 hover:text-white"
                        >
                          Part-Time Experts
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Explore Section */}
            <div className="mt-12"></div>

            {/* Footer Bottom */}
            <div className="mt-12 text-center text-gray-400">
              <p>&copy; 2025 MentorConnect. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </>
  )
}

export default Footer;