import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm } from '@inertiajs/react'
import React, { useState, useRef, useEffect } from 'react'
import PrimaryButton from '@/Components/PrimaryButton'

const jenjangOptions = [
  "SD",
  "SMP/MTS",
  "SMA/MA/SMK",
  "Mahasiswa",
]

const kategoriOptions = [
  "Animasi", "Artikel", "Bahasa Asing", "Bisnis", "Debat", "Desain", "E-sport", "Esai",
  "Fotografi", "Game Development", "Hukum", "Infografis", "IT", "Karya Tulis Ilmiah",
  "Kewirausahaan", "Lingkungan", "Matematika", "Musik", "Mobile App Development",
  "Olimpiade", "Poster", "Programmer", "Puisi", "Robotik", "Sastra", "Seni",
  "Short Movie", "Storytelling", "Teknologi", "UI/UX", "Videografi", "Web Development"
]

const MultiSelectDropdown = ({ label, name, options, selectedValues, onChange, error }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOption = (option) => {
    if (selectedValues.includes(option)) {
      onChange(name, selectedValues.filter((v) => v !== option))
    } else {
      onChange(name, [...selectedValues, option])
    }
  }

  return (
    <div className="relative" ref={ref}>
      <label className="block mb-1 font-semibold text-mustard-200">{label}</label>
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer w-full border-2 text-sm border-mustard-600 rounded-xl bg-white px-3 py-2 flex justify-between items-center"
      >
        <div className="truncate max-w-[calc(100%-20px)]">
          {selectedValues.length > 0 ? selectedValues.join(', ') : `Pilih ${label.toLowerCase()}`}
        </div>
        <div className="ml-2 text-mustard-600">&#9662;</div>
      </div>
      {open && (
        <div className="absolute z-10 mt-1 w-full text-sm max-h-44 overflow-y-auto border border-mustard-600 rounded bg-white shadow-lg">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-3 py-1 hover:bg-mustard-200 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => toggleOption(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </div>
  )
}

const Input = ({ label, name, type = 'text', value, onChange, error }) => (
  <div>
    <label className="block mb-1 font-semibold text-mustard-200">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className="w-full border-2 border-mustard-600 rounded-xl px-3 text-sm py-2 focus:outline-none focus:ring-2 focus:ring-mustard-400 bg-white"
    />
    {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
  </div>
)

const Create = ({ onClose }) => {
  const { data, setData, post, processing, errors } = useForm({
    judul: '',
    kategori: [],
    jenjang_pendidikan: [],
    deskripsi: '',
    lokasi: '',
    tipe_lokasi: '',
    poster_lomba: null,
    tanggal_mulai: '',
    tanggal_akhir: '',
    penyelenggara: '',
    link_pendaftaran: '',
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('admin.lomba.store'), {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <section>
      <Head title="Tambah Lomba" />
      <div className="text-center text-white text-xl font-bold text-light-cream mb-2">
        Tambahkan Informasi
        <span className="text-mustard-400"> Lomba </span>
        Baru
      </div>

      <form onSubmit={submit} className="max-w-2xl space-y-2">
        <Input
          label="Judul"
          name="judul"
          value={data.judul}
          onChange={setData}
          error={errors.judul}
        />

        <div className="grid grid-cols-2 gap-4">
          <MultiSelectDropdown
            label="Kategori"
            name="kategori"
            options={kategoriOptions}
            selectedValues={data.kategori}
            onChange={setData}
            error={errors.kategori}
          />
          <MultiSelectDropdown
            label="Jenjang Pendidikan"
            name="jenjang_pendidikan"
            options={jenjangOptions}
            selectedValues={data.jenjang_pendidikan}
            onChange={setData}
            error={errors.jenjang_pendidikan}
          />
        </div>

        <Input
          label="Deskripsi"
          name="deskripsi"
          value={data.deskripsi}
          onChange={setData}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Lokasi"
            name="lokasi"
            value={data.lokasi}
            onChange={setData}
          />
          <div>
            <label className="block mb-1 font-semibold text-blue-600">Tipe Lokasi</label>
            <div className="flex gap-2">
              {['Offline', 'Online', 'Hybrid'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setData('tipe_lokasi', option)}
                  className={`px-6 py-2 rounded-xl border-2  text-sm font-semibold transition-colors
                    ${data.tipe_lokasi === option
                      ? 'bg-mustard-600 text-blue-900 border-mustard-600'
                      : 'bg-transparent text-mustard-600 border-mustard-600'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.tipe_lokasi && (
              <div className="text-red-600 text-sm mt-1">{errors.tipe_lokasi}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className="block mb-1 font-semibold text-mustard-200">Poster Lomba</label>
            <input
              type="file"
              onChange={(e) => setData('poster_lomba', e.target.files[0])}
              className="w-full border-2 border-mustard-600 rounded-xl px-3 py-2 bg-white text-xs"
            />
            {errors.poster_lomba && (
              <div className="text-red-600 text-sm mt-1">{errors.poster_lomba}</div>
            )}
          </div>
          <Input
            label="Mulai Pendaftaran"
            name="tanggal_mulai"
            type="date"
            value={data.tanggal_mulai}
            onChange={setData}
            error={errors.tanggal_mulai}
          />
          <Input
            label="Batas Akhir Pendaftaran"
            name="tanggal_akhir"
            type="date"
            value={data.tanggal_akhir}
            onChange={setData}
            error={errors.tanggal_akhir}
          />
        </div>

        <Input
          label="Penyelenggara"
          name="penyelenggara"
          value={data.penyelenggara}
          onChange={setData}
          error={errors.penyelenggara}
        />

        <Input
          label="Link Pendaftaran"
          name="link_pendaftaran"
          value={data.link_pendaftaran}
          onChange={setData}
          error={errors.link_pendaftaran}
        />

        <div className="pt-4">
          <PrimaryButton className='w-full text-center justify-center uppercase rounded-full' disabled={processing}>Simpan</PrimaryButton>
        </div>
      </form>
    </section>
  )
}

export default Create
