export function About(){
    return(
        <section className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">About Twit</h1>
            <p className="mb-4">
                Twit is a simple Twitter clone built with React, TypeScript, and Tailwind CSS.
                It allows users to post tweets and follow other users.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Features</h2>
            <ul className="list-disc pl-5 mb-4">
                <li>Post tweets</li>
                <li>Follow and unfollow users</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
            <p className="mb-4">
                This project is built using the following technologies:
            </p>
            <ul className="list-disc pl-5">
                <li>React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Nest.js (for backend)</li>
            </ul>
        </section>
    )
}