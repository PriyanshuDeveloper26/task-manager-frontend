import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (!userName) {
            alert('Please enter a user name.');
            return;
        }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, { name: userName });
            setUserName('');
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="users-page-container">
            <div className="users-grid">
                <div className="users-form-column">
                    <h2 className="users-heading">Add New User</h2>
                    <form onSubmit={handleCreateUser} className="users-form">
                        <Input
                            placeholder="Enter user name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <Button type="submit">Add User</Button>
                    </form>
                </div>
                <div className="users-list-column">
                    <h2 className="users-heading">Users</h2>
                    <div className="users-list-grid">
                        {users.map(user => (
                            <Card key={user._id}>
                                <p className="user-name">{user.name}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
