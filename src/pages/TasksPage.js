import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Button,
    Grid,
    GridItem,
    Heading,
    Text,
    Stack,
    Card
} from '@chakra-ui/react';


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
        <Box p={8}>
            <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                <Box flex={1}>
                    <Heading as="h2" size="lg" mb={4}>Add New Task</Heading>
                    <form onSubmit={handleCreateTask}>
                        <Stack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Assign to</FormLabel>
                                <Select
                                    placeholder="Select User"
                                    value={selectedUser}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                >
                                    {users.map(user => (
                                        <option key={user._id} value={user._id}>{user.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button type="submit" colorScheme="blue">Add Task</Button>
                        </Stack>
                    </form>
                </Box>
                <Box flex={2}>
                    <Heading as="h2" size="lg" mb={4}>Tasks</Heading>
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                        {currentTasks.map(task => (
                            <GridItem key={task._id}>
                                <Card>
                                    <Heading as="h3" size="md" mb={2}>{task.title}</Heading>
                                    <Text mb={2}>{task.description}</Text>
                                    <Text fontSize="sm" color="gray.500">
                                        <strong>Assigned to:</strong> {task.user ? task.user.name : 'N/A'}
                                    </Text>
                                </Card>
                            </GridItem>
                        ))}
                    </Grid>
                    <Stack direction="row" spacing={4} mt={8} justify="center">
                        {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, i) => (
                            <Button key={i + 1} onClick={() => paginate(i + 1)} colorScheme={currentPage === i + 1 ? 'blue' : 'gray'}>
                                {i + 1}
                            </Button>
                        ))}
                    </Stack>
                </Box>
            </Flex>
        </Box>
    );
};

export default TasksPage;
