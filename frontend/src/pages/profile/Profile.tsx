import { useProfilePage } from "./hooks/useProfileData.ts";
import ProfileTwits from "../../components/profile/ProfileTwits";

export default function ProfilePage() {
    const { profileData, isLoading, error } = useProfilePage();

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
                {isLoading && <p className="text-gray-500">Loading profile data...</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {profileData && !isLoading && !error && (
                    <div>
                        <p className="text-gray-700"><strong>Username:</strong> {profileData.name}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {profileData.email}</p>
                    </div>
                )}
            </div>
            <ProfileTwits />
        </section>
    );
}