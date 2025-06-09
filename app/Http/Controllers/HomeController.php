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

        $kategoriOptions = ['Sains', 'Teknologi', 'Seni', 'Desain', 'Bisnis', 'Lingkungan', 'Sosial'];
        $jenjangOptions = ["SD", "SMP/MTS", "SMA/MA/SMK", "Mahasiswa"];
        $tipePendanaanOptions = ["Fully Funded", "Partially Funded"];
        $tipeLokasiOptions = ['Nasional', 'Internasional', 'Provinsi A', 'Kota B'];

        $applyCommonFilters = function ($query, $search, $jenjang, $tipeLokasi, $targetJenjangColumn) {
            $query->when($search, function ($q, $s) {
                $q->where('judul', 'like', '%' . $s . '%')
                  ->orWhere('deskripsi', 'like', '%' . $s . '%'); 
            });

            $query->when($jenjang, function ($q, $j) use ($targetJenjangColumn) {
                $jenjangArray = explode(',', $j);
                if (!empty($jenjangArray)) {
                    $q->where(function ($subQ) use ($jenjangArray, $targetJenjangColumn) {
                        foreach ($jenjangArray as $item) {
                            $subQ->orWhere($targetJenjangColumn, 'like', '%' . trim($item) . '%');
                        }
                    });
                }
            });

            $query->when($tipeLokasi, function ($q, $tl) {
                $tipeLokasiArray = explode(',', $tl);
                if (!empty($tipeLokasiArray)) {
                    $q->where(function ($subQ) use ($tipeLokasiArray) {
                        foreach ($tipeLokasiArray as $item) {
                            $subQ->orWhere('tipe_lokasi', 'like', '%' . trim($item) . '%');
                        }
                    });
                }
            });
        };

        $beasiswaQuery = Beasiswa::latest();
        $applyCommonFilters($beasiswaQuery, $searchQuery, $selectedJenjang, $selectedTipeLokasi, 'jenjang_pendidikan');

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

        $beasiswaQuery->when($searchQuery, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->orWhere('pemberi_beasiswa', 'like', '%' . $search . '%')
                  ->orWhere('syarat_penerima', 'like', '%' . $search . '%')
                  ->orWhere('benefit', 'like', '%' . $search . '%');
            });
        });

        $allBeasiswa = $beasiswaQuery->get();
        $lombaQuery = Lomba::latest();
        $applyCommonFilters($lombaQuery, $searchQuery, $selectedJenjang, $selectedTipeLokasi, 'jenjang_peserta');

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

        $lombaQuery->when($searchQuery, function ($query, $search) {
            $query->where('penyelenggara', 'like', '%' . $search . '%');
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