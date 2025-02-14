import { useState } from 'react';

export default function CreateMedicalBlog() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const submitBlog = (e) => {
        e.preventDefault();
        Inertia.post('/blogs', {
            title,
            body,
        });
    };

    return (
        <form onSubmit={submitBlog} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter blog title"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    rows="3"
                    placeholder="Write a brief Body..."
                    required
                />
            </div>



            <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
                Publish Medical Blog
            </button>
        </form>
    );
}