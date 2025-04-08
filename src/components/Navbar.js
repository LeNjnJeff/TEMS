// src/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css'; // Import the CSS

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Handle logout action
  const handleLogout = () => {
    // Clear any session data (if needed)
    // For example: localStorage.clear();

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <button onClick={toggleMenu} className="navbar-button">
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>
      <span className="navbar-title">Admin Portal</span>

      <div className="flex items-center relative" onClick={handleLogout}>
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c3.313 0 6-2.686 6-6S15.313 2 12 2 6 4.686 6 8s2.687 6 6 6zm0 2c-4.418 0-8 2.686-8 6v1h16v-1c0-3.314-3.582-6-8-6z" />
        </svg>
        <span>Logout</span>
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/offense-records" className="nav-link">Offense Records</Link>
        <Link to="/drivers-list" className="nav-link">Drivers List</Link>
        <Link to="/reports" className="nav-link">Reports</Link>
        <Link to="/offense-list" className="nav-link">Offense List</Link>
        <Link to="/user-list" className="nav-link">User List</Link>
        {/* <Link to="/settings" className="nav-link">Settings</Link> */}
      </div>

      {dropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={handleLogout}>
            <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Logout</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
