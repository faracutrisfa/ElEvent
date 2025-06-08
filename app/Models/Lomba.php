<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lomba extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'judul',
        'kategori',
        'jenjang_pendidikan',
        'deskripsi',
        'lokasi',
        'tipe_lokasi',
        'poster_lomba',
        'tanggal_mulai',
        'tanggal_akhir',
        'penyelenggara',
        'link_pendaftaran',
        'user_id',
        'slug', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

        protected $casts = [
        'tanggal_mulai' => 'datetime',
        'tanggal_akhir' => 'datetime',
    ];

    protected $appends = ['days_left'];

    public function getDaysLeftAttribute()
    {
        $today = now();

        if ($today->lt($this->tanggal_mulai)) {
            return null;
        }

        if ($today->gt($this->tanggal_akhir)) {
            return 'ditutup';
        }

        return $today->diffInDays($this->tanggal_akhir, false);
    }
}
