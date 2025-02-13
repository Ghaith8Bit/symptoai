import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { PhoneIcon } from "@heroicons/react/24/solid";

export default function ContactSection() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        post(route('contact.send'), {
            preserveScroll: true,
            onSuccess: () => {
                setSuccessMessage('Your message has been sent successfully!');
                setData({ name: '', email: '' });
            }
        });
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 shadow-xl dark:bg-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    Contact Our Medical Team
                </h2>
                {successMessage && (
                    <div className="mb-4 p-4 text-green-700 bg-green-100 rounded-lg">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full text-gray-300 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full text-gray-300 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-all duration-300 disabled:opacity-50"
                    >
                        {processing ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-3xl p-8 shadow-xl flex items-center justify-center">
                <div className="text-center text-white">
                    <PhoneIcon className="h-16 w-16 mx-auto mb-6 animate-bounce" />
                    <h3 className="text-2xl font-bold mb-2">24/7 Emergency Support</h3>
                    <p className="text-lg">+1 (234) 567-8900</p>
                    <p className="mt-4">contact@diacare.com</p>
                </div>
            </div>
        </div>
    );
}
