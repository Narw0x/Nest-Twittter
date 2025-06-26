import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../store/authStore.ts";
import { useUserStore } from "../../store/userStore.ts";
import {authHeader} from "../../utils/constants.ts";

interface Twits {
    _id: string;
    content: string;
    userId: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
}

export const useViewTwits = () => {
    const [twits, setTwits] = useState<Twits[]>([]);
    const [likes, setLikes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userId = useUserStore((state) => state._id);
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();

    // Fetch user likes
    useEffect(() => {
        if (!userId || !token) {
            setError("Invalid user ID or authentication token");
            setIsLoading(false);
            return;
        }

        const fetchLikes = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:4000/likes/${userId}`, authHeader(token));

                if (response.status === 200) {
                    setLikes(response.data);
                } else {
                    setError("Failed to fetch likes");
                }
            } catch (error: any) {
                setError(error.response?.data?.message || "Error fetching likes");
                console.error("Error fetching likes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLikes();
    }, [userId, token]);

    // Fetch twits
    useEffect(() => {
        if (!token) {
            setError("Invalid authentication token");
            setIsLoading(false);
            return;
        }

        const fetchTwits = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get("http://localhost:4000/twits", authHeader(token));
                if (response.status === 200) {
                    setTwits(response.data);
                } else {
                    setError("Failed to fetch twits");
                }
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            catch (error: never) {
                setError(error.response?.data?.message || "Error fetching twits");
                console.error("Error fetching twits:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTwits();
    }, [token]);

    const handleClickNewTwit = () => {
        navigate("/twits/create", { replace: true });
    };

    const handleLike = async (twitId: string) => {
        if (!userId || !token) {
            setError("Invalid user ID or authentication token");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:4000/likes`,
                { twitId, userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                setLikes((prevLikes) =>
                    prevLikes.includes(twitId)
                        ? prevLikes.filter((like) => like !== twitId)
                        : [...prevLikes, twitId]
                );
            } else {
                setError("Failed to like/unlike twit");
            }
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        catch (error: never) {
            setError(error.response?.data?.message || "Error liking/unliking twit");
            console.error("Error liking/unliking twit:", error);
        }
    };

    return {
        twits,
        likes,
        isLoading,
        error,
        handleClickNewTwit,
        handleLike,
    };
};