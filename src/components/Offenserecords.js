// src/OffenseRecord.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OffenseRecord = () => {
  const [offenses, setOffenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffenses();
  }, []);

  const fetchOffenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/offense-records');
      setOffenses(response.data);
    } catch (error) {
      console.error('Error fetching offenses:', error);
    }
  };

  const deleteOffense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/offenses/${id}`);
      fetchOffenses(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting offense:', error);
    }
  };

  return (
    <div className="offense-record-container">
      <h1 className="text-center text-2xl font-semibold mt-4">Offense Records</h1>
      <div className="text-right mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => navigate('/create-offenserecord')}
        >
          Create New Offense
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Driver Name</th>
            <th className="border px-4 py-2">Officer Name</th>
            <th className="border px-4 py-2">Officer ID</th>
            <th className="border px-4 py-2">Ticket Number</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Fine Amount</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offenses.map((offense) => (
            <tr key={offense._id}>
              <td className="border px-4 py-2">{offense.driverName}</td>
              <td className="border px-4 py-2">{offense.officerName}</td>
              <td className="border px-4 py-2">{offense.officerId}</td>
              <td className="border px-4 py-2">{offense.ticketNumber}</td>
              <td className="border px-4 py-2">{offense.status}</td>
              <td className="border px-4 py-2">{new Date(offense.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{offense.fineAmount}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                  onClick={() => navigate(`/edit-offense/${offense._id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded"
                  onClick={() => deleteOffense(offense._id)}
                >
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

export default OffenseRecord;
