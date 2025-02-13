import { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import NavigationTabs from '@/Components/Welcome/NavigationTab';
import AboutSection from '@/Components/Welcome/About';
import ContactSection from '@/Components/Welcome/Contact';
import NewsSection from '@/Components/Welcome/News';
import BlogSection from '@/Components/Welcome/Blog';
import { HeartIcon } from '@heroicons/react/24/outline';

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
                        <NavigationTabs activeTab={activeTab} handleTabChange={handleTabChange} />

                        <div className="relative min-h-[400px]">
                            <div className="transition-all duration-500 ease-in-out">
                                {activeTab === 'about' && <AboutSection />}
                                {activeTab === 'contact' && <ContactSection />}
                                {activeTab === 'newspaper' && <NewsSection />}
                                {activeTab === 'blog' && <BlogSection />}
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