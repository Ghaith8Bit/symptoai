import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DoctorCard from '@/Components/DoctorCard';

export default function FindDoctor({ auth }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [specializationFilter, setSpecializationFilter] = useState('');

    const doctors = [
        { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist', bio: 'Heart Specialist', experience: 10, email: 'john.doe@example.com' },
        { id: 2, name: 'Dr. Sarah Smith', specialization: 'Neurologist', bio: 'Brain and Nervous System Expert', experience: 8, email: 'sarah.smith@example.com' },
        { id: 3, name: 'Dr. Michael Brown', specialization: 'Dermatologist', bio: 'Skin Care Specialist', experience: 6, email: 'michael.brown@example.com' },
        { id: 4, name: 'Dr. Emily Davis', specialization: 'Pediatrician', bio: 'Child Healthcare Expert', experience: 12, email: 'emily.davis@example.com' },
    ];

    const specializations = [...new Set(doctors.map(doctor => doctor.specialization))];

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialization = !specializationFilter || doctor.specialization === specializationFilter;
        return matchesSearch && matchesSpecialization;
    });

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
                        placeholder="Search by name"
                        className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="w-full md:w-1/4 px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={specializationFilter}
                        onChange={e => setSpecializationFilter(e.target.value)}
                    >
                        <option value="">All Specializations</option>
                        {specializations.map(spec => (
                            <option key={spec} value={spec}>
                                {spec}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Doctor Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    {filteredDoctors.map(doctor => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
