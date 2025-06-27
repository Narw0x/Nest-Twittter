import useRegister from "../../hooks/auth/useRegister.ts";


export default function RegisterPage() {
    const { userInfo, error, message, errorTextMap, handleChange, handleSubmit } = useRegister();

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold my-4 text-center">Register</h1>
                <p className="text-gray-500 mb-4 text-center">Create a new account to start twitting.</p>
                {message && <p className="text-center text-red-500 mb-4">{message}</p>}
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
                        {error.name && <p className="text-red-500 text-xs mt-1">{errorTextMap.name}</p>}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            value={userInfo.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        {error.email && <p className="text-red-500 text-xs mt-1">{errorTextMap.email}</p>}
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                            value={userInfo.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        {error.password && <p className="text-red-500 text-xs mt-1">{errorTextMap.password}</p>}
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                            value={userInfo.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        {error.confirmPassword && <p className="text-red-500 text-xs mt-1">{errorTextMap.confirmPassword}</p>}
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                            value={userInfo.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                        Register
                    </button>
                    <hr className="my-4 text-gray-200" />
                    <p className="text-sm text-gray-500 text-center">
                        Already have an account? <a href="/auth/login" className="text-blue-600 hover:underline">Login here</a>.
                    </p>
                </form>
            </div>
        </section>
    );
}