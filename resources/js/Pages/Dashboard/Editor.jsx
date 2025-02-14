import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MedicalPassionStats from '@/Components/MedicalPassionStats';
import LoginLogsStats from '@/Components/LoginLogsStats';
import CreateMedicalBlog from '@/Components/Blogs/CreateMedicalBlog';
import StatisticsTable from '@/Components/StatisticsTable';
import MedicalBlogList from '@/Components/Blogs/MedicalBlogList';

export default function Dashboard({ auth }) {
    // Dummy blog data
    const dummyBlogs = [
        {
            title: "Living with Diabetes: Daily Management Tips",
            body: "Discover effective strategies for managing your diabetes through proper monitoring and lifestyle adjustments.",
            keyPoints: [
                "Monitor blood sugar levels regularly",
                "Stay active with moderate exercise",
                "Follow a balanced, diabetes-friendly diet",
            ],
        },
        {
            title: "Heart Health: Essential Tips for a Stronger Cardiovascular System",
            body: "Learn how to maintain a healthy heart through lifestyle changes and regular check-ups.",
            keyPoints: [
                "Reduce sodium intake to lower blood pressure",
                "Engage in regular aerobic exercises",
                "Monitor cholesterol and triglyceride levels",
            ],
        },
        {
            title: "The Importance of Mental Health in Chronic Illness",
            body: "Understanding the link between mental well-being and physical health for those with chronic conditions.",
            keyPoints: [
                "Practice mindfulness and stress management",
                "Seek professional mental health support",
                "Stay connected with a support system",
            ],
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Medical Dashboard</h2>}
        >
            <Head title="Medical Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Create New Blog Section */}


                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <MedicalPassionStats />
                        <LoginLogsStats />
                        <StatisticsTable />
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg p-6 mb-8 border border-teal-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create New Medical Blog
                        </h2>
                        <CreateMedicalBlog />
                    </div>

                    {/* Medical Blogs List */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-6 border border-blue-50">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            Latest Medical Blogs
                        </h2>
                        <MedicalBlogList blogs={dummyBlogs} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
