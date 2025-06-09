import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Icon } from '@iconify/react';
import MainLayout from '@/Layouts/MainLayout';
import PrimaryButton from '@/Components/PrimaryButton';

const CategoryTag = ({ children }) => (
    <span className="text-mustard-400 border border-mustard-400 font-semibold px-3 py-1 rounded-full">
        {children}
    </span>
);

const formatDate = (dateString) =>
    dateString
        ? new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : '-';

const formatJenjang = (jenjang) =>
    jenjang ? jenjang.split(',').map((i) => i.trim()) : [];

export default function BeasiswaDetail({ beasiswa }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [regStatus, setRegStatus] = useState('');

    useEffect(() => {
        const calc = () => {
            const now = new Date(),
                start = new Date(beasiswa.tanggal_mulai),
                end = new Date(beasiswa.tanggal_akhir);

            if (now < start) setRegStatus('belum_dibuka');
            else if (now > end) setRegStatus('ditutup');
            else {
                setRegStatus('berlangsung');
                const diff = end - now;
                return {
                    days: Math.floor(diff / 86400000),
                    hours: Math.floor((diff / 3600000) % 24),
                    minutes: Math.floor((diff / 60000) % 60),
                    seconds: Math.floor((diff / 1000) % 60),
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        const update = () => setTimeLeft(calc());
        update();
        const t = setInterval(update, 1000);
        return () => clearInterval(t);
    }, [beasiswa.tanggal_mulai, beasiswa.tanggal_akhir]);

    if (!beasiswa) {
        return (
            <MainLayout>
                <Head title="Beasiswa Tidak Ditemukan" />
                <div className="container mx-auto py-12 text-center">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">Beasiswa Tidak Ditemukan</h1>
                    <p className="text-lg text-gray-600">
                        Maaf, beasiswa yang Anda cari tidak tersedia atau sudah dihapus.
                    </p>
                    <Link
                        href={route('explore')}
                        className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Kembali ke Eksplore
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title={beasiswa.judul} />

            <div className="container mx-auto py-10">
                <nav className="text-sm text-blue-800">
                    <Link href="/explore">Eksplor</Link>
                    <span className="mx-2">›</span>
                    <Link href={route('explore', { jenis: 'beasiswa' })}>Beasiswa</Link>
                    <span className="mx-2">›</span>
                    <span className="font-semibold">{beasiswa.judul || 'Detail Beasiswa'}</span>
                </nav>
            </div>

            <div className="container mx-auto pb-16 space-y-7">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-gradient-to-l from-[#2A68BA] to-[#003D90] rounded-3xl p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">{beasiswa.judul}</h1>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {formatJenjang(beasiswa.jenjang_pendidikan).map((j, i) => (
                                <CategoryTag key={i}>{j}</CategoryTag>
                            ))}
                        </div>
                        <p className="text-cream-600">oleh {beasiswa.pemberi_beasiswa}</p>
                    </div>

                    <div className="space-y-2">
                        <div className="grid sm:grid-cols-2 gap-5">
                            {[
                                ['Mulai Pendaftaran', beasiswa.tanggal_mulai, 'green'],
                                ['Penutupan Pendaftaran', beasiswa.tanggal_akhir, 'red'],
                            ].map(([title, date, color], i) => (
                                <div key={i}>
                                    <h3 className="text-lg font-semibold text-blue-1100 mb-3">{title}</h3>
                                    <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-4 flex items-center`}>
                                        <Icon icon='uil:calender' className={`text-${color}-700 mr-3 w-6 h-6`} />
                                        <span className={`text-${color}-700 font-medium`}>{formatDate(date)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center bg-mustard-100 p-5 rounded-xl border text-mustard-900  border-mustard-900">
                            <Icon icon="bx:timer" className="text-4xl mr-6" />
                            <div className="">
                                {regStatus === 'ditutup' ? (
                                    <span className="">Pendaftaran Ditutup</span>
                                ) : regStatus === 'belum_dibuka' ? (
                                    <span className="font-bold">Pendaftaran Belum Dibuka</span>
                                ) : (
                                    <div className="flex items-end gap-2">
                                        {['days', 'hours', 'minutes', 'seconds'].map((u) => (
                                            <React.Fragment key={u}>
                                                <span className="text-4xl font-bold">{timeLeft[u]}</span>
                                                <span>
                                                    {u === 'days'
                                                        ? 'hari'
                                                        : u === 'hours'
                                                            ? 'jam'
                                                            : u === 'minutes'
                                                                ? 'menit'
                                                                : 'detik'}
                                                </span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-blue-1100 mb-3">Tipe Pendanaan</h3>
                    <div className="flex flex-col gap-2">
                        {(beasiswa.tipe_pendaftaran || '')
                            .split(',')
                            .map((tipe, i) => (
                                <button
                                    key={i}
                                    className="flex items-center gap-2 bg-blue-50 text-start text-blue-900 px-5 py-3 rounded-xl border border-blue-600"
                                >
                                    <Icon icon="streamline-ultimate:check-badge" className="w-5 h-5" />
                                    {tipe.trim()}
                                </button>
                            ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-blue-1100 mb-3">Benefit</h3>
                    <div className='bg-mustard-100 py-3 px-5 rounded-xl border text-mustard-1000  border-mustard-900'>
                        <p dangerouslySetInnerHTML={{ __html: beasiswa.benefit }} />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-blue-1100 mb-3">Persyaratan</h3>
                    <div className='bg-mustard-100 py-3 px-5 rounded-xl border text-mustard-1000  border-mustard-900'>
                        <p dangerouslySetInnerHTML={{ __html: beasiswa.syarat_penerima }} />
                    </div>
                </div>

                {beasiswa.link_pendaftaran && (
                    <div className='flex justify-center'>
                        <PrimaryButton className="rounded-xl px-28 flex">
                            <a
                                href={beasiswa.link_pendaftaran}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='uppercase'
                            >
                                Daftar Sekarang!
                            </a>
                        </PrimaryButton>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}