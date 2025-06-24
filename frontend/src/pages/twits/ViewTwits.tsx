import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/authStore";
import {useUserStore} from "../../store/userStore";

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

export default function ViewTwits() {
    const [twits, setTwits] = useState<Twits[]>([])
    const userId = useUserStore((state) => state._id);
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();
    const [likes, setLikes] = useState<string[]>([])

    useEffect(() => {
        axios.get(`http://localhost:4000/likes/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setLikes(response.data);
                } else {
                    console.error('Failed to fetch likes:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error fetching likes:', error);
            });
    }, [token, userId]);



    useEffect(() => {
        axios.get('http://localhost:4000/twits',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setTwits(response.data);
                } else {
                    console.error('Failed to fetch twits:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error fetching twits:', error);
            });
    }, [token]);

    const handleClickNewTwit = () => {
        navigate('/twits/create', { replace: true });
    }

    const handleLike = (id:string) => {
        axios.post(`http://localhost:4000/likes`,{twitId: id, userId: userId}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            if (response.status === 201) {
                setLikes(prevLikes => {
                    if (prevLikes.includes(id)) {
                        return prevLikes.filter(like => like !== id);
                    } else {
                        return [...prevLikes, id];
                    }
                });
            } else {
                console.error('Failed to like twit:', response.statusText);
            }
        })
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">View Twits</h1>
            <div className="text-right mb-6">
                <button onClick={handleClickNewTwit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add new</button>
            </div>
            {twits.length > 0 ? (
                <ul className="space-y-4">
                    {twits.map(twit => (
                        <li key={twit._id} className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-gray-800">{twit.content}</p>
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-gray-500 mt-2">Author: {twit.user.name}</p>
                                <button onClick={()=> handleLike(twit._id)} className="text-gray-500 mt-2">{
                                    likes?.includes(twit._id) ? 'Unlike' : 'Like'
                                }</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No twits available.</p>
            )}
        </div>
    );
}