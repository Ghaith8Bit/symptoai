<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function __invoke(ContactRequest $request)
    {
        Contact::create($request->validated());

        return redirect()->back()->with('success', 'Thank you for contacting us!');
    }
}
