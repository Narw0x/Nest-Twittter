import {useState} from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuthStore} from "../../store/authStore";
import {useUserStore} from "../../store/userStore";

interface LoginProps {
    email: string;
    password: string;
}
interface IResData {
    status: number;
    data: {
        access_token: string;
        userData: {
            _doc:{
                _id: string;
                name: string;
                email: string;
                createdAt: Date;
                updatedAt: Date;
            }
        };
    }
}

export default function LoginPage() {
    const setToken = useAuthStore((state) => state.setToken);
    const setUser =  useUserStore((state) => state.setUser);
    const [userInfo, setUserInfo] = useState<LoginProps>({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const success = (res: IResData) => {
        setToken(res.data.access_token);
        setUser(res.data.userData._doc);
        navigate("/profile/" + res.data.userData._doc._id, { replace: true });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            axios.post('http://localhost:4000/auth/login', userInfo)
                .then(response => {
                    if (response.status === 201) {
                        console.log(response);
                        success(response);
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.error('Error during login:', error);
                });
        }catch(error){
            console.error('Unexpected error during login:', error);
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required value={userInfo.email} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required value={userInfo.password} onChange={handleChange} />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">Login</button>
                </form>
            </div>
        </div>
    )
}