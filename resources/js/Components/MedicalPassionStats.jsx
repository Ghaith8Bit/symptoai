export default function MedicalPassionStats() {
    const stats = {
        totalDoctors: 120,
        totalNurses: 85,
        activeProjects: 15,
        patientCareHours: 5600,
    };

    return (
        <div className="bg-blue-50 p-6 shadow-sm sm:rounded-lg">
            <h3 className="font-semibold text-lg text-blue-700">Medical Passion Stats</h3>
            <ul className="mt-4 space-y-2 text-gray-800">
                <li>Total Doctors: {stats.totalDoctors}</li>
                <li>Total Nurses: {stats.totalNurses}</li>
                <li>Active Projects: {stats.activeProjects}</li>
                <li>Patient Care Hours: {stats.patientCareHours}</li>
            </ul>
        </div>
    );
}
