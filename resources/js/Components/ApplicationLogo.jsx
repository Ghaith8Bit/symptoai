import { HeartIcon } from '@heroicons/react/24/outline';


export default function ApplicationLogo(props) {
    return (

        <div {...props} href="/" className="flex items-center space-x-2">
            <HeartIcon className="h-8 w-8 text-red-500 animate-pulse" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
                Sympto<span className="text-red-500">Ai</span>
            </span>
        </div>
    );
}

