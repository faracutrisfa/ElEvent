import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Icon } from '@iconify/react';
import MultiSelectDropdown from './MultiSelectDropdown'; 

const ExploreFilter = ({ filters, filterOptions, jenis, setJenis }) => {
    const [localSearchQuery, setLocalSearchQuery] = useState(filters.search || '');
    const [localSelectedKategori, setLocalSelectedKategori] = useState(
        filters.kategori ? filters.kategori.split(',') : []
    );
    const [localSelectedJenjang, setLocalSelectedJenjang] = useState(
        filters.jenjang ? filters.jenjang.split(',') : []
    );
    const [localSelectedTipePendanaan, setLocalSelectedTipePendanaan] = useState(
        filters.tipe_pendanaan ? filters.tipe_pendanaan.split(',') : []
    );
    const [localSelectedTipeLokasi, setLocalSelectedTipeLokasi] = useState(
        filters.tipe_lokasi ? filters.tipe_lokasi.split(',') : []
    );

    const handleSearch = () => {
        router.get(
            route('explore'),
            {
                search: localSearchQuery,
                kategori: localSelectedKategori.join(','),
                jenjang: localSelectedJenjang.join(','),
                tipe_pendanaan: localSelectedTipePendanaan.join(','),
                tipe_lokasi: localSelectedTipeLokasi.join(','),
                jenis: jenis,
            },
            {
                preserveState: true,
                replace: true,
                only: ['allBeasiswas', 'allLombas', 'filters'],
            }
        );
    };

    const handleFilterChange = (name, value) => {
        switch (name) {
            case 'kategori':
                setLocalSelectedKategori(value);
                break;
            case 'jenjang':
                setLocalSelectedJenjang(value);
                break;
            case 'tipe_pendanaan':
                setLocalSelectedTipePendanaan(value);
                break;
            case 'tipe_lokasi':
                setLocalSelectedTipeLokasi(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="mx-auto pt-16">
            <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="relative w-full lg:flex-1">
                    <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-900 text-lg" />
                    <input
                        id="explore-search"
                        type="text"
                        value={localSearchQuery}
                        onChange={(e) => setLocalSearchQuery(e.target.value)}
                        placeholder="Cari di sini..."
                        className="w-full pl-12 pr-4 py-3 border-0 placeholder:text-cream-900 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 text-cream-900 shadow-sm"
                    />
                </div>

                {jenis === 'lomba' && (
                    <>
                        <div className="w-full lg:w-60">
                            <MultiSelectDropdown
                                label="Kategori"
                                name="kategori"
                                options={filterOptions.kategori || []}
                                selectedValues={localSelectedKategori}
                                onChange={handleFilterChange}
                                icon="stash:stars"
                            />
                        </div>
                        <div className="w-full lg:w-60">
                            <MultiSelectDropdown
                                label="Jenjang"
                                name="jenjang"
                                options={filterOptions.jenjang || []}
                                selectedValues={localSelectedJenjang}
                                onChange={handleFilterChange}
                                icon="qlementine-icons:education-16"
                            />
                        </div>
                        <div className="w-full lg:w-60">
                            <MultiSelectDropdown
                                label="Lokasi"
                                name="tipe_lokasi"
                                options={filterOptions.tipe_lokasi || []}
                                selectedValues={localSelectedTipeLokasi}
                                onChange={handleFilterChange}
                                icon="weui:location-outlined"
                            />
                        </div>
                    </>
                )}

                {jenis === 'beasiswa' && (
                    <>
                        <div className="w-full lg:w-72">
                            <MultiSelectDropdown
                                label="Jenjang"
                                name="jenjang"
                                options={filterOptions.jenjang || []}
                                selectedValues={localSelectedJenjang}
                                onChange={handleFilterChange}
                                icon="qlementine-icons:education-16"
                            />
                        </div>
                        <div className="w-full lg:w-72">
                            <MultiSelectDropdown
                                label="Tipe Pendanaan"
                                name="tipe_pendanaan"
                                options={filterOptions.tipe_pendanaan || []}
                                selectedValues={localSelectedTipePendanaan}
                                onChange={handleFilterChange}
                                icon="stash:stars"
                            />
                        </div>
                    </>
                )}

                <button
                    onClick={handleSearch}
                    className="w-full lg:w-40 bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Cari
                </button>
            </div>
        </div>
    );
};

export default ExploreFilter;