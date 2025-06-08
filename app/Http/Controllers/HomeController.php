<?php

namespace App\Http\Controllers;

use App\Models\Lomba;
use App\Models\Beasiswa;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function detailLomba($slug)
    {
        $lomba = Lomba::where('slug', $slug)->firstOrFail();
        return view('detail.lomba', compact('lomba'));
    }

    public function detailBeasiswa($slug)
    {
        $beasiswa = Beasiswa::where('slug', $slug)->firstOrFail();
        return view('detail.beasiswa', compact('beasiswa'));
    }
}