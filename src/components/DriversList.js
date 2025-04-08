// src/DriversList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DriversList.css';

const DriversList = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/drivers');
        console.log('API Response:', response.data); 
        setDrivers(response.data);
        console.log('Driver Data:', drivers);

      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    fetchDrivers();
  }, []);

  const filteredDrivers = drivers.filter(driver =>
    driver.name ? driver.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );
  
  console.log('Filtered Drivers:', filteredDrivers); 

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredDrivers.slice(indexOfFirstEntry, indexOfLastEntry);
  console.log('Current Entries:', currentEntries); 
  
  const totalPages = Math.ceil(filteredDrivers.length / entriesPerPage);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold my-4">List of Drivers</h2>

      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="entries" className="mr-2">Show</label>
          <select
            id="entries"
            className="border rounded p-1"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2">entries</span>
        </div>
        <div>
          <Link to="/new" className="bg-blue-500 text-white rounded px-4 py-2">
            + Create New
          </Link>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="border rounded p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">License ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">License Type</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.length > 0 ? (
            currentEntries.map((driver, index) => (
              <tr key={driver._id}>
                <td className="border p-2">{indexOfFirstEntry + index + 1}</td>
                <td className="border p-2">{driver.licenseNo || 'N/A'}</td>
                <td className="border p-2">{`${(driver.firstName || '')} ${(driver.middleName || '')} ${(driver.lastName || '')}`.trim() || 'N/A'}</td>
                <td className="border p-2">{driver.licenseType || 'N/A'}</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white rounded px-2 py-1">View</button>
                  <button className="bg-yellow-500 text-white rounded px-2 py-1 ml-2">Edit</button>
                  <button className="bg-red-500 text-white rounded px-2 py-1 ml-2">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">No drivers found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <span>
          Showing {indexOfFirstEntry + 1} to{' '}
          {indexOfLastEntry > filteredDrivers.length ? filteredDrivers.length : indexOfLastEntry} of{' '}
          {filteredDrivers.length} entries
        </span>
        <div>
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            Previous
          </button>
          <span className="mx-2">{currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriversList;