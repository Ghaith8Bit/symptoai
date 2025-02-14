<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Services\InvertedIndexService;
use App\Http\Requests\DoctorPhoneRequest;
use Illuminate\Http\Client\RequestException;

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
    public function phone(Doctor $doctor)
    {
        try {
            if (is_null($doctor->numbers)) {
                $response = Http::withOptions([
                    'verify' => false,
                ])
                    ->timeout(10)
                    ->get(config('services.doctors_api.url') . "{$doctor->uuid}/phone/", [
                        'format' => 'json'
                    ]);

                if (!$response->successful()) {
                    throw new \Exception("API request failed: " . $response->status());
                }

                $data = $response->json();

                if (empty($data['phone_numbers'])) {
                    throw new \Exception("No phone numbers found in API response");
                }

                $doctor->update(['numbers' => $data['phone_numbers']]);
            }

            return redirect()->back()->with('success', [
                'message' => 'Phone numbers retrieved successfully',
                'numbers' => $doctor->numbers
            ]);
        } catch (RequestException $e) {
            return redirect()->back()->with('error', "API connection failed: " . $e->getMessage());
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
