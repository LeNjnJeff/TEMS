// src/components/EditOffense.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditOffense = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [fineAmount, setFineAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffense = async () => {
      try {
        const response = await axios.get(`/api/offenses/${id}`);
        setName(response.data.name);
        setFineAmount(response.data.fineAmount);
      } catch (error) {
        console.error('Error fetching offense:', error);
      }
    };
    fetchOffense();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/offenses/${id}`, { name, fineAmount });
      navigate('/offense-list'); // Redirect after editing
    } catch (error) {
      console.error('Error updating offense:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Offense</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Fine Amount</label>
          <input
            type="number"
            value={fineAmount}
            onChange={(e) => setFineAmount(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Update Offense
        </button>
      </form>
    </div>
  );
};

export default EditOffense;
