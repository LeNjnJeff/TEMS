import React, { useState, useEffect } from 'react';
import './Reports.css'; // Import your custom styles

const Reports = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch reports data from your API
    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/reports'); // Adjust the API endpoint as needed
            const data = await response.json();
            setReports(data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch reports on component mount
    useEffect(() => {
        fetchReports();
    }, []);

    // Function to handle filtering reports
    const handleFilter = () => {
        console.log('Filtering from:', startDate, 'to:', endDate);
        // Implement the filter logic if needed
    };

    // Function to handle printing the report
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="reports-container">
            <h1>Reports</h1>
            <div className="filter-section">
                <div>
                    <label htmlFor="startDate">Date Start</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="endDate">Date End</label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button onClick={handleFilter}>Filter</button>
                <button onClick={handlePrint}>Print</button>
            </div>
            {loading ? (
                <p>Loading reports...</p>
            ) : (
                <table className="reports-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Ticket No.</th>
                            <th>License ID</th>
                            <th>Officer</th>
                            <th>Status</th>
                            <th>Total Fine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={report.ticketNo}>
                                <td>{index + 1}</td>
                                <td>{new Date(report.dateTime).toLocaleDateString()}</td>
                                <td>{report.ticketNo}</td>
                                <td>{report.licenseId}</td>
                                <td>{report.officer}</td>
                                <td>{report.status}</td>
                                <td>{report.totalFine}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Reports;
