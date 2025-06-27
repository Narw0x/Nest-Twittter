import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { isValidEmail, isValidText, isValidPassword } from "../../../utils/validation.ts";

interface Props {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ErrorMessage {
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
}

const useRegister = () => {
    const [userInfo, setUserInfo] = useState<Props>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<ErrorMessage>({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const errorTextMap: Record<keyof ErrorMessage, string> = {
        name: 'Name must be at least 3 characters long and contain only letters, numbers, and underscores.',
        email: 'Please enter a valid email address.',
        password: 'Password must be at least 6 characters long. It must contain at least one uppercase letter, one lowercase letter, and one number.',
        confirmPassword: 'Passwords do not match.'
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValidText(userInfo.name)) {
            setError(prevState => ({ ...prevState, name: true }));
            return;
        }

        if (!isValidEmail(userInfo.email)) {
            setError(prevState => ({ ...prevState, name: false, email: true }));
            return;
        }

        if (!isValidPassword(userInfo.password)) {
            setError(prevState => ({ ...prevState, name: false, email: false, password: true }));
            return;
        }

        if (userInfo.password !== userInfo.confirmPassword) {
            setError(prevState => ({ ...prevState, name: false, email: false, password: false, confirmPassword: true }));
            return;
        }

        setError({
            name: false,
            email: false,
            password: false,
            confirmPassword: false
        });

        try {
            const response = await axios.post('http://localhost:4000/auth/register', userInfo);
            if (response.status === 201) {
                if (response.data.statusCode === 400) {
                    setMessage(response.data.message);
                    return;
                }
                navigate('/auth/login', { replace: true, state: { message: 'Registration successful! Please log in.' } });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            const axiosError = error as AxiosError<{ message: string }>;
            if (axiosError.response) {
                if (axiosError.response.status === 400) {
                    setMessage(axiosError.response.data.message);
                } else {
                    setMessage('An unexpected error occurred. Please try again later.');
                }
            } else {
                setMessage('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return {
        userInfo,
        error,
        message,
        errorTextMap,
        handleChange,
        handleSubmit
    };
};

export default useRegister;