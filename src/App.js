import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';

function App() {
    return (
        <Router>
            <Box>
                <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
                    <Flex align="center" mr={5}>
                        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
                            Task Manager
                        </Heading>
                    </Flex>

                    <Box>
                        <Link as={RouterLink} to="/" p={2} mr={4}>
                            Tasks
                        </Link>
                        <Link as={RouterLink} to="/users" p={2}>
                            Users
                        </Link>
                    </Box>
                </Flex>

                <Box p={8}>
                    <Routes>
                        <Route path="/" element={<TasksPage />} />
                        <Route path="/users" element={<UsersPage />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
