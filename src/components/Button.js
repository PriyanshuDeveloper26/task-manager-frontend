import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ children, onClick, type = 'button', ...rest }) => {
    return (
        <ChakraButton 
            onClick={onClick} 
            type={type}
            {...rest}
        >
            {children}
        </ChakraButton>
    );
};

export default Button;
