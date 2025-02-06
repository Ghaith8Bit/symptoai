import React, { useState } from 'react';

export default function CommonDiseasesCard({ disease }) {
    const [showMore, setShowMore] = useState(false);
    const maxDescriptionLength = 100;

    const handleToggle = () => setShowMore(!showMore);

    return (
        <div
            className="relative bg-gradient-to-tr from-blue-50 to-white rounded-lg shadow-md p-6 hover:shadow-xl transition-transform transform hover:scale-105 group"
            style={{
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Decorative Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-green-500 opacity-10 rounded-lg pointer-events-none"></div>

            <h3 className="text-lg font-bold text-blue-800">{disease.name}</h3>
            <p className="text-sm text-gray-600 mt-2">
                {showMore || disease.description.length <= maxDescriptionLength
                    ? disease.description
                    : `${disease.description.substring(0, maxDescriptionLength)}...`}
            </p>
            {disease.description.length > maxDescriptionLength && (
                <button
                    onClick={handleToggle}
                    className="mt-2 text-blue-700 text-sm font-semibold underline focus:outline-none hover:text-blue-500"
                >
                    {showMore ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
}
