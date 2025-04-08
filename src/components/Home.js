import React from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from './images/login_image.jpg';
import './Home.css';  // Ensure CSS is correctly imported

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page when button clicked
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <h1 className="home-title">TRAFFIC ENFORCEMENT MANAGEMENT SYSTEM</h1>
      <button onClick={handleLoginClick} className="home-button">
        Login
      </button>
    </div>
  );
};

export default Home;
