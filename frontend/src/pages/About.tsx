export default function AboutPage(){
    return(
        <section className="mx-auto  p-4 bg-gray-100 text-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-center">About Twit</h1>
            <p className="mb-4">
                Twit is a simple Twitter clone built with React, TypeScript, and Tailwind CSS.
                It allows users to post tweets and follow other users.
            </p>
            <div className="flex  justify-center  container mx-auto gap-16">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold mb-2">Features</h2>
                    <ul className="mb-4">
                        <li>Post tweets</li>
                        <li>Follow and unfollow users</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
                    <ul className="">
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>Tailwind CSS</li>
                        <li>Nest.js (for backend)</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}