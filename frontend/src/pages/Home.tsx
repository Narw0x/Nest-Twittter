import CreateTwit from "../components/twit/createTwit";

export function Home() {
    return(
        <section className="flex flex-col items-center justify-between gap-4">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Twit</h1>
            <CreateTwit/>
            <h2 className="text-2xl font-semibold mb-2">Latest Twits</h2>
        </section>
    );
}