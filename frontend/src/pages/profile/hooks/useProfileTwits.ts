import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../../../store/userStore.ts";
import { useAuthStore } from "../../../store/authStore.ts";
import { authHeader } from "../../../utils/constants.ts";

interface Twits {
    _id: string;
    content: string;
    authorId: string;
    authorName: string;
}

export const useProfileTwits = () => {
    const userId = useUserStore((state) => state._id);
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();
    const [twits, setTwits] = useState<Twits[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId || !token) {
            setError("Invalid user ID or authentication token");
            setIsLoading(false);
            return;
        }

        const fetchUserTwits = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:4000/twits/user/${userId}`, authHeader(token));

                if (response.status === 200) {
                    setTwits(response.data);
                } else {
                    setError("Failed to fetch user twits");
                }
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            catch (error: never) {
                setError(error.response?.data?.message || "Error fetching user twits");
                console.error("Error fetching user twits:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserTwits();
    }, [userId, token]);

    const handleClickUpdate = (twitId: string) => {
        navigate(`/twits/update/${twitId}`, { replace: true });
    };

    return {
        twits,
        setTwits,
        isLoading,
        error,
        handleClickUpdate,
    };
};