import { useState } from 'react';
import axios from 'axios';

export default function DoctorCard({ doctor }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [phoneNumbers, setPhoneNumbers] = useState(doctor.numbers || null);

    // Get the first speciality or fallback to account type
    const speciality = doctor.specialities?.[0]?.name
        || doctor.account_type?.name
        || 'General Practitioner';

    return (
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
            <div className="flex items-center space-x-4">
                <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random`}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full border-2 border-blue-600"
                />
                <div>
                    <h3 className="text-lg font-semibold text-blue-900">{doctor.name}</h3>
                    <p className="text-sm text-blue-500">
                        {doctor.account_type?.name}
                    </p>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                    {doctor.country}, {doctor.region}
                </p>
                <p className="text-sm text-gray-600">{doctor.address_details}</p>

                {phoneNumbers ? (
                    <div className="mt-2">
                        <p className="text-sm font-semibold">Phone Numbers:</p>
                        {phoneNumbers.map((num, index) => (
                            <p key={index} className="text-sm text-blue-700">
                                {num.type}: {num.number}
                            </p>
                        ))}
                    </div>
                ) : (
                    <div className="mt-2">
                        <p className="text-sm font-semibold">Speciality:</p>
                        <p className="text-sm text-green-600">
                            {speciality}
                        </p>
                    </div>
                )}

                {error && (
                    <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
            </div>
        </div>
    );
}