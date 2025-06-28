import useRegister from "./hooks/useRegister.ts";
import Input from "../../components/Input.tsx";


export default function RegisterPage() {
    const { userInfo, error, message, errorTextMap, handleChange, handleSubmit } = useRegister();
    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold my-4 text-center">Register</h1>
                <p className="text-gray-500 mb-4 text-center">Create a new account to start twitting.</p>
                {message && <p className="text-center text-red-500 mb-4">{message}</p>}
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <Input value={userInfo.name} name={'Name'} handleChange={handleChange} error={error.name} errorTextMap={errorTextMap.name} id={'name'} />
                    <Input value={userInfo.email} name={'Email'} handleChange={handleChange} error={error.email} errorTextMap={errorTextMap.email} id={'email'} />
                    <Input value={userInfo.password} name={'Password'} handleChange={handleChange} error={error.password} errorTextMap={errorTextMap.password} id={'password'} />
                    <Input value={userInfo.confirmPassword} name={'Confirm password'} handleChange={handleChange} error={error.confirmPassword} errorTextMap={errorTextMap.confirmPassword} id={'confirmPassword'} />
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