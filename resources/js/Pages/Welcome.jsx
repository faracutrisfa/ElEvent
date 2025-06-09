import MainLayout from '@/Layouts/MainLayout';
import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Hero from './Home/Hero';
import LatestItemsCarousel from './Home/LatestItemsCarousel';
import Faq from './Home/Faq';
import AbousUs from './Home/AbousUs';

const Welcome = () => {
    const { latestLombas, latestBeasiswas } = usePage().props;

    return (
        <MainLayout>
            <Head title="Home" />

            <div>
                <Hero />
                <LatestItemsCarousel
                    latestLombas={latestLombas}
                    latestBeasiswas={latestBeasiswas}
                />

                <section id='faq'>
                    <Faq />
                </section>

                <section id='about-us'>
                    <AbousUs />
                </section>
            </div>
        </MainLayout>
    );
};

export default Welcome;