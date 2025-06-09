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
    public function index(Request $request)
    {
        $searchQuery = $request->input('search');
        $lombas = Lomba::latest();

        if ($searchQuery) {
            $lombas->where('judul', 'like', '%' . $searchQuery . '%')
                    ->orWhere('penyelenggara', 'like', '%' . $searchQuery . '%')
                    ->orWhere('kategori', 'like', '%' . $searchQuery . '%')
                    ->orWhere('jenjang_pendidikan', 'like', '%' . $searchQuery . '%');
        }

        $lombas = $lombas->get();

        return Inertia::render('Admin/Lomba/Index', [
            'lombas' => $lombas,
            'flash' => session('success'),
            'filters' => ['search' => $searchQuery], 
        ]);
    }

    public function create()
    {
        return view('admin.lomba.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|array',
            'jenjang_pendidikan' => 'required|array',
            'deskripsi' => 'required|string',
            'lokasi' => 'required|string',
            'tipe_lokasi' => 'required|string',
            'poster_lomba' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_mulai',
            'penyelenggara' => 'required|string|max:255',
            'link_pendaftaran' => 'required|url',
        ]);

        $posterPath = $request->file('poster_lomba')->store('posters/lomba', 'public');

        Lomba::create([
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul) . '-' . uniqid(),
            'kategori' => implode(',', $request->kategori),
            'jenjang_pendidikan' => implode(',', $request->jenjang_pendidikan),
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

        return redirect()->route('admin.lomba.index')->with('success', 'Lomba berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $lomba = Lomba::findOrFail($id);
        return view('admin.lomba.edit', compact('lomba'));
    }

    public function update(Request $request, $id)
    {
        $lomba = Lomba::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|array',
            'jenjang_pendidikan' => 'required|array',
            'deskripsi' => 'required|string',
            'lokasi' => 'required|string',
            'tipe_lokasi' => 'required|string',
            'poster_lomba' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_mulai',
            'penyelenggara' => 'required|string|max:255',
            'link_pendaftaran' => 'required|url',
        ]);

        if ($request->hasFile('poster_lomba')) {
            if ($lomba->poster_lomba && Storage::disk('public')->exists($lomba->poster_lomba)) {
                Storage::disk('public')->delete($lomba->poster_lomba);
            }
            $posterPath = $request->file('poster_lomba')->store('posters/lomba', 'public');
        } else {
            $posterPath = $lomba->poster_lomba;
        }

        $lomba->update([
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul) . '-' . uniqid(),
            'kategori' => implode(',', $request->kategori),
            'jenjang_pendidikan' => implode(',', $request->jenjang_pendidikan),
            'deskripsi' => $request->deskripsi,
            'lokasi' => $request->lokasi,
            'tipe_lokasi' => $request->tipe_lokasi,
            'poster_lomba' => $posterPath,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_akhir' => $request->tanggal_akhir,
            'penyelenggara' => $request->penyelenggara,
            'link_pendaftaran' => $request->link_pendaftaran,
        ]);

        return redirect()->route('admin.lomba.index')->with('success', 'Lomba berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $lomba = Lomba::findOrFail($id);

        if ($lomba->poster_lomba && Storage::disk('public')->exists($lomba->poster_lomba)) {
            Storage::disk('public')->delete($lomba->poster_lomba);
        }

        $lomba->delete();

        return redirect()->route('admin.lomba.index')->with('success', 'Lomba berhasil dihapus.');
    }
}