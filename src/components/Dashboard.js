// src/Dashboard.js
import React, { useEffect } from 'react';
import './Dashboard.css'; // Import custom CSS for animations
import soundEffect from './images/police.mp3'; // Path to your sound effect

const Dashboard = () => {
  useEffect(() => {
    // Function to change background color periodically
    const changeBackgroundColor = () => {
      const body = document.body;
      setInterval(() => {
        body.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
      }, 2000); // Change color every 2 seconds
    };

    changeBackgroundColor();

    // Sound effect on load
    const audio = new Audio(soundEffect);
    audio.loop = true; // Loop the sound
    audio.play(); // Play sound when component mounts

    return () => {
      audio.pause(); // Pause sound on unmount
    };
  }, []);

  return (
    <>
      <h1 className="title spinning-title">
        WELCOME TO TRAFFIC ENFORCEMENT MANAGEMENT SYSTEM
      </h1>
      <div className="w-1/2 mx-auto border-b-2 border-blue-600 mt-2" />

      <div className="flex justify-center mt-6 mx-4 space-x-4 floating-content">
        {/* Card 1 */}
        <div className="card" draggable="true">
          <svg className="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
          </svg>
          <div>
            <h2 className="card-title">Today's Offense</h2>
            <p className="card-description">5 speeding violations recorded today.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card" draggable="true">
          <svg className="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3z" />
          </svg>
          <div>
            <h2 className="card-title">Total Drivers Listed</h2>
            <p className="card-description">Over 1,500 drivers currently registered.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card" draggable="true">
          <svg className="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20m10-10H2" />
          </svg>
          <div>
            <h2 className="card-title">Total Traffic Offenses</h2>
            <p className="card-description">2,300 total offenses recorded this month.</p>
          </div>
        </div>
      </div>

      {/* Full Page Scrolling Traffic Messages */}
      <div className="scrolling-text-container">
        <div className="scrolling-text">
          🚦 Be aware of traffic signals! 🚔 Speed limits are enforced strictly! 🛑 Always stop at red lights! 🚧 Expect delays in construction areas! 🌧️ Drive safely in rainy conditions!
        </div>
      </div>
    </>
  );
};

export default Dashboard;
