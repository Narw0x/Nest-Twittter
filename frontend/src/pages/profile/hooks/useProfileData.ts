import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../../store/authStore.ts";
import { authHeader } from "../../../utils/constants.ts";

interface IProfile {
    name: string;
    email: string;
}

export const useProfilePage = () => {
    const { userId } = useParams<{ userId: string }>();
    const token = useAuthStore((state) => state.token);
    const [profileData, setProfileData] = useState<IProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId || !token) {
            setError("Invalid user ID or authentication token");
            setIsLoading(false);
            return;
        }

        const fetchProfile = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:4000/users/${userId}`, authHeader(token));

                if (response.status === 200){
                    setProfileData(response.data);
                }else{
                    setError("Failed to fetch profile");
                }

            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            catch (error: never) {
                setError(error.response?.data?.message || "Error fetching profile");
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userId, token]);

    return {
        profileData,
        isLoading,
        error,
    };
};