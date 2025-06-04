export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-xl font-bold">Twit</a>
                <nav className="flex items-center justify-between gap-4">
                    <ul className="flex space-x-4">
                        <li><a href="/twits" className="hover:underline">Twits</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                    </ul>
                    <ul>
                        <li className="inline-block mr-4">
                            <a href="/login" className="text-white hover:underline">Login</a>
                        </li>
                        <li className="inline-block">
                            <a href="/register" className="text-white hover:underline">Register</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}