<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogStoreRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::orderBy('published_at', 'desc')->take(3)->get();

        return Inertia::render('Blogs/Blogs', [
            'blogs' => $blogs
        ]);
    }

    public function store(BlogStoreRequest $request)
    {
        Blog::create([
            'title' => $request->get('title'),
            'body' => $request->get('body'),
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Blog created successfully!');
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();

        return redirect()->back()->with('success', 'Blog deleted successfully!');
    }
}
