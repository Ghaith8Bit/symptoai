import { PhoneIcon } from "@heroicons/react/24/solid";


export default function ContactSection() {
    return (
        <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 shadow-xl dark:bg-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    Contact Our Medical Team
                </h2>
                <form className="space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-all duration-300"
                    >
                        Send Message
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