<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Beasiswa;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BeasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchQuery = $request->input('search');
        $beasiswas = Beasiswa::latest();

        if ($searchQuery) {
            $beasiswas->where('judul', 'like', '%' . $searchQuery . '%')
                    ->orWhere('pemberi_beasiswa', 'like', '%' . $searchQuery . '%')
                    ->orWhere('tipe_pendaftaran', 'like', '%' . $searchQuery . '%')
                    ->orWhere('jenjang_pendidikan', 'like', '%' . $searchQuery . '%');
        }

        $beasiswas = $beasiswas->get();

        return Inertia::render('Admin/Beasiswa/Index', [
            'beasiswas' => $beasiswas,
            'flash' => session('success'),
            'filters' => ['search' => $searchQuery], 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.beasiswa.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required',
            'jenjang_pendidikan' => 'required',
            'tipe_pendaftaran' => 'required',
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date',
            'pemberi_beasiswa' => 'required',
            'link_pendaftaran' => 'required|url',
            'poster_beasiswa' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $posterPath = $request->file('poster_beasiswa')->store('posters/beasiswa', 'public');

        Beasiswa::create([
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul) . '-' . uniqid(),
            'jenjang_pendidikan' => implode(',', $request->jenjang_pendidikan),
            'tipe_pendaftaran' => implode(',', $request->tipe_pendaftaran),
            'syarat_penerima' => $request->syarat_penerima,
            'benefit' => $request->benefit,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_akhir' => $request->tanggal_akhir,
            'poster_beasiswa' => $posterPath,
            'pemberi_beasiswa' => $request->pemberi_beasiswa,
            'link_pendaftaran' => $request->link_pendaftaran,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('admin.beasiswa.index')->with('success', 'Beasiswa berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $beasiswa = Beasiswa::findOrFail($id);
        return Inertia::render('Admin/Beasiswa/Show', compact('beasiswa'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $beasiswa = Beasiswa::findOrFail($id);
        return view('admin.beasiswa.edit', compact('beasiswa'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $beasiswa = Beasiswa::findOrFail($id);

        $request->validate([
            'judul' => 'required',
            'jenjang_pendidikan' => 'required',
            'tipe_pendaftaran' => 'required',
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date',
            'pemberi_beasiswa' => 'required',
            'link_pendaftaran' => 'required|url',
            'poster_beasiswa' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('poster_beasiswa')) {
            if ($beasiswa->poster_beasiswa && Storage::disk('public')->exists($beasiswa->poster_beasiswa)) {
                Storage::disk('public')->delete($beasiswa->poster_beasiswa);
            }
            $posterPath = $request->file('poster_beasiswa')->store('posters/beasiswa', 'public');
        } else {
            $posterPath = $beasiswa->poster_beasiswa;
        }

        $beasiswa->update([
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul) . '-' . uniqid(),
            'jenjang_pendidikan' => implode(',', $request->jenjang_pendidikan),
            'tipe_pendaftaran' => implode(',', $request->tipe_pendaftaran),
            'syarat_penerima' => $request->syarat_penerima,
            'benefit' => $request->benefit,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_akhir' => $request->tanggal_akhir,
            'poster_beasiswa' => $posterPath,
            'pemberi_beasiswa' => $request->pemberi_beasiswa,
            'link_pendaftaran' => $request->link_pendaftaran,
        ]);

        return redirect()->route('admin.beasiswa.index')->with('success', 'Beasiswa berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $beasiswa = Beasiswa::findOrFail($id);

        if ($beasiswa->poster_beasiswa) {
            Storage::disk('public')->delete($beasiswa->poster_beasiswa);
        }

        $beasiswa->delete();

        return redirect()->route('admin.beasiswa.index')->with('success', 'Beasiswa berhasil dihapus');
    }
}