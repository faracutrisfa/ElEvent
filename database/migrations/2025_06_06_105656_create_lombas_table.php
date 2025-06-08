<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('lombas', function (Blueprint $table) {
            $table->id();
            $table->string('judul', 255)->nullable(false); 
            $table->string('kategori', 100)->nullable(false);
            $table->string('jenjang_pendidikan', 100)->nullable(false);
            $table->text('deskripsi')->nullable();
            $table->string('lokasi')->nullable(false);
            $table->enum('tipe_lokasi', ['Offline', 'Online', 'Hybrid'])->nullable();
            $table->string('poster_lomba')->nullable();
            $table->date('tanggal_mulai')->nullable(false);
            $table->date('tanggal_akhir')->nullable(false);
            $table->string('penyelenggara')->nullable(false);
            $table->string('link_pendaftaran')->nullable(false);
            $table->string('slug')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lombas');
    }
};
