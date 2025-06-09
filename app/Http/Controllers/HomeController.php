<?php

namespace App\Http\Controllers;

use App\Models\Lomba;
use App\Models\Beasiswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

class HomeController extends Controller
{
    public function index()
    {
        $latestLombas = Lomba::latest()->take(5)->get();
        $latestBeasiswas = Beasiswa::latest()->take(5)->get();

        return Inertia::render('Welcome', [
            'latestLombas' => $latestLombas,
            'latestBeasiswas' => $latestBeasiswas,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function explore(Request $request)
    {
        $searchQuery = $request->input('search');
        $selectedKategori = $request->input('kategori');
        $selectedJenjang = $request->input('jenjang');
        $selectedTipePendanaan = $request->input('tipe_pendanaan');
        $selectedTipeLokasi = $request->input('tipe_lokasi');
        $jenis = $request->input('jenis');

        $kategoriOptions = [
            'Animasi', 'Artikel', 'Bahasa Asing', 'Bisnis', 'Debat', 'Desain', 'E-sport', 'Esai',
            'Fotografi', 'Game Development', 'Hukum', 'Infografis', 'IT', 'Karya Tulis Ilmiah',
            'Kewirausahaan', 'Lingkungan', 'Matematika', 'Musik', 'Mobile App Development',
            'Olimpiade', 'Poster', 'Programmer', 'Puisi', 'Robotik', 'Sastra', 'Seni',
            'Short Movie', 'Storytelling', 'Teknologi', 'UI/UX', 'Videografi', 'Web Development'
        ];
        $jenjangOptions = ["SD", "SMP/MTS", "SMA/MA/SMK", "Mahasiswa"];
        $tipePendanaanOptions = ["Fully Funded", "Partially Funded"];
        $tipeLokasiOptions = ['Online', 'Offline', 'Hybrid'];
        $beasiswaQuery = Beasiswa::latest();

        $beasiswaQuery->when($searchQuery, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', '%' . $search . '%')
                  ->orWhere('deskripsi', 'like', '%' . $search . '%')
                  ->orWhere('pemberi_beasiswa', 'like', '%' . $search . '%')
                  ->orWhere('syarat_penerima', 'like', '%' . $search . '%')
                  ->orWhere('benefit', 'like', '%' . $search . '%');
            });
        });

        $beasiswaQuery->when($selectedJenjang, function ($query, $jenjang) {
            $jenjangArray = explode(',', $jenjang);
            if (!empty($jenjangArray)) {
                $query->where(function ($q) use ($jenjangArray) {
                    foreach ($jenjangArray as $item) {
                        $q->orWhere('jenjang_pendidikan', 'like', '%' . trim($item) . '%');
                    }
                });
            }
        });

        $beasiswaQuery->when($selectedTipePendanaan, function ($query, $tipe) {
            $tipeArray = explode(',', $tipe);
            if (!empty($tipeArray)) {
                $query->where(function ($q) use ($tipeArray) {
                    foreach ($tipeArray as $item) {
                        $q->orWhere('tipe_pendaftaran', 'like', '%' . trim($item) . '%');
                    }
                });
            }
        });

        $allBeasiswa = $beasiswaQuery->get();
        $lombaQuery = Lomba::latest();

        $lombaQuery->when($searchQuery, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', '%' . $search . '%')
                  ->orWhere('deskripsi', 'like', '%' . $search . '%')
                  ->orWhere('penyelenggara', 'like', '%' . $search . '%');
            });
        });

        $lombaQuery->when($selectedKategori, function ($query, $kategori) {
            $kategoriArray = explode(',', $kategori);
            if (!empty($kategoriArray)) {
                $query->where(function ($q) use ($kategoriArray) {
                    foreach ($kategoriArray as $item) {
                        $q->orWhere('kategori', 'like', '%' . trim($item) . '%');
                    }
                });
            }
        });

        $lombaQuery->when($selectedJenjang, function ($query, $jenjang) {
            $jenjangArray = explode(',', $jenjang);
            if (!empty($jenjangArray)) {
                $query->where(function ($q) use ($jenjangArray) {
                    foreach ($jenjangArray as $item) {
                        $q->orWhere('jenjang_pendidikan', 'like', '%' . trim($item) . '%');
                    }
                });
            }
        });

        $lombaQuery->when($selectedTipeLokasi, function ($query, $tipeLokasi) {
            $tipeLokasiArray = explode(',', $tipeLokasi);
            if (!empty($tipeLokasiArray)) {
                $query->where(function ($q) use ($tipeLokasiArray) {
                    foreach ($tipeLokasiArray as $item) {
                        $q->orWhere('tipe_lokasi', 'like', '%' . trim($item) . '%');
                    }
                });
            }
        });

        $allLomba = $lombaQuery->get();

        return Inertia::render('Explore', [
            'allBeasiswas' => $allBeasiswa,
            'allLombas' => $allLomba,
            'filters' => [
                'search' => $searchQuery,
                'kategori' => $selectedKategori,
                'jenjang' => $selectedJenjang,
                'tipe_pendanaan' => $selectedTipePendanaan,
                'tipe_lokasi' => $selectedTipeLokasi,
                'jenis' => $jenis,
            ],
            'filterOptions' => [
                'kategori' => $kategoriOptions,
                'jenjang' => $jenjangOptions,
                'tipe_pendanaan' => $tipePendanaanOptions,
                'tipe_lokasi' => $tipeLokasiOptions,
            ]
        ]);
    }

    public function detailLomba($slug)
    {
        $lomba = Lomba::where('slug', $slug)->firstOrFail();
        return Inertia::render('Detail/LombaDetail', [
            'lomba' => $lomba,
        ]);
    }

    public function detailBeasiswa($slug)
    {
        $beasiswa = Beasiswa::where('slug', $slug)->firstOrFail();
        return Inertia::render('Detail/BeasiswaDetail', [
            'beasiswa' => $beasiswa,
        ]);
    }
}