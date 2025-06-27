import { useProfileTwits } from "../../pages/profile/hooks/useProfileTwits.ts";
import { useDeleteTwit } from "../../pages/twits/hooks/useDeleteTwit.ts";
import { Link } from "react-router-dom";

interface Twits {
    _id: string;
    content: string;
    authorId: string;
    authorName: string;
}

export default function ProfileTwits() {
    const { twits, setTwits, isLoading, error, handleClickUpdate } = useProfileTwits();
    const { handleDelete, isLoading: deleteLoading, error: deleteError } = useDeleteTwit();

    const handleClickDelete = async (twitId: string) => {
        const success = await handleDelete(twitId);
        if (!success) {
            return;
        }
        setTwits((prevTwits) => prevTwits.filter((twit) => twit._id !== twitId));

    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">Profile Twits</h1>
            {(isLoading || deleteLoading) && <p className="text-center">Loading...</p>}
            {(error || deleteError) && (
                <p className="text-red-500 text-center mb-4">{error || deleteError}</p>
            )}
            {twits.length > 0 ? (
                <div className="mt-6 space-y-4 w-full max-w-md">
                    {twits.map((twit: Twits) => (
                        <div
                            key={twit._id}
                            className="bg-white p-4 rounded-lg shadow-md flex justify-between"
                        >
                            <div className="flex flex-col">
                                <h2 className="text-lg font-semibold">Author: {twit.authorName}</h2>
                                <p className="text-gray-600">{twit.content}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleClickUpdate(twit._id)}
                                    className="text-blue-500 hover:text-blue-600 disabled:text-gray-300"
                                    disabled={isLoading || deleteLoading}
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleClickDelete(twit._id)}
                                    className="text-red-500 hover:text-red-600 disabled:text-gray-300"
                                    disabled={isLoading || deleteLoading}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <p className="text-center text-gray-500">You don't have any Twits</p>
                    <button>
                        <Link to="/twits/create" className="text-blue-500 hover:text-blue-600">
                            Create Twit
                        </Link>
                    </button>
                </>
            )}
        </div>
    );
}