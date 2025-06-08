import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import PrimaryButton from '@/Components/PrimaryButton'

const Create = ({ onClose }) => {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        kategori: '',
        jenjang_pendidikan: '',
        tipe_pendaftaran: '',
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
        <>
            <Head title="Tambah Lomba" />
            <h2 className="text-xl font-semibold leading-tight text-gray-800 mb-4">
                Tambah Lomba
            </h2>

            <form onSubmit={submit} className="grid grid-cols-2 max-w-2xl">
                <Input
                    label="Judul"
                    name="judul"
                    value={data.judul}
                    onChange={setData}
                    error={errors.judul}
                />
                <Input
                    label="Kategori"
                    name="kategori"
                    value={data.kategori}
                    onChange={setData}
                    error={errors.kategori}
                />
                <Input
                    label="Jenjang Pendidikan"
                    name="jenjang_pendidikan"
                    value={data.jenjang_pendidikan}
                    onChange={setData}
                    error={errors.jenjang_pendidikan}
                />
                <Input
                    label="Tipe Pendaftaran"
                    name="tipe_pendaftaran"
                    value={data.tipe_pendaftaran}
                    onChange={setData}
                    error={errors.tipe_pendaftaran}
                />
                <Input
                    label="Deskripsi"
                    name="deskripsi"
                    value={data.deskripsi}
                    onChange={setData}
                />
                <Input
                    label="Lokasi"
                    name="lokasi"
                    value={data.lokasi}
                    onChange={setData}
                />
                <Input
                    label="Tipe Lokasi"
                    name="tipe_lokasi"
                    value={data.tipe_lokasi}
                    onChange={setData}
                />
                <Input
                    label="Tanggal Mulai"
                    name="tanggal_mulai"
                    type="date"
                    value={data.tanggal_mulai}
                    onChange={setData}
                    error={errors.tanggal_mulai}
                />
                <Input
                    label="Tanggal Akhir"
                    name="tanggal_akhir"
                    type="date"
                    value={data.tanggal_akhir}
                    onChange={setData}
                    error={errors.tanggal_akhir}
                />
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

                <div>
                    <label className="block mb-1 font-semibold">Poster Lomba</label>
                    <input
                        type="file"
                        onChange={(e) => setData('poster_lomba', e.target.files[0])}
                    />
                    {errors.poster_lomba && (
                        <div className="text-red-600 text-sm">{errors.poster_lomba}</div>
                    )}
                </div>

                <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
            </form>
        </>
    )
}

const Input = ({ label, name, type = 'text', value, onChange, error }) => (
    <div>
        <label className="block mb-1 font-semibold">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
)

export default Create
