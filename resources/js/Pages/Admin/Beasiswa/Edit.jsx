import { Head, useForm } from '@inertiajs/react'
import React, { useState, useRef, useEffect } from 'react'
import PrimaryButton from '@/Components/PrimaryButton'

const jenjangOptions = [
    "SD",
    "SMP/MTS",
    "SMA/MA/SMK",
    "Mahasiswa",
]

const pendanaanOptions = ["Fully Funded", "Partially Funded"]

const MultiSelectDropdown = ({ label, name, options, selectedValues = [], onChange, error }) => {
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
                className="cursor-pointer w-full border-2 border-mustard-600 rounded-xl text-sm px-3 py-2 bg-white flex justify-between items-center"
            >
                <div className="truncate max-w-[calc(100%-20px)]">
                    {Array.isArray(selectedValues) && selectedValues.length > 0
                        ? selectedValues.join(', ')
                        : `Pilih ${label.toLowerCase()}`}
                </div>
                <div className="ml-2 text-gray-600">&#9662;</div>
            </div>
            {open && (
                <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto border-2 border-mustard-600 rounded-xl text-sm bg-white shadow-lg">
                    {options.map((option) => (
                        <label
                            key={option}
                            className="flex items-center px-3 py-1 hover:bg-gray-100 cursor-pointer select-none"
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
            className="w-full border-2 border-mustard-600 rounded-xl text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mustard-400 bg-white"
        />
        {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </div>
)

const Edit = ({ beasiswa, onClose }) => {
    const parseCommaSeparatedString = (str) => {
        return str ? str.split(',') : [];
    };

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        judul: beasiswa.judul,
        jenjang_pendidikan: parseCommaSeparatedString(beasiswa.jenjang_pendidikan),
        tipe_pendaftaran: parseCommaSeparatedString(beasiswa.tipe_pendaftaran),
        syarat_penerima: beasiswa.syarat_penerima || '',
        benefit: beasiswa.benefit || '',
        tanggal_mulai: beasiswa.tanggal_mulai,
        tanggal_akhir: beasiswa.tanggal_akhir,
        pemberi_beasiswa: beasiswa.pemberi_beasiswa,
        poster_beasiswa: null,
        link_pendaftaran: beasiswa.link_pendaftaran,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('admin.beasiswa.update', beasiswa.id), {
            onSuccess: () => {
                onClose()
            },
        })
    }

    return (
        <>
            <Head title="Edit Beasiswa" />
            <div className="text-center text-xl font-bold text-white mb-2">
                Edit Informasi
                <span className="text-mustard-400"> Lomba </span>
            </div>

            <form onSubmit={submit} className="max-w-2xl space-y-3">
                <Input label="Judul" name="judul" value={data.judul} onChange={setData} error={errors.judul} />

                <div className="grid grid-cols-2 gap-4">
                    <MultiSelectDropdown
                        label="Jenjang Pendidikan"
                        name="jenjang_pendidikan"
                        options={jenjangOptions}
                        selectedValues={data.jenjang_pendidikan}
                        onChange={setData}
                        error={errors.jenjang_pendidikan}
                    />
                    <MultiSelectDropdown
                        label="Tipe Pendanaan"
                        name="tipe_pendaftaran" 
                        options={pendanaanOptions}
                        selectedValues={data.tipe_pendaftaran}
                        onChange={setData}
                        error={errors.tipe_pendaftaran}
                    />
                </div>

                <Input label="Syarat Penerima" name="syarat_penerima" value={data.syarat_penerima} onChange={setData} error={errors.syarat_penerima} />
                <Input label="Benefit" name="benefit" value={data.benefit} onChange={setData} error={errors.benefit} />

                <div className="grid grid-cols-2 gap-4 items-end">
                    <Input label="Tanggal Mulai" name="tanggal_mulai" type="date" value={data.tanggal_mulai} onChange={setData} error={errors.tanggal_mulai} />
                    <Input label="Tanggal Akhir" name="tanggal_akhir" type="date" value={data.tanggal_akhir} onChange={setData} error={errors.tanggal_akhir} />
                </div>

                <div className="grid grid-cols-2 gap-4 items-end">
                    <div>
                        <label className="block mb-1 font-semibold text-mustard-200">Poster Lomba</label>
                        <input
                            type="file"
                            onChange={(e) => setData('poster_beasiswa', e.target.files[0])}
                            className="w-full border-2 border-mustard-600 rounded-xl text-xs px-3 py-2 bg-white file:text-gray-600"
                        />
                        {errors.poster_beasiswa && (
                            <div className="text-red-600 text-sm mt-1">{errors.poster_beasiswa}</div>
                        )}
                    </div>

                    <Input label="Pemberi Beasiswa" name="pemberi_beasiswa" value={data.pemberi_beasiswa} onChange={setData} error={errors.pemberi_beasiswa} />
                </div>

                <Input label="Link Pendaftaran" name="link_pendaftaran" value={data.link_pendaftaran} onChange={setData} error={errors.link_pendaftaran} />

                <div className="pt-4">
                    <PrimaryButton className="w-full text-center justify-center uppercase rounded-full" disabled={processing}>
                        Perbarui
                    </PrimaryButton>
                </div>
            </form>
        </>
    )
}

export default Edit