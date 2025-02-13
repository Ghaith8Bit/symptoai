

import { HeartIcon, NewspaperIcon, UserGroupIcon, PhoneIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function NavigationTabs({ activeTab, handleTabChange }) {
    const tabs = [
        { id: 'about', icon: UserGroupIcon, label: 'About Us' },
        { id: 'contact', icon: PhoneIcon, label: 'Contact' },
        { id: 'newspaper', icon: NewspaperIcon, label: 'Research' },
        { id: 'blog', icon: BookOpenIcon, label: 'Medical Blog' },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
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
        </div>
    );
}