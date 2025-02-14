import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import DoctorCard from '@/Components/DoctorCard';

export default function FindDoctor({ auth, doctors, filters = {} }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    // Handle search input enter key
    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            router.get(route('doctors.index'), { search: searchTerm }, {
                preserveState: true,
                replace: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Find Doctors</h2>}
        >
            <Head title="Find Doctors" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Filter Section */}
                <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 space-y-4 md:space-y-0">
                    <input
                        type="text"
                        placeholder="IRS waiting for your query"
                        className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleSearchKeyPress}
                    />
                </div>

                {/* Doctor Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    {doctors.map(doctor => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}