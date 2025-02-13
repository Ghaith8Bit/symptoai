<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Blog;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke()
    {
        $blogs = Blog::orderBy('published_at', 'desc')->take(10)->get();

        return Inertia::render('Welcome', [
            'blogs' => $blogs
        ]);
    }
}
