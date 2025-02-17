<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RedirectBasedOnRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (Gate::allows('access-admin-dashboard')) {
            return Inertia::render('Dashboard/Admin');
        }

        if (Gate::allows('access-editor-dashboard')) {
            return Inertia::render('Dashboard/Editor');
        }

        if (Gate::allows('access-user-dashboard')) {
            return Inertia::render('Dashboard/User');
        }
    }
}
