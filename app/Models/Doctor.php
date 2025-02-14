<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'name',
        'account_type_id',
        'country',
        'region',
        'address',
        'address_details',
        'latitude',
        'longitude',
        'views',
    ];

    protected $casts = [
        'numbers' => 'array',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public function specialities()
    {
        return $this->belongsToMany(Speciality::class, 'doctor_speciality');
    }

    public function accountType()
    {
        return $this->belongsTo(AccountType::class);
    }

    public function clicked()
    {
        $this->views += 1;
        $this->save();
    }
}
