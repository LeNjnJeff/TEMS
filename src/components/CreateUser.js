import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';
const CreateUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('Administrator');
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission, e.g., call your backend to create a user
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('loginType', loginType);
        formData.append('avatar', avatar);

        // Simulate API call
        console.log('User created:', { firstName, lastName, username, password, loginType, avatar });

        // After successful creation, redirect back to the user list
        navigate('/');
    };

    return (
        <div className="create-user-container">
            <h1>Create New User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Login Type</label>
                    <select 
                        value={loginType} 
                        onChange={(e) => setLoginType(e.target.value)}
                    >
                        <option value="Administrator">Administrator</option>
                        <option value="User">User</option>
                    </select>
                </div>
                <div>
                    <label>Avatar</label>
                    <input 
                        type="file" 
                        onChange={(e) => setAvatar(e.target.files[0])} 
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default CreateUser;
