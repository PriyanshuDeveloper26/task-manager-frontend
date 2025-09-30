import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(6);

    useEffect(() => {
        fetchTasks();
        fetchUsers();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!title || !selectedUser) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, { title, description, user: selectedUser });
            setTitle('');
            setDescription('');
            setSelectedUser('');
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    // Pagination
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="tasks-page-container">
            <div className="tasks-grid">
                <div className="tasks-form-column">
                    <h2 className="tasks-heading">Add New Task</h2>
                    <form onSubmit={handleCreateTask} className="tasks-form">
                        <Input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="tasks-form-field"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <select 
                            value={selectedUser} 
                            onChange={(e) => setSelectedUser(e.target.value)} 
                            className="tasks-form-field"
                        >
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </select>
                        <Button type="submit">Add Task</Button>
                    </form>
                </div>
                <div className="tasks-list-column">
                    <h2 className="tasks-heading">Tasks</h2>
                    <div className="tasks-list-grid">
                        {currentTasks.map(task => (
                            <Card key={task._id}>
                                <h3 className="task-title">{task.title}</h3>
                                <p className="task-description">{task.description}</p>
                                <p className="task-assigned-to">
                                    <strong>Assigned to:</strong> {task.user ? task.user.name : 'N/A'}
                                </p>
                            </Card>
                        ))}
                    </div>
                    <div className="tasks-pagination">
                        {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, i) => (
                            <Button key={i + 1} onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TasksPage;
