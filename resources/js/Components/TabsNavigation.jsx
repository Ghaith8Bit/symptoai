const TabsNavigation = () => {
    return (
        <nav className="flex space-x-4 mb-8">
            <Link
                href={route('about')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
            >
                About Us
            </Link>
            <Link
                href={route('contact')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
            >
                Contact Us
            </Link>
            <Link
                href={route('news')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
            >
                News
            </Link>
            <Link
                href={route('blogs')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
            >
                Blogs
            </Link>
        </nav>
    );
};
