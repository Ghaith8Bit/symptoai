export default function DoctorCard({ doctor }) {
    return (
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
            <div className="flex items-center space-x-4">
                {/* Doctor Avatar */}
                <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random`}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full border-2 border-blue-600"
                />
                <div>
                    {/* Name & Specialization */}
                    <h3 className="text-lg font-semibold text-blue-900">{doctor.name}</h3>
                    <p className="text-sm text-blue-500">{doctor.specialization}</p>
                </div>
            </div>
            {/* Bio and Experience */}
            <div className="mt-4">
                <p className="text-sm text-gray-600">{doctor.bio}</p>
                <p className="mt-2 text-sm text-gray-500">
                    Experience: <span className="font-semibold">{doctor.experience} years</span>
                </p>
                <p className="mt-2 text-sm text-blue-700">
                    Email: <a href={`mailto:${doctor.email}`} className="underline">{doctor.email}</a>
                </p>
            </div>
        </div>
    );
}
