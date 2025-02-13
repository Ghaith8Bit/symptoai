<?php

namespace Database\Seeders;

use App\Models\Speciality;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SpecialitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = storage_path('app/specialities.json');

        if (!file_exists($path)) {
            $this->command->error("❌ specialities.json file not found.");
            return;
        }

        $specialities = json_decode(file_get_contents($path), true);

        if (empty($specialities)) {
            $this->command->error("❌ specialities.json is empty or invalid.");
            return;
        }

        foreach ($specialities as $name) {
            Speciality::firstOrCreate(['name' => $name]);
        }
    }
}
