<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Console\Helper\ProgressBar;

class ProcessDoctorsJson extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'doctors:process';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process Doctors.json and extract relevant data into separate JSON files';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $inputPath = 'Doctors.json';
        $doctorsOutputPath = 'processed_doctors.json';
        $specialitiesOutputPath = 'specialities.json';
        $accountTypesOutputPath = 'account_types.json';

        // Check if the input file exists
        if (!Storage::exists($inputPath)) {
            $this->error("❌ Doctors.json file not found in storage.");
            return;
        }

        // Read and decode the JSON file
        $content = Storage::get($inputPath);
        $decodedJson = json_decode($content, true);

        // Validate JSON structure
        if (!isset($decodedJson["results"]) || !is_array($decodedJson["results"])) {
            $this->error("❌ JSON format is incorrect or 'results' key is missing.");
            return;
        }

        $doctors = collect($decodedJson["results"]);

        if ($doctors->isEmpty()) {
            $this->error("❌ No doctors found in the JSON file.");
            return;
        }

        // Initialize progress bars
        $this->info("Processing doctors...");
        $doctorProgressBar = $this->output->createProgressBar($doctors->count());
        $doctorProgressBar->setFormat('verbose');

        // Process doctors data
        $filteredDoctors = $doctors->map(function ($doctor) use ($doctorProgressBar) {
            $processedDoctor = [
                'uuid' => $doctor['uuid'] ?? null,
                'name_en' => $doctor['name_en'] ?? null,
                'specialities' => collect($doctor['specialities'] ?? [])->pluck('name')->toArray(),
                'account_type' => $doctor['account_type'] ?? null,
                'country' => $doctor['country'] ?? null,
                'region' => $doctor['region'] ?? null,
                'address_en' => $doctor['address_en'] ?? null,
                'address_details_en' => $doctor['address_details_en'] ?? null,
                'latitude' => $doctor['latitude'] ?? null,
                'longitude' => $doctor['longitude'] ?? null,
            ];

            // Update progress bar
            $doctorProgressBar->advance();

            return $processedDoctor;
        });

        $doctorProgressBar->finish();
        $this->newLine();

        // Extract unique specialities
        $this->info("Extracting unique specialities...");
        $specialities = $doctors->pluck('specialities')
            ->flatten(1)
            ->pluck('name')
            ->unique()
            ->values()
            ->toArray();

        // Extract unique account types
        $this->info("Extracting unique account types...");
        $accountTypes = $doctors->pluck('account_type')
            ->filter()
            ->unique()
            ->values()
            ->toArray();

        // Save processed data to files
        $this->info("Saving processed data...");
        Storage::put($doctorsOutputPath, json_encode($filteredDoctors, JSON_PRETTY_PRINT));
        Storage::put($specialitiesOutputPath, json_encode($specialities, JSON_PRETTY_PRINT));
        Storage::put($accountTypesOutputPath, json_encode($accountTypes, JSON_PRETTY_PRINT));

        // Output success messages
        $this->newLine();
        $this->info("✅ Doctors data processed! Saved as: storage/app/{$doctorsOutputPath}");
        $this->info("✅ Unique specialities extracted! Saved as: storage/app/{$specialitiesOutputPath}");
        $this->info("✅ Unique account types extracted! Saved as: storage/app/{$accountTypesOutputPath}");
    }
}
