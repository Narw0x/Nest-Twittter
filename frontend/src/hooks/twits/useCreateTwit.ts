import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../../store/userStore.ts";
import { useAuthStore } from "../../store/authStore.ts";

export const useCreateTwit = () => {
    const [content, setContent] = useState<string>("");
    const id = useUserStore((state) => state._id);
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/twits/create",
                {
                    content,
                    userId: id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                navigate("/twits", { replace: true });
            }
        } catch (error) {
            console.error("Error creating twit:", error);
        }
    };

    return {
        content,
        handleChange,
        handleSubmit,
    };
};