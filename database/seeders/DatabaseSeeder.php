<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\UserType;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@sympto-ai.com',
            'user_type' => UserType::ADMIN
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Editor',
            'email' => 'editor@sympto-ai.com',
            'user_type' => UserType::EDITOR
        ]);

        \App\Models\User::factory()->create([
            'name' => 'User',
            'email' => 'user@sympto-ai.com',
            'user_type' => UserType::USER
        ]);
    }
}
