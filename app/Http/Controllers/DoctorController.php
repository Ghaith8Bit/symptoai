<?php

namespace App\Http\Controllers;

use App\Http\Requests\DoctorPhoneRequest;
use App\Models\Doctor;
use App\Models\Speciality;
use App\Services\InvertedIndexService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function __construct(public InvertedIndexService $service) {}

    /**
     * Render the FindDoctor page.
     */
    public function index(Request $request)
    {
        $doctors = $this->getDoctors($request);

        return Inertia::render('Doctors/FindDoctor', [
            'doctors' => $doctors,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Fetch doctors based on filters (speciality or search).
     */
    protected function getDoctors(Request $request)
    {
        if ($request->search) {
            $doctorsIds = $this->service->search($request->search);
            return Doctor::whereIn('id', array_keys($doctorsIds))
                ->with(['accountType', 'specialities'])
                ->orderBy('views', 'desc')
                ->limit(20)
                ->get();
        }

        return Doctor::with(['accountType', 'specialities'])
            ->orderBy('views', 'desc')
            ->limit(20)
            ->get();
    }

    /**
     * Handle phone number updates.
     */
    public function phone(Doctor $doctor, DoctorPhoneRequest $request)
    {
        $doctor->update(['numbers' => $request->validated()]);
        return response()->json(['message' => 'Phone numbers updated']);
    }
}
