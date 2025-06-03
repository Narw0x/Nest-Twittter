export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-xl font-bold">Twit</a>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/about" className="hover:underline">About</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}