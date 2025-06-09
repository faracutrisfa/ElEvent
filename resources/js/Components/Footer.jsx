import React from 'react'
import ApplicationLogo from './ApplicationLogo'
import { Icon } from '@iconify/react'

const Footer = () => {
    return (
        <footer className='bg-gradasi'>
            <div className='container py-12'>
                <div className='text-center space-y-8'>
                    <h2 className="text-white text-3xl font-bold">Let's Connect!</h2>

                    <div className='flex justify-center items-center gap-4 pb-12'>
                        <a
                            href="mailto:el.event@gmail.com"
                            className="bg-white bg-opacity-25 hover:bg-opacity-30 transition-all duration-300 rounded-lg px-4 py-2 flex items-center gap-2 text-white hover:scale-105"
                        >
                            <Icon icon="mdi:email" className="text-lg" />
                            <span className="text-sm">el.event@gmail.com</span>
                        </a>

                        <a
                            href="#"
                            className="bg-white bg-opacity-25 hover:bg-opacity-30 transition-all duration-300 rounded-lg px-4 py-2 flex items-center gap-2 text-white hover:scale-105"
                        >
                            <Icon icon="mdi:linkedin" className="text-lg" />
                            <span className="text-sm">El Event</span>
                        </a>

                        <a
                            href="#"
                            className="bg-white bg-opacity-25 hover:bg-opacity-30 transition-all duration-300 rounded-lg px-4 py-2 flex items-center gap-2 text-white hover:scale-105"
                        >
                            <Icon icon="mdi:instagram" className="text-lg" />
                            <span className="text-sm">@el.event.official</span>
                        </a>

                        <a
                            href="#"
                            className="bg-white bg-opacity-25 hover:bg-opacity-30 transition-all duration-300 rounded-lg px-4 py-2 flex items-center gap-2 text-white hover:scale-105"
                        >
                            <Icon icon="ic:baseline-tiktok" className="text-lg" />
                            <span className="text-sm">@el.event.official</span>
                        </a>
                    </div>

                    <div className='flex items-center justify-center gap-5'>
                        <ApplicationLogo variant='yellow' />
                        <div className='flex items-center gap-2 text-white text-sm'>
                            <Icon icon="mdi:copyright" className="text-base" />
                            <span>Copyright 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer