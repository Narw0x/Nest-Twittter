import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {isValidEmail, isValidText, isValidPassword} from "../../utils/validation";


interface Props {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface ErrorMessage{
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
}

export default function RegisterPage(){
    const [userInfo, setUserInfo] = useState<Props>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState<ErrorMessage>({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const navigate = useNavigate();

    const [message, setMessage] = useState<string>('')




    const ErrorMessage = {
        name: 'Name must be at least 3 characters long and contain only letters, numbers, and underscores.',
        email: 'Please enter a valid email address.',
        password: 'Password must be at least 6 characters long. It must contain at least one uppercase letter, one lowercase letter, and one number.',
        confirmPassword: 'Passwords do not match.'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [id]: value
        }));
    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!isValidText(userInfo.name)) {
            setError(prevState => ({
                ...prevState,
                name: true
            }));
            return;
        }
        if(!isValidEmail(userInfo.email)) {
            setError(prevState => ({
                ...prevState,
                name: false,
                email: true
            }));
            return;
        }

        if(!isValidPassword(userInfo.password)) {
            setError(prevState => ({
                ...prevState,
                name: false,
                email: false,
                password: true
            }));
            return;
        }

        if(userInfo.password !== userInfo.confirmPassword) {
            setError(prevState => ({
                ...prevState,
                name: false,
                email: false,
                password: false,
                confirmPassword: true
            }));
            return;
        }

        setError({
            name: false,
            email: false,
            password: false,
            confirmPassword: false
        });


        try {
            axios.post('http://localhost:4000/auth/register', userInfo)
                .then(response => {
                    if (response.status === 201) {
                        if (response.data.statusCode === 400) {
                            setMessage(response.data.message);
                            return;
                        }
                        navigate('/auth/login', { replace: true, state: {message: 'Registration successful! Please log in.'} });
                    }
                })
                .catch(error => {
                    console.error('Error during registration:', error);
                    if (axios.isAxiosError(error) && error.response) {
                        if (error.response.status === 400) {
                            setMessage(error.response.data.message);
                        } else {
                            setMessage('An unexpected error occurred. Please try again later.');
                        }
                    } else {
                        setMessage('An unexpected error occurred. Please try again later.');
                    }
                });
        }catch(error){
            console.error('Unexpected error during registration:', error);
        }
    };
    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold my-4 text-center">Register</h1>
                <p className="text-gray-500 mb-4 text-center">Create a new account to start twitting.</p>
                {message && <p className="text-center text-red-500 mb-4">{message}</p>}
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
                        {error.name && <p className="text-red-500 text-xs mt-1">{ErrorMessage.name}</p>}
                        <input type="text" id="name" name="name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={userInfo.name} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        {error.email && <p className="text-red-500 text-xs mt-1">{ErrorMessage.email}</p>}
                        <input type="email" id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required value={userInfo.email} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        {error.password && <p className="text-red-500 text-xs mt-1">{ErrorMessage.password}</p>}
                        <input type="password" id="password" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required value={userInfo.password} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        {error.confirmPassword && <p className="text-red-500 text-xs mt-1">{ErrorMessage.confirmPassword}</p>}
                        <input type="password" id="confirmPassword" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required value={userInfo.confirmPassword} onChange={handleChange} />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Register</button>
                    <hr className="my-4 text-gray-200" />
                    <p className="text-sm text-gray-500 text-center">Already have an account? <a href="/auth/login" className="text-blue-600 hover:underline">Login here</a>.</p>
                </form>
            </div>
        </section>
    )
}