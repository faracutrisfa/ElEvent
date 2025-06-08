import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import PrimaryButton from '@/Components/PrimaryButton'

const Create = ({ onClose }) => {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        jenjang_pendidikan: '',
        tipe_pendaftaran: '',
        syarat_penerima: '',
        benefit: '',
        tanggal_mulai: '',
        tanggal_akhir: '',
        poster_beasiswa: null,
        pemberi_beasiswa: '',
        link_pendaftaran: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('admin.beasiswa.store'), {
            onSuccess: () => {
                onClose()
            },
        })
    }

    return (
        <>
            <Head title="Tambah Beasiswa" />
            <h2 className="text-xl font-semibold leading-tight text-gray-800 mb-4">
                Tambah Beasiswa
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
                    label="Syarat Penerima"
                    name="syarat_penerima"
                    value={data.syarat_penerima}
                    onChange={setData}
                />
                <Input label="Benefit" name="benefit" value={data.benefit} onChange={setData} />
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
                    label="Pemberi Beasiswa"
                    name="pemberi_beasiswa"
                    value={data.pemberi_beasiswa}
                    onChange={setData}
                    error={errors.pemberi_beasiswa}
                />
                <Input
                    label="Link Pendaftaran"
                    name="link_pendaftaran"
                    value={data.link_pendaftaran}
                    onChange={setData}
                    error={errors.link_pendaftaran}
                />

                <div>
                    <label className="block mb-1 font-semibold">Poster Beasiswa</label>
                    <input
                        type="file"
                        onChange={(e) => setData('poster_beasiswa', e.target.files[0])}
                    />
                    {errors.poster_beasiswa && (
                        <div className="text-red-600 text-sm">{errors.poster_beasiswa}</div>
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
