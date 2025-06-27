import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../../store/authStore.ts";
import { authHeader } from "../../../utils/constants.ts";
import {isValidText} from "../../../utils/validation.ts";

export const useUpdateTwit = () => {
    const { twitId } = useParams<{ twitId: string }>();
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();
    const [content, setContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!twitId || !token) {
            setError("Invalid twit ID or authentication token");
            setIsLoading(false);
            return;
        }

        const fetchTwit = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:4000/twits/${twitId}`, authHeader(token));

                if (response.status === 200) {
                    setContent(response.data.content);
                } else {
                    setError("Failed to fetch twit");
                }
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            catch (error: never) {
                setError("Error fetching twit");
                console.error("Error fetching twit:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTwit();
    }, [twitId, token]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
        setError(null); // Clear error on new input
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!isValidText(content)) {
            setError("Content cannot be empty");
            setIsLoading(false);
            return;
        }
        if (!twitId || !token) {
            setError("Invalid twit ID or authentication token");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:4000/twits/${twitId}`,
                { content },
                authHeader(token),
            );
            if (response.status === 200) {
                navigate("/twits", { replace: true });
            }

        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        catch (error: never) {
            setError("Failed to update twit");
            console.error("Error updating twit:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        content,
        handleChange,
        handleSubmit,
        isLoading,
        error,
    };
};