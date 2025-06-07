export default function HomePage() {
    return(
        <section className="flex flex-col items-center justify-between gap-4 min-h-screen">
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold mt-4">Welcome to the Twit</h1>
                <p className="text-gray-500 mb-4">You can create, update, and delete twits.</p>
            </div>
        </section>
    );
}