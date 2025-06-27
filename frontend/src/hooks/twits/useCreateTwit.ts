import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../../store/userStore.ts";
import { useAuthStore } from "../../store/authStore.ts";
import { authHeader } from "../../utils/constants.ts";
import { isValidText } from "../../utils/validation.ts";

export const useCreateTwit = () => {
    const [content, setContent] = useState<string>("");
    const userId = useUserStore((state) => state._id);
    const token = useAuthStore((state) => state.token);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        if(!isValidText(content)) {
            setError("Content cannot be empty");
            return;
        }

        if (!userId || !token) {
            setError("Invalid user ID or authentication token");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:4000/twits/create",
                {
                    content,
                    userId,
                },
                authHeader(token),
            );
            if (response.status !== 201) {
                setError("Failed to create twit");
                return;
            }
            setContent("");
            setIsLoading(false);
            navigate("/twits", { replace: true });
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Error creating twit");
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return {
        content,
        isLoading,
        error,
        handleChange,
        handleSubmit,
    };
};