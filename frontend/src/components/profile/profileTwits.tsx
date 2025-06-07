import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/userStore";
import {useAuthStore} from "../../store/authStore";

interface Twits {
    _id: string;
    content: string;
    authorId: string;
    authorName: string;
}

export default function ProfileTwits(){
    const id = useUserStore((state => state._id));
    const token = useAuthStore((state) => state.token);
    const [twits, setTwits] = useState<Twits[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:4000/twits/user/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setTwits(response.data);
                } else {
                    console.error('Failed to fetch user twits:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error fetching user twits:', error);
        })
    }, [id, token]);

    const handleClickUpdate = (Id:string) => {
        navigate(`/twits/update/${Id}`, { replace: true });
    }

    const handleClickDelete = (Id:string) => {
        axios.delete(`http://localhost:4000/twits/${Id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setTwits(prevTwits => prevTwits.filter(twit => twit._id !== Id));
                } else {
                    console.error('Failed to delete twit:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error deleting twit:', error);
            });

    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">Profile Twits</h1>
            <p className="text-gray-600">This is where user twits will be displayed.</p>
            {twits.length > 0 && (
                <div className="mt-6 space-y-4 w-full max-w-md">
                    {twits.map(twit => (
                        <>
                            <div key={twit._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between">
                                <div className="flex flex-col ">
                                    <h2 className="text-lg font-semibold">Author: {twit.authorName}</h2>
                                    <p className="text-gray-600">{twit.content}</p>
                                </div>
                                <div className="flex  space-x-4">
                                    <button onClick={() => handleClickUpdate(twit._id)} className="text-blue-500">Update</button>
                                    <button onClick={() => handleClickDelete(twit._id)} className="text-red-500">Delete</button>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};