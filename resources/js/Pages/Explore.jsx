import React, { useState, useEffect } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';
import CardBeasiswa from '@/Components/CardBeasiswa';
import CardLomba from '@/Components/CardLomba';
import { Icon } from '@iconify/react';
import MainLayout from '@/Layouts/MainLayout';
import ExploreFilter from '@/Components/ExploreFilter';

const Explore = () => {
    const { allBeasiswas, allLombas, filters, filterOptions } = usePage().props;

    const [jenis, setJenis] = useState(filters.jenis || 'lomba');

    return (
        <MainLayout>
            <Head title="Explore" />

            <div className="bg-gradasi py-16">
                <div className="container mx-auto text-center">
                    <div className='font-extrabold text-4xl lg:text-6xl text-center flex flex-col items-center'>
                        <p className='text-white'>We Bring The</p>
                        <p className='bg-mustard-400 rounded-lg p-2 -rotate-1 '>
                            <span className='text-gradasi'>Best Opportunities</span>
                        </p>
                        <p className='text-white -mt-2'>to You!</p>
                    </div>

                    <ExploreFilter
                        filters={filters}
                        filterOptions={filterOptions}
                        jenis={jenis}
                        setJenis={setJenis}
                    />
                </div>
            </div>

            <section className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-fixed"
                style={{
                    backgroundImage: "url('/assets/explore-bg.webp')"
                }}
            >
                <div className="container mx-auto px-4 py-10">

                    <div className="flex justify-center mb-12">
                        <div className="bg-gray-100 rounded-xl p-2 shadow-inner">
                            <Link
                                href={route('explore', { ...filters, jenis: 'lomba' })}
                                className={`inline-block px-40 py-3 font-semibold transition-all duration-300 rounded-xl ${jenis === 'lomba'
                                    ? 'bg-gradasi text-cream-600 shadow-inner'
                                    : 'text-blue-400 hover:text-blue-600'
                                    }`}
                                onClick={() => setJenis('lomba')}
                            >
                                Lomba
                            </Link>
                            <Link
                                href={route('explore', { ...filters, jenis: 'beasiswa' })}
                                className={`inline-block px-40 py-3 font-semibold transition-all duration-300 rounded-xl ${jenis === 'beasiswa'
                                    ? 'bg-gradasi text-cream-600 shadow-inner'
                                    : 'text-blue-400 hover:text-blue-600'
                                    }`}
                                onClick={() => setJenis('beasiswa')}
                            >
                                Beasiswa
                            </Link>
                        </div>
                    </div>

                    {jenis === 'beasiswa' && (
                        <section className="mb-12">
                            {allBeasiswas && allBeasiswas.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto">
                                    {allBeasiswas.map((beasiswa) => (
                                        <div key={beasiswa.id} className="transform transition-all duration-200">
                                            <CardBeasiswa beasiswa={beasiswa} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                                        <Icon icon="mdi:school-outline" className="text-6xl text-cream-900 mx-auto mb-4" />
                                        <p className="text-gray-600 text-lg">Tidak ada beasiswa yang tersedia dengan filter saat ini.</p>
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {jenis === 'lomba' && (
                        <section>
                            {allLombas && allLombas.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto">
                                    {allLombas.map((lomba) => (
                                        <div key={lomba.id} className="transform transition-all duration-200">
                                            <CardLomba lomba={lomba} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="bg-white rounded-xl shadow-lg p-8 mx-auto">
                                        <Icon icon="mdi:trophy-outline" className="text-6xl text-cream-900 mx-auto mb-4" />
                                        <p className="text-gray-600 text-lg">Tidak ada lomba yang tersedia dengan filter saat ini.</p>
                                    </div>
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}

export default Explore;