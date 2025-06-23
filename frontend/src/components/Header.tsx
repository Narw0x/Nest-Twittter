import {NavLink} from "react-router-dom";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore";
import {useUserStore} from "../store/userStore";

export default function Header() {
    const token = useAuthStore((state) => state.token);
    const clearToken = useAuthStore((state) => state.clearToken);
    const clearUser = useUserStore((state) => state.clearUser);
    const id = useUserStore((state) => state._id);

    const navigate = useNavigate();

    const clear = () => {
        navigate("/", { replace: true });
        clearToken();
        clearUser();
    }

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-xl font-bold">Twit</a>
                <nav className="flex items-center justify-between gap-4">
                    <ul className="flex space-x-4">
                        <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'text-red-500 ' : 'text-white hover:text-red-500')}>About</NavLink></li>
                    </ul>
                    {token &&
                        <ul className="flex space-x-4">
                            <li>
                                <NavLink to="/twits" className={({ isActive }) => (isActive ? 'text-red-500 ' : 'text-white hover:text-red-500')}>Twits</NavLink>
                            </li>
                            <li className="">
                                <NavLink to={`/profile/${id}`} className={({ isActive }) => (isActive ? 'text-red-500 ' : 'text-white hover:text-red-500')}>Profile</NavLink>
                            </li>
                            <li className="">
                                <button onClick={clear} className="text-white hover:text-red-500">Logout</button>
                            </li>
                        </ul>
                    }
                    {!token &&
                        <ul className="flex space-x-4">
                            <li className="">
                                <NavLink to="/auth/login" className={({ isActive }) => (isActive ? 'text-red-500 ' : 'text-white hover:text-red-500')}>Login</NavLink>
                            </li>
                            <li className="">
                                <NavLink to="/auth/register" className={({ isActive }) => (isActive ? 'text-red-500 ' : 'text-white hover:text-red-500')}>Register</NavLink>
                            </li>
                        </ul>
                    }
                </nav>
            </div>
        </header>
    );
}