import React, { useState } from 'react';
import './CreateOffenseList.css'; // Assuming this CSS file contains the necessary styles

const CreateOffense = () => {
    const [offenseCode, setOffenseCode] = useState('');
    const [offenseName, setOffenseName] = useState('');
    const [description, setDescription] = useState('');
    const [fine, setFine] = useState('');
    const [status, setStatus] = useState('Active');
    
    const handleSave = () => {
        const offenseData = {
            offenseCode,
            offenseName,
            description,
            fine,
            status
        };
        console.log('Saved offense:', offenseData);
        // Add your save functionality here, e.g., API call to save the offense.
    };

    const handleCancel = () => {
        // Clear form or navigate away if needed
        setOffenseCode('');
        setOffenseName('');
        setDescription('');
        setFine('');
        setStatus('Active');
        console.log('Form reset or action cancelled.');
    };

    return (
        <div className="create-offense-container">
            <h2>Create New Offense</h2>
            
            <div className="form-group">
                <label>Traffic Offense Code</label>
                <input 
                    type="text" 
                    value={offenseCode} 
                    onChange={(e) => setOffenseCode(e.target.value)} 
                    placeholder="Enter offense code" 
                />
            </div>

            <div className="form-group">
                <label>Traffic Offense Name</label>
                <input 
                    type="text" 
                    value={offenseName} 
                    onChange={(e) => setOffenseName(e.target.value)} 
                    placeholder="Enter offense name" 
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Enter description"
                    rows="5"
                />
            </div>

            <div className="form-group">
                <label>Fine</label>
                <input 
                    type="number" 
                    value={fine} 
                    onChange={(e) => setFine(e.target.value)} 
                    placeholder="Enter fine amount" 
                />
            </div>

            <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Paid">Paid</option>
                </select>
            </div>

            <div className="form-actions">
                <button onClick={handleSave} className="save-btn">Save</button>
                <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
        </div>
    );
};

export default CreateOffense;
