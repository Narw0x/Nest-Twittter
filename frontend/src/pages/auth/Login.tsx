import useLogin from "./hooks/useLogin.ts";


export default function LoginPage() {
    const { userInfo, errorMessage, messageLocation, handleChange, handleSubmit } = useLogin();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    {messageLocation && <p className="text-green-400 mb-4 text-center">{messageLocation}</p>}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                            value={userInfo.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                            value={userInfo.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="text-sm text-red-600 mb-4 text-center">{errorMessage}</p>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                    <hr className="my-4 text-gray-200" />
                    <p className="text-sm text-gray-600 text-center">
                        Don't have an account? <a href="/auth/register" className="text-blue-600 hover:underline">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
}