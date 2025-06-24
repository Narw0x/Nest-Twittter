import { useViewTwits } from "../../hooks/twits/useViewTwit.ts";

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
    const { twits, likes, isLoading, error, handleClickNewTwit, handleLike } = useViewTwits();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">View Twits</h1>
            {isLoading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="text-right mb-6">
                <button
                    onClick={handleClickNewTwit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={isLoading}
                >
                    Add new
                </button>
            </div>
            {twits.length > 0 ? (
                <ul className="space-y-4">
                    {twits.map((twit: Twits) => (
                        <li key={twit._id} className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-gray-800">{twit.content}</p>
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-gray-500 mt-2">Author: {twit.user.name}</p>
                                <button
                                    onClick={() => handleLike(twit._id)}
                                    className="text-gray-500 mt-2 hover:text-blue-600 disabled:text-gray-300"
                                    disabled={isLoading}
                                >
                                    {likes?.includes(twit._id) ? "Unlike" : "Like"}
                                </button>
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