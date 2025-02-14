<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Enums\UserType;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('access-admin-dashboard', fn(User $user) => $user->user_type === UserType::ADMIN);
        Gate::define('access-editor-dashboard', fn(User $user) => $user->user_type === UserType::EDITOR);
        Gate::define('access-user-dashboard', fn(User $user) => $user->user_type === UserType::USER);
    }
}
