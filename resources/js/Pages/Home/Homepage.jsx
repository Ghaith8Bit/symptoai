import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CommonDiseasesCard from '@/Components/CommonDiseasesCard';
import HealthTipCard from '@/Components/HealthTipCard';

export default function Homepage({ auth }) {
    const commonDiseases = [
        { name: 'Diabetes', description: 'A chronic condition that affects blood sugar levels.' },
        { name: 'Hypertension', description: 'High blood pressure that can lead to severe complications.' },
        { name: 'Asthma', description: 'A respiratory condition marked by difficulty in breathing.' },
        { name: 'Allergies', description: 'An overreaction of the immune system to certain substances.' },
        { name: 'Flu', description: 'A viral infection that causes fever, fatigue, and cough.' },
    ];

    const healthTips = [
        { title: 'Stay Hydrated', description: 'Drink at least 8 glasses of water daily to maintain hydration.' },
        { title: 'Exercise Regularly', description: 'Engage in at least 30 minutes of physical activity daily.' },
        { title: 'Eat Balanced Meals', description: 'Include fruits, vegetables, and proteins in your diet.' },
        { title: 'Get Enough Sleep', description: 'Aim for 7-8 hours of sleep each night for optimal health.' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Home" />
            <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-900">Welcome to Our Medical Hub</h1>
                    <p className="text-gray-700 mt-2 text-lg">Empowering you with knowledge for a healthier life.</p>
                </header>

                <section className="max-w-7xl mx-auto px-6">
                    {/* Common Diseases */}
                    <h2 className="text-2xl font-semibold text-blue-800 mb-6">Common Diseases</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {commonDiseases.map((disease, index) => (
                            <CommonDiseasesCard key={index} disease={disease} />
                        ))}
                    </div>

                    {/* Health Tips */}
                    <section className="mt-12">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Health Tips</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {healthTips.map((tip, index) => (
                                <HealthTipCard key={index} tip={tip} />
                            ))}
                        </div>
                    </section>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
