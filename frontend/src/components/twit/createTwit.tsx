import { useState } from 'react';
import React from 'react';
import axios from "axios";

interface ErrorObject {
    message: string;
    code?: string;
}

interface twitProps {
    content: string;
    createdAt: string;
    // authorId: string;
}


const CreateTwit: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<ErrorObject | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try{
            const response = await axios.post('http://localhost:4000/twit', {content});
            if (response.status === 201) {
                setContent('');
            } else {
                setError({ message: 'Uploading failed. Please try again.' });
            }
        }catch (e: any){
            if (axios.isAxiosError(e)) {
                setError({ message: e.response?.data.message || 'An error occurred. Please try again.', code: e.code });
            } else {
                setError({ message: 'An unexpected error occurred. Please try again.' });
            }
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Create Twit</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's happening?"
                    required
                />
                {error && <p className="text-red-500 mb-2">{error.message}</p>}
                <button
                    type="submit"
                    className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Posting...' : 'Post Twit'}
                </button>
            </form>
        </div>
    );
};

export default CreateTwit;