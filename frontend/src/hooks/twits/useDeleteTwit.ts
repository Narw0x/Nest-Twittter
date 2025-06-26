import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore.ts";
import { authHeader } from "../../utils/constants.ts";

export const useDeleteTwit = () => {
    const token = useAuthStore((state) => state.token);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (twitId: string) => {
        if (!token) {
            setError("Invalid authentication token");
            return false;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`http://localhost:4000/twits/${twitId}`, authHeader(token));

            if (response.status === 200) {
                return true;
            } else {
                setError("Failed to delete twit");
                return false;
            }
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        catch (error: never) {
            setError("Error deleting twit");
            console.error("Error deleting twit:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleDelete,
        isLoading,
        error,
    };
};