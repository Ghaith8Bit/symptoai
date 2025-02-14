<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();

        return Inertia::render('Contact/ContactUs', [
            'contacts' => $contacts
        ]);
    }
    public function send(ContactRequest $request)
    {
        Contact::create($request->validated());

        return redirect()->back()->with('success', 'Thank you for contacting us!');
    }
}
