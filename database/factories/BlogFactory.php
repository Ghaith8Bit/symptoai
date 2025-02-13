<?php

namespace Database\Factories;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence;
        return [
            'title'        => $title,
            'slug'         => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(1, 10000),
            'body'         => $this->faker->paragraphs(3, true),
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'user_id'      => User::where('user_type', UserType::EDITOR)->inRandomOrder()->first()->id ?? 1,
        ];
    }
}
