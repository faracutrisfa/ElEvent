import React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

const Hero = () => {
    return (
        <section className="bg-blue-900">
            <div className="container flex flex-col-reverse items-center gap-10 py-20 md:flex-row md:py-32">
                <div className="w-full text-center space-y-6 md:w-2/3 md:text-left md:space-y-10">
                    <h2 className="text-4xl font-semibold text-gradasi-yellow lg:text-6xl">
                        Satu tempat untuk semua informasi lomba & beasiswa terbaik.
                    </h2>
                    <div className="flex justify-center space-x-3 md:justify-start">
                        <PrimaryButton className="rounded-full">
                            Explore
                        </PrimaryButton>
                        <PrimaryButton variant="outline" className="rounded-full">
                            About Us
                        </PrimaryButton>
                    </div>
                </div>

                <div className="w-2/3 flex justify-center md:w-1/3 md:justify-end">
                    <img src="/assets/hero.webp" alt="hero image" className="w-full md:w-96" />
                </div>
            </div>
        </section>
    );
};

export default Hero;