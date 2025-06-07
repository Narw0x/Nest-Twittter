import {redirect} from "react-router-dom";

export function checkAuthToken(): null | Response {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        return redirect('http://localhost:3000/auth/login');
    }
    return null;
}
