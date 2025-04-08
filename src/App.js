import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import Navbar from './components/Navbar';
import OffenseList from './components/OffenseList';
import CreateOffense from './components/CreateOffenseList'; 
import EditOffense from './components/EditOffense';
import OffenseRecord from './components/Offenserecords';
import './reportWebVitals'; // Keep this import if necessary
import Dashboard from './components/Dashboard';
import DriversList from './components/DriversList';
import Reports from './components/Reports';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import CreateOffenseRecord from './components/CreateOffenseRecord';
import DriverRegistration from './components/DriverRegistration';
import Home2 from './components/Home2';
const App = () => {
  const location = useLocation(); // Get the current location

  // Define pages without the Navbar
  const noNavbarRoutes = ['/login', '/signup', '/'];

  return (
    <>
      {/* Conditionally render Navbar based on the current route */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page route */}
        <Route path="/offense-list" element={<OffenseList />} />
        <Route path="/create-offense" element={<CreateOffense />} />
        <Route path="/edit-offense" element={<EditOffense />} />
        <Route path="/offense-records" element={<OffenseRecord />} />
        <Route path="/dashboard" element={<Home2 />} />
        <Route path="/drivers-list" element={<DriversList />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/user-list" element={<UserList/>} />
        <Route path="/create-user" element={<CreateUser/>} />
        <Route path="/create-offenserecord" element={<CreateOffenseRecord/>} />
        <Route path="/new" element={<DriverRegistration/>} />
        <Route path="/home" element={<Home2 />} />
        <Route path="/mainpage" element={<Home2 />} />
        <Route path="/settings" element={<Dashboard />} />
      </Routes>
    </>
  );
};

// Wrap the App component with Router
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
