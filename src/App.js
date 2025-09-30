import React, { useState } from 'react';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import Button from './components/Button';
import './styles.css'; // Import the new stylesheet

function App() {
    const [activePage, setActivePage] = useState('tasks');

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">Task Manager</h1>
            </header>
            <nav className="app-nav">
                <Button onClick={() => setActivePage('tasks')}>Tasks</Button>
                <Button onClick={() => setActivePage('users')}>Users</Button>
            </nav>
            <main className="app-main">
                {activePage === 'tasks' ? <TasksPage /> : <UsersPage />}
            </main>
        </div>
    );
}

export default App;
