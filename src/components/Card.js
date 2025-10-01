import React from 'react';
import { Box } from '@chakra-ui/react';

const Card = ({ children, ...rest }) => {
    return (
        <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            {...rest}
        >
            {children}
        </Box>
    );
};

export default Card;
