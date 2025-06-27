import React, { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "../../../store/authStore.ts";
import { useUserStore } from "../../../store/userStore.ts";

interface LoginProps {
    email: string;
    password: string;
}

interface IResData {
    status: number;
    data: {
        access_token: string;
        returnUser: {
            _id: string;
            name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
    };
}

const useLogin = () => {
    const setToken = useAuthStore((state) => state.setToken);
    const setUser = useUserStore((state) => state.setUser);
    const location = useLocation();
    const messageLocation = location.state?.message;
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [userInfo, setUserInfo] = useState<LoginProps>({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const success = (res: IResData) => {
        setToken(res.data.access_token);
        setUser(res.data.returnUser);
        navigate("/profile/" + res.data.returnUser._id, { replace: true });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        if (!userInfo.email || !userInfo.password) {
            setErrorMessage("Email and password are required.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/auth/login', userInfo);
            console.log("Login response:", response);
            if (response) {
                success(response);
            }
        } catch (error) {
            console.log("Error during login:", error);
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                if (axiosError.response.status === 401) {
                    setErrorMessage("Invalid email or password. Please try again.");
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again later.");
                }
            } else {
                setErrorMessage("Network error. Please check your connection.");
            }
        }
    };

    return {
        userInfo,
        errorMessage,
        messageLocation,
        handleChange,
        handleSubmit
    };
};

export default useLogin;