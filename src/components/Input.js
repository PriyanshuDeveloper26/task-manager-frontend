import React from 'react';
import { Input as ChakraInput } from '@chakra-ui/react';

const Input = ({ type = 'text', placeholder, value, onChange, ...rest }) => {
    return (
        <ChakraInput
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
        />
    );
};

export default Input;
