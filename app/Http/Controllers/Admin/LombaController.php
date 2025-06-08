<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lomba;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LombaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lombas = Lomba::latest()->get();

        return Inertia::render('Admin/Lomba/Index', [
            'lombas' => $lombas,
            'flash' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.lomba.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required',
            'kategori' => 'required',
            'jenjang_pendidikan' => 'required',
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date',
            'lokasi' => 'required',
            'tipe_lokasi' => 'required|in:Offline,Online,Hybrid',
            'penyelenggara' => 'required',
            'link_pendaftaran' => 'required|url',
            'poster_lomba' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $posterPath = null;
        if ($request->hasFile('poster_lomba')) {
            $posterPath = $request->file('poster_lomba')->store('posters/lomba', 'public');
        }

        Lomba::create([
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul) . '-' . uniqid(),
            'kategori' => $request->kategori,
            'jenjang_pendidikan' => $request->jenjang_pendidikan,
            'deskripsi' => $request->deskripsi,
            'lokasi' => $request->lokasi,
            'tipe_lokasi' => $request->tipe_lokasi,
            'poster_lomba' => $posterPath,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_akhir' => $request->tanggal_akhir,
            'penyelenggara' => $request->penyelenggara,
            'link_pendaftaran' => $request->link_pendaftaran,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('admin.lomba.index')->with('success', 'Lomba berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $lomba = Lomba::findOrFail($id);
        return view('admin.lomba.show', compact('lomba'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $lomba = Lomba::findOrFail($id);
        return view('admin.lomba.edit', compact('lomba'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $lomba = Lomba::findOrFail($id);

        $request->validate([
            'judul' => 'required',
            'kategori' => 'required',
            'jenjang_pendidikan' => 'required',
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date',
            'lokasi' => 'required',
            'tipe_lokasi' => 'required|in:Offline,Online,Hybrid',
            'penyelenggara' => 'required',
            'link_pendaftaran' => 'required|url',
            'poster_lomba' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $slug = $request->judul !== $lomba->judul
            ? Str::slug($request->judul) . '-' . uniqid()
            : $lomba->slug;

        $posterPath = $lomba->poster_lomba;
        if ($request->hasFile('poster_lomba')) {
            if ($lomba->poster_lomba) {
                Storage::disk('public')->delete($lomba->poster_lomba);
            }
            $posterPath = $request->file('poster_lomba')->store('posters/lomba', 'public');
        }

        $lomba->update([
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul) . '-' . uniqid(),
            'kategori' => $request->kategori,
            'jenjang_pendidikan' => $request->jenjang_pendidikan,
            'deskripsi' => $request->deskripsi,
            'lokasi' => $request->lokasi,
            'tipe_lokasi' => $request->tipe_lokasi,
            'poster_lomba' => $posterPath,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_akhir' => $request->tanggal_akhir,
            'penyelenggara' => $request->penyelenggara,
            'link_pendaftaran' => $request->link_pendaftaran,
        ]);

        return redirect()->route('admin.lomba.index')->with('success', 'Lomba berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lomba = Lomba::findOrFail($id);

        if ($lomba->poster_lomba) {
            Storage::disk('public')->delete($lomba->poster_lomba);
        }

        $lomba->delete();

        return redirect()->route('admin.lomba.index')->with('success', 'lomba berhasil dihapus');
    }
}