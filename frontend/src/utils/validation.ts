export function isValidText(value:string, minLength = 1, maxLength = 35) {
    return value.trim().length >= minLength && value.trim().length <= maxLength;
}

export function isValidEmail(value:string, minLength = 1, maxLength = 35) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
}

export function isValidPassword(value:string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(value.trim());
}