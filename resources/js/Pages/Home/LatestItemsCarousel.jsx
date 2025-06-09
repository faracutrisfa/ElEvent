import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import CardBeasiswa from '@/Components/CardBeasiswa';
import CardLomba from '@/Components/CardLomba';
import { Icon } from '@iconify/react';

const LatestItemsCarousel = ({ latestLombas, latestBeasiswas }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const carouselRef = useRef(null);

    const allLatestItems = useMemo(() => {
        const lombas = latestLombas?.map(lomba => ({ ...lomba, type: 'lomba' })) || [];
        const beasiswas = latestBeasiswas?.map(beasiswa => ({ ...beasiswa, type: 'beasiswa' })) || [];
        return [...lombas, ...beasiswas];
    }, [latestLombas, latestBeasiswas]);

    const filteredItems = useMemo(() => {
        let filtered = allLatestItems;

        if (activeTab !== 'All') {
            filtered = filtered.filter(item =>
                item.type === activeTab.toLowerCase()
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(item => {
                const title = item.judul?.toLowerCase() || '';
                const organizer = item.type === 'lomba'
                    ? (item.penyelenggara?.toLowerCase() || '')
                    : (item.pemberi_beasiswa?.toLowerCase() || '');
                const description = item.type === 'lomba'
                    ? (item.deskripsi?.toLowerCase() || '')
                    : `${item.syarat_penerima?.toLowerCase() || ''} ${item.benefit?.toLowerCase() || ''}`;

                return title.includes(query) ||
                    organizer.includes(query) ||
                    description.includes(query);
            });
        }

        return filtered;
    }, [allLatestItems, activeTab, searchQuery]);

    useEffect(() => {
        setCurrentIndex(0);
    }, [activeTab, searchQuery]);

    useEffect(() => {
        if (filteredItems.length <= 2) return;

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const maxIndex = Math.max(0, filteredItems.length - 2);
                return prevIndex >= maxIndex ? 0 : prevIndex + 1;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [filteredItems.length]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentIndex(0);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentIndex(0);
    };

    const renderEmptyState = () => (
        <div className="w-full text-center py-12">
            <Icon icon="mdi:database-search" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
                {searchQuery.trim()
                    ? `Tidak ada hasil untuk "${searchQuery}" pada kategori ${activeTab === 'All' ? 'semua' : activeTab.toLowerCase()}.`
                    : `Belum ada ${activeTab === 'All' ? 'lomba atau beasiswa' : activeTab.toLowerCase()} yang tersedia.`
                }
            </p>
        </div>
    );

    const renderCard = (item) => (
        <div className="transform transition-transform duration-200">
            {item.type === 'lomba' ? (
                <CardLomba lomba={item} />
            ) : (
                <CardBeasiswa beasiswa={item} />
            )}
        </div>
    );

    return (
        <section
            className="py-40 container bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: "url('/assets/bg-home.webp')"
            }}
        >

            <div className="relative z-10 space-y-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-blue-800 text-4xl font-extrabold">
                        Eksplor Lomba dan Beasiswa
                    </h2>
                </div>

                <div className="flex justify-center">
                    <div className="flex gap-4">
                        {['All', 'Beasiswa', 'Lomba'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-6 py-2 border-2 rounded-full font-medium text-sm transition-all duration-200 ${activeTab === tab
                                    ? 'bg-mustard-400 border-mustard-600'
                                    : 'border-transparent bg-mustard-200 hover:bg-mustard-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-2/3 mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Icon icon="mdi:magnify" className="h-5 w-5 text-cream-900" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Cari Lomba atau Beasiswa..."
                            className="w-full pl-14 pr-4 py-3 border border-cream-900 rounded-full focus:ring-2 focus:ring-mustard-400 focus:border-transparent bg-white shadow-sm transition-all duration-200"
                        />
                    </div>
                </div>

                <div className="relative">
                    {filteredItems.length === 0 ? (
                        renderEmptyState()
                    ) : (
                        <>
                            <div className="overflow-hidden">
                                <div
                                    ref={carouselRef}
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{
                                        transform: `translateX(-${currentIndex * 50}%)`
                                    }}
                                >
                                    {filteredItems.map((item) => (
                                        <div
                                            key={`${item.type}-${item.id}`}
                                            className="w-1/2 flex-shrink-0 px-2 p-2"
                                        >
                                            {renderCard(item)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {allLatestItems.length > 0 && (
                    <div className="text-center">
                        <Link
                            href={route('explore')}
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            Lihat Semua
                            <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestItemsCarousel;