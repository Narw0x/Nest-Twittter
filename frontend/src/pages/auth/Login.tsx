import useLogin from "./hooks/useLogin.ts";
import {Link} from "react-router-dom";
import Input from "../../components/Input.tsx";


export default function LoginPage() {
    const { userInfo, errorMessage, messageLocation, handleChange, handleSubmit } = useLogin();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    {messageLocation && <p className="text-green-400 mb-4 text-center">{messageLocation}</p>}
                    <Input value={userInfo.email} name={"Email"} handleChange={handleChange} id={"email"}/>
                    <Input value={userInfo.password} name={"Password"} handleChange={handleChange} id={'password'}/>
                    <p className="text-sm text-red-600 mb-4 text-center">{errorMessage}</p>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                    <hr className="my-4 text-gray-200" />
                    <p className="text-sm text-gray-600 text-center">
                        Don't have an account? <Link to="/auth/register" className="text-blue-600 hover:underline">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}