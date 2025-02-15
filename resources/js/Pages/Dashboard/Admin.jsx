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


                </div>
            </div>
        </AuthenticatedLayout>
    );
}
