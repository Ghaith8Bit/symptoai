import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MedicalPassionStats from '@/Components/MedicalPassionStats';
import LoginLogsStats from '@/Components/LoginLogsStats';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-gray-900 text-lg">Welcome, {auth.user.name}!</h1>
                        <p className="mt-4 text-gray-600">Here are your stats:</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MedicalPassionStats />
                        <LoginLogsStats />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
