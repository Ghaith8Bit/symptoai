import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateMedicalBlog() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        body: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const submitBlog = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        post(route('blogs.store'), {
            onSuccess: (response) => {
                setSuccessMessage(response.props.success || 'Blog created successfully!');
            }
        });
    };

    return (
        <div>
            {successMessage && <p className="text-green-500 text-lg mb-4">{successMessage}</p>}
            {console.log(successMessage)}
            <form onSubmit={submitBlog} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter blog title"
                        required
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
                    <textarea
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        rows="3"
                        placeholder="Write a brief Body..."
                        required
                    />
                    {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    disabled={processing}
                >
                    {processing ? 'Publishing...' : 'Publish Medical Blog'}
                </button>
            </form>
        </div>
    );
}
