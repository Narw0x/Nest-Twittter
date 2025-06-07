import {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/authStore";

export default function UpdateTwit() {
    const {id} = useParams();
    const token = useAuthStore((state) => state.token);
    const [content, setContent] = useState<string>('')
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:4000/twits/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                setContent(response.data.content);
            } else {
                console.error('Failed to fetch twit:', response.statusText);
            }
        }).catch(error => {
            console.error('Error fetching twit:', error);
        })
    }, [id, token]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.put(`http://localhost:4000/twits/${id}`, {
            content
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            if (response.status === 200) {
                navigate(`/twits`, { replace: true });
            }
        }).catch(error => {
            console.error('Error updating twit:', error);
        });
    }

    return (
        <section className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Update Twit</h1>
            <form className="bg-white p-6 rounded shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <textarea
                        id="content"
                        name="content"
                        rows={3}
                        value={content}
                        onChange={handleChange}
                        className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="What's happening?"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Update Twit
                </button>
            </form>
        </section>
    );
}