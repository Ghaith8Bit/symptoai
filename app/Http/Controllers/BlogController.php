<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::last(10)->get();

        return Inertia::render('Welcome', [
            'blogs' => $blogs,
        ]);
    }
}
