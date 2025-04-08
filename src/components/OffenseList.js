// src/components/OffenseList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OffenseList = () => {
  const [offenses, setOffenses] = useState([]);

  useEffect(() => {
    fetchOffenses();
  }, []);

  const fetchOffenses = async () => {
    try {
      const response = await axios.get('/api/offenses'); // Adjust the API endpoint as needed
      setOffenses(response.data);
    } catch (error) {
      console.error('Error fetching offenses:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/offenses/${id}`);
      fetchOffenses(); // Refresh the list
    } catch (error) {
      console.error('Error deleting offense:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Offense List</h1>
      <Link to="/create-offense" className="mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
        Create New Offense
      </Link>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Date Created</th>
            <th className="py-2 px-4 border">Fine Amount</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offenses.map((offense) => (
            <tr key={offense._id} className="text-center border-t hover:bg-gray-100">
              <td className="py-2 px-4 border">{offense.name}</td>
              <td className="py-2 px-4 border">{new Date(offense.dateCreated).toLocaleDateString()}</td>
              <td className="py-2 px-4 border">${offense.fineAmount}</td>
              <td className="py-2 px-4 border">
                <Link to={`/edit-offense/${offense._id}`} className="text-blue-600 hover:underline mr-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(offense._id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OffenseList;
