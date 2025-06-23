import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/userStore";
import {useAuthStore} from "../../store/authStore";

export default function CreateTwit() {
    const id = useUserStore((state => state._id));
    const token = useAuthStore((state => state.token));
    const [content, setContent] = useState<string>('')
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post('http://localhost:4000/twits/create', {
            content,
            userId: id
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            if (response.status === 201) {
                navigate('/twits', { replace: true });
            }
        }
    ).catch(error => {
            console.error('Error creating twit:', error);
        })
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }


    return (
        <section className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Create a New Twit</h1>
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
                    Post Twit
                </button>
            </form>
        </section>
    )
}