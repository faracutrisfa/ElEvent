<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {   
        Schema::create('beasiswas', function (Blueprint $table) {
            $table->id();
            $table->string('judul', 255)->nullable(false); 
            $table->string('jenjang_pendidikan', 100)->nullable(false); 
            $table->string('tipe_pendaftaran', 100)->nullable(false); 
            $table->text('syarat_penerima')->nullable(); 
            $table->text('benefit')->nullable(); 
            $table->date('tanggal_mulai')->nullable(false); 
            $table->date('tanggal_akhir')->nullable(false); 
            $table->string('poster_beasiswa', 255)->nullable(); 
            $table->string('pemberi_beasiswa', 255)->nullable(false); 
            $table->string('link_pendaftaran', 500)->nullable(false);
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
        Schema::dropIfExists('beasiswas');
    }
};
