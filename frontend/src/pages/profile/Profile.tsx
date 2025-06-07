import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

import {useAuthStore} from "../../store/authStore";
import ProfileTwits from "../../components/profile/profileTwits";

interface IProfile {
    name: string;
    email: string;
}

export default function ProfilePage() {
    const {id} =useParams();
    const token = useAuthStore((state) => state.token);
    const [profileData, setProfileData] = useState<IProfile>({
        name: '',
        email: ''
    })

    useEffect(() => {
        axios.get(`http://localhost:4000/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {

                setProfileData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the profile!', error);
            });
    }, [id]);
    return (
        <section className="flex flex-col items-center gap-4 min-h-screen">
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold mt-4">Profile Page</h1>
                <p className="text-gray-500 mb-4">This is your profile page.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500 mb-4">You can view and edit your profile information here.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                {profileData ? (
                    <div>
                        <p className="text-gray-700"><strong>Username:</strong> {profileData.name}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {profileData.email}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">Loading profile data...</p>
                )}
            </div>
            <ProfileTwits />
        </section>
    )
}