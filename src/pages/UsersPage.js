import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Grid,
    GridItem,
    Heading,
    Card,
    Stack
} from '@chakra-ui/react';


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
        <Box p={8}>
            <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                <Box flex={1}>
                    <Heading as="h2" size="lg" mb={4}>Add New User</Heading>
                    <form onSubmit={handleCreateUser}>
                        <Stack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>User Name</FormLabel>
                                <Input
                                    placeholder="Enter user name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </FormControl>
                            <Button type="submit" colorScheme="blue">Add User</Button>
                        </Stack>
                    </form>
                </Box>
                <Box flex={2}>
                    <Heading as="h2" size="lg" mb={4}>Users</Heading>
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
                        {users.map(user => (
                            <GridItem key={user._id}>
                                <Card>
                                    <Heading as="h3" size="md">{user.name}</Heading>
                                </Card>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            </Flex>
        </Box>
    );
};

export default UsersPage;
