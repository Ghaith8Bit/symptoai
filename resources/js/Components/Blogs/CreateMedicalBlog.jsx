import { useState } from 'react';

export default function CreateMedicalBlog() {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [keyPoints, setKeyPoints] = useState(['']);

    const addKeyPoint = () => {
        setKeyPoints([...keyPoints, '']);
    };

    const handleKeyPointChange = (index, value) => {
        const newKeyPoints = [...keyPoints];
        newKeyPoints[index] = value;
        setKeyPoints(newKeyPoints);
    };

    const submitBlog = (e) => {
        e.preventDefault();
        Inertia.post('/blogs', {
            title,
            excerpt,
            key_points: keyPoints.filter(kp => kp.trim() !== '')
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    rows="3"
                    placeholder="Write a brief excerpt..."
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Points</label>
                {keyPoints.map((kp, index) => (
                    <div key={index} className="flex mb-2">
                        <input
                            type="text"
                            value={kp}
                            onChange={(e) => handleKeyPointChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder={`Key point #${index + 1}`}
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addKeyPoint}
                    className="mt-2 flex items-center text-teal-600 hover:text-teal-800 text-sm font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Key Point
                </button>
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