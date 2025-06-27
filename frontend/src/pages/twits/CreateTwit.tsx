import { useCreateTwit } from "./hooks/useCreateTwit.ts";

export default function CreateTwit() {
    const { content, handleChange, handleSubmit } = useCreateTwit();

    return (
        <section className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Create a New Twit</h1>
            <form
                className="bg-white p-6 rounded shadow-md max-w-md mx-auto"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
          <textarea
              id="content"
              name="content"
              rows={3}
              value={content}
              onChange={handleChange}
              className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="What's happening?"
          ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Post Twit
                </button>
            </form>
        </section>
    );
}