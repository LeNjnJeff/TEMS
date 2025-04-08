import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './CreateOffenseRecord.css'; // CSS for styling the page

const CreateOffenseRecord = () => {
    const [date, setDateViolated] = useState('');
    const [ticketNumber, setTicketNo] = useState('');
    const [officerId, setOfficerID] = useState('');
    const [officerName, setOfficerName] = useState('');
    const [driverName, setDriver] = useState('');
    const [status, setStatus] = useState('Pending');
    const [code, setCode] = useState('');  // Offense code input
    const [fine, setFine] = useState(50);  // Fine amount (this can be dynamic)
    const [offenses, setOffenses] = useState([]);  // Array of offenses
    const [totalFine, setTotalFine] = useState(0);
    const [remarks, setRemarks] = useState('');

    const handleAddOffense = () => {
        if (!code) return;  // If no offense code, do nothing

        const newOffense = { code, fine };  // Add offense with code and fine
        setOffenses([...offenses, newOffense]);
        setTotalFine(totalFine + fine);
        setCode('');  // Reset offense input
    };

    const handleSave = async () => {
        const offenseRecord = {
            driverName,           // driver's name
            officerName,          // officer's name
            officerId,            // officer ID
            ticketNumber,         // ticket number
            status,               // status (e.g., Pending, Resolved)
            date,                 // date the offense occurred
            offenses,             // offenses as an array of objects with code and fine
            remarks,              // additional remarks
        };

        try {
            const response = await axios.post('http://localhost:5000/offense-record', offenseRecord);
            console.log('Offense Record Saved:', response.data);
            alert('Offense record saved successfully!');
            handleCancel(); // Reset form after save
        } catch (error) {
            console.error('Error saving offense record:', error);
            alert('Failed to save offense record. Please try again.');
        }
    };

    const handleCancel = () => {
        setDateViolated('');
        setTicketNo('');
        setOfficerID('');
        setOfficerName('');
        setDriver('');
        setStatus('Pending');
        setCode('');
        setFine(50);  // Reset fine if needed
        setOffenses([]);  // Reset offenses list
        setTotalFine(0);  // Reset total fine
        setRemarks('');
    };

    return (
        <div className="offense-record-container">
            <h2>Create New Offense Record</h2>

            {/* Date Violated Input */}
            <div className="form-group">
                <label>Date Violated</label>
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDateViolated(e.target.value)}
                />
            </div>

            {/* Ticket Number Input */}
            <div className="form-group">
                <label>Ticket No.</label>
                <input
                    type="text"
                    value={ticketNumber}
                    onChange={(e) => setTicketNo(e.target.value)}
                    placeholder="Enter ticket number"
                />
            </div>

            {/* Officer ID Input */}
            <div className="form-group">
                <label>Officer ID</label>
                <input
                    type="text"
                    value={officerId}
                    onChange={(e) => setOfficerID(e.target.value)}
                    placeholder="Enter officer ID"
                />
            </div>

            {/* Officer Name Input */}
            <div className="form-group">
                <label>Officer Name</label>
                <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    placeholder="Enter officer name"
                />
            </div>

            {/* Driver Name Input */}
            <div className="form-group">
                <label>Driver</label>
                <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriver(e.target.value)}
                    placeholder="Enter driver name"
                />
            </div>

            {/* Status Input */}
            <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>

            {/* Offense List */}
            <div className="offense-list-section">
                <h3>Offense List</h3>
                <div className="form-group">
                    <label>Offense Code</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter offense code"
                    />
                    <button onClick={handleAddOffense} className="add-btn">+ Add to List</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Fine</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offenses.map((item, index) => (
                            <tr key={index}>
                                <td>{item.code}</td>
                                <td>{item.fine}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            const newList = offenses.filter((_, i) => i !== index);
                                            setOffenses(newList);
                                            setTotalFine(totalFine - item.fine);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {offenses.length === 0 && (
                            <tr>
                                <td colSpan="3">No Offense Listed Yet.</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td>{totalFine}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Remarks Input */}
            <div className="form-group">
                <label>Remarks</label>
                <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter remarks"
                    rows="3"
                />
            </div>

            {/* Form Actions */}
            <div className="form-actions">
                <button onClick={handleSave} className="save-btn">Save</button>
                <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
        </div>
    );
};

export default CreateOffenseRecord;
