import PrimaryButton from '@/Components/PrimaryButton'
import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const faqData = [
        {
            question: "Apakah semua lomba di El-Event gratis?",
            answer: "wkwkwk ngarep lu jawa"
        },
        {
            question: "Bagaimana cara menggunakan filter?",
            answer: "Anda dapat menggunakan filter dengan memilih kategori yang tersedia di halaman pencarian."
        },
        {
            question: "Bagaimana cara mendaftar lomba dan beasiswa?",
            answer: "Untuk mendaftar, klik pada lomba atau beasiswa yang diminati, lalu ikuti petunjuk pendaftaran yang tersedia."
        }
    ]

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index)
    }

    return (
        <section className="container py-16">
            <div className='container'>
                <div className='text-center flex flex-col items-center gap-4'>
                    <h2 className="text-blue-800 text-3xl font-bold">Apakah kamu punya pertanyaan tentang ELEvent?</h2>
                    <p className="text-xl xl:w-1/2 text-gray-700">Kami siap membantu menjawab pertanyaanmu seputar beasiswa dan lomba. Jika kamu masih belum menemukan jawaban yang kamu cari, jangan ragu untuk menghubungi kami ya!</p>
                    <PrimaryButton className='rounded-full bg-mustard-400 hover:bg-mustard-500 text-black font-semibold px-6 py-3'>Chat Kami Sekarang</PrimaryButton>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    <div className='text-start flex flex-col items-start gap-6'>
                        <img src="/assets/faq-hero.webp" alt="image hero" className='w-80 mx-auto lg:mx-0' />
                        <div>
                            <h2 className="text-blue-800 text-4xl font-bold mb-4">Frequently Asked Question</h2>
                            <p className="text-xl text-gray-700">Berikut adalah beberapa pertanyaan yang sering diajukan oleh pengguna El-Event.</p>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        {faqData.map((faq, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <div
                                    key={index}
                                    className={`overflow-hidden py-3 space-y-2 border-b border-blue-300 transition-all duration-300 ${isActive ? 'bg-white rounded-lg shadow-md' : ''}`}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 text-left flex justify-between items-center transition-all duration-300"
                                    >
                                        <span className={`font-medium transition-colors duration-300 ${isActive ? 'text-mustard-600' : ''}`}>
                                            {faq.question}
                                        </span>
                                        <Icon
                                            icon={isActive ? "mdi:chevron-up" : "mdi:chevron-down"}
                                            className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'rotate-180 text-mustard-600' : ''}`}
                                        />
                                    </button>

                                    <div
                                        className={`px-6 bg-white overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <p className="">{faq.answer}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq