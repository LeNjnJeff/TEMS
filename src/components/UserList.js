import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UserList.css'; // Assuming you will style it separately

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10); // Add this line to handle entries per page

    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Fetch users data from an API or database
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/users'); // Adjust the API endpoint accordingly
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on search term
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastUser = currentPage * entriesPerPage;
    const indexOfFirstUser = indexOfLastUser - entriesPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="userlist-container">
            <div className="userlist-header">
                <h1>List of System Users</h1>
                {/* Add onClick event to navigate to the create-user page */}
                <button 
                    className="create-btn"
                    onClick={() => navigate('/create-user')} // Navigate to the create-user page
                >
                    + Create New
                </button>
            </div>

            <div className="filter-section">
                <label>
                    Show 
                    <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    entries
                </label>
                <input 
                    type="text" 
                    placeholder="Search by name or username..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <table className="userlist-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{indexOfFirstUser + index + 1}</td>
                                    <td><img src={user.avatar} alt="avatar" className="avatar-img" /></td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.type}</td>
                                    <td>
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No data available in table</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Pagination controls */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredUsers.length / entriesPerPage) }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => paginate(page)} className={page === currentPage ? 'active' : ''}>
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserList;
