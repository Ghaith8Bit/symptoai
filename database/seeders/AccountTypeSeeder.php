<?php

namespace Database\Seeders;

use App\Models\AccountType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AccountTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accountTypesPath = 'account_types.json';

        if (!Storage::exists($accountTypesPath)) {
            $this->command->error("❌ account_types.json file not found in storage.");
            return;
        }

        $content = Storage::get($accountTypesPath);
        $accountTypes = json_decode($content, true);

        if (empty($accountTypes)) {
            $this->command->error("❌ account_types.json is empty or invalid.");
            return;
        }

        foreach ($accountTypes as $type) {
            AccountType::updateOrCreate(['name' => $type]);
        }
    }
}
