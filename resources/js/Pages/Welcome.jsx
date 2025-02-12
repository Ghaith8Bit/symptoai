import { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { HeartIcon, NewspaperIcon, UserGroupIcon, PhoneIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [activeTab, setActiveTab] = useState('about');
    const [prevTab, setPrevTab] = useState(null);

    const handleTabChange = (tab) => {
        setPrevTab(activeTab);
        setActiveTab(tab);
    };

    return (
        <>
            <Head title="Diabetes Diagnostic Hub" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
                <header className="fixed w-full top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center space-x-2">
                                <HeartIcon className="h-8 w-8 text-red-500 animate-pulse" />
                                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                                    Sympto<span className="text-red-500">Ai</span>
                                </span>
                            </Link>

                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-300"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {[
                                { id: 'about', icon: UserGroupIcon, label: 'About Us' },
                                { id: 'contact', icon: PhoneIcon, label: 'Contact' },
                                { id: 'newspaper', icon: NewspaperIcon, label: 'Research' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-teal-500 text-white shadow-lg'
                                        : 'bg-white text-gray-600 hover:bg-teal-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    <tab.icon className="h-5 w-5 mr-2" />
                                    {tab.label}
                                </button>
                            ))}
                            <Link
                                href={route('blogs')}
                                className="flex items-center px-6 py-3 rounded-full bg-white text-gray-600 hover:bg-teal-50 transition-all duration-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
                            >
                                <BookOpenIcon className="h-5 w-5 mr-2" />
                                Medical Blog
                            </Link>
                        </div>

                        <div className="relative min-h-[400px]">
                            <div className="transition-all duration-500 ease-in-out">
                                {activeTab === 'about' && (
                                    <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
                                        <div className="bg-white rounded-3xl p-8 shadow-xl dark:bg-gray-800">
                                            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                                                About Our Diabetes Initiative
                                            </h2>
                                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                                We're pioneering advanced diabetes diagnostics using AI-powered analysis
                                                and continuous glucose monitoring. Our team of endocrinologists and
                                                data scientists work together to deliver personalized care plans.
                                            </p>
                                            <div className="mt-8 grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-blue-50 rounded-xl dark:bg-gray-700">
                                                    <h3 className="font-bold text-blue-600 dark:text-blue-400">15K+</h3>
                                                    <p className="text-sm">Patients Helped</p>
                                                </div>
                                                <div className="p-4 bg-teal-50 rounded-xl dark:bg-gray-700">
                                                    <h3 className="font-bold text-teal-600 dark:text-teal-400">98%</h3>
                                                    <p className="text-sm">Accuracy Rate</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative rounded-3xl overflow-hidden shadow-xl">
                                            <img
                                                src="/images/doctor-consultation.jpg"
                                                alt="Medical Team"
                                                className="w-full h-full object-cover animate-scaleIn"
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'contact' && (
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
                                )}

                                {activeTab === 'newspaper' && (
                                    <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
                                        <div className="bg-white rounded-3xl p-8 shadow-xl dark:bg-gray-800">
                                            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                                                Latest Diabetes Research
                                            </h2>
                                            <div className="space-y-6">
                                                <div className="p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 dark:hover:bg-gray-700">
                                                    <h3 className="font-bold text-lg mb-2 dark:text-white">
                                                        New Glucose Monitoring Technology
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        Breakthrough in non-invasive glucose monitoring using...
                                                    </p>
                                                </div>
                                                <div className="p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 dark:hover:bg-gray-700">
                                                    <h3 className="font-bold text-lg mb-2 dark:text-white">
                                                        AI in Diabetes Prediction
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        Machine learning models now achieve 95% accuracy in...
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative rounded-3xl overflow-hidden shadow-xl">
                                            <img
                                                src="/images/medical-research.jpg"
                                                alt="Research"
                                                className="w-full h-full object-cover animate-scaleIn"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.8s ease-out;
                }

                .dark .gradient-text {
                    background: linear-gradient(45deg, #38b2ac, #4299e1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </>
    );
}