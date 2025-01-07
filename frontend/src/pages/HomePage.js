import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      
      <main>
        <div className="section mentor">
          <h2>Become a Mentor</h2>
          <p>
            Help shape the future of a mentee by guiding them towards their
            goals, sharing your expertise, and empowering them to achieve
            success.
          </p>
          <button onClick={() => window.location.href = '/mentor-signup'}>
            Sign Up as a Mentor
          </button>
          <button onClick={() => window.location.href = '/mentor-login'}>
            Log In
          </button>
        </div>

        <div className="section mentee">
          <h2>Find Your Mentor</h2>
          <p>
            Get the support and guidance you need to achieve your future goals.
            Connect with experienced mentors who will help you grow and succeed.
          </p>
          <button onClick={() => window.location.href = '/mentee-signup'}>
            Sign Up as a Mentee
          </button>
          <button onClick={() => window.location.href = '/mentee-login'}>
            Log In
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
