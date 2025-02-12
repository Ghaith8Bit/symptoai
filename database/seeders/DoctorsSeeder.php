<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Speciality;
use App\Models\AccountType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DoctorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $doctorsSqlPath = 'sql/doctors.sql';
        $doctorsSpecialitySqlPath = 'sql/doctor_speciality.sql';

        // Check if SQL files exist
        if (Storage::exists($doctorsSqlPath) && Storage::exists($doctorsSpecialitySqlPath)) {

            // Import doctors.sql
            $doctorsSql = Storage::get($doctorsSqlPath);
            DB::unprepared($doctorsSql);

            // Import doctors_speciality.sql
            $doctorsSpecialitySql = Storage::get($doctorsSpecialitySqlPath);
            DB::unprepared($doctorsSpecialitySql);

            return;
        }

        $filePath = 'processed_doctors.json';

        if (!Storage::exists($filePath)) {
            $this->command->error("❌ File {$filePath} not found.");
            return;
        }

        // Read the doctors from the JSON file
        $content = Storage::get($filePath);
        $doctors = collect(json_decode($content, true));

        foreach ($doctors as $doctorData) {
            $accountType = AccountType::where('name', $doctorData['account_type'])->first();

            $doctor = Doctor::create(
                [
                    'uuid' => $doctorData['uuid'],
                    'name' => $doctorData['name_en'],
                    'account_type_id' => $accountType->id,
                    'country' => $doctorData['country'],
                    'region' => $doctorData['region'],
                    'address' => $doctorData['address_en'],
                    'address_details' => $doctorData['address_details_en'],
                    'latitude' => $doctorData['latitude'],
                    'longitude' => $doctorData['longitude'],
                ]
            );

            $specialities = collect($doctorData['specialities'] ?? [])
                ->map(function ($specialityName) {
                    return Speciality::where('name', 'Urology')->first()->id;
                })
                ->toArray();

            $doctor->specialities()->sync($specialities);
        }
    }
}
