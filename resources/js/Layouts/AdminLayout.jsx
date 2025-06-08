import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

import React from 'react';

const AdminLayout = ({ children }) => {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <section className='font-Lexend'>
            <nav className='bg-blue-600 fixed w-full'>
                <div className='container flex justify-between h-20 px-4'>
                    <div className='flex gap-14'>
                        <ApplicationLogo variant='yellow' />
                        <div className="hidden md:flex gap-14">
                            <NavLink
                                href={route('dashboard.lomba.index')}
                                active={route().current('dashboard.lomba.index')}
                            >
                                Lomba
                            </NavLink>
                            <NavLink
                                href={route('dashboard.beasiswa.index')}
                                active={route().current('dashboard.beasiswa.index')}
                            >
                                Beasiswa
                            </NavLink>
                        </div>
                    </div>
                    <div className="hidden md:flex sm:items-center">
                        <form onSubmit={handleLogout}>
                            <button
                                type="submit"
                                className="text-mustard-600 border-2 border-mustard-600 font-semibold rounded-full py-2 px-5"
                            >
                                Log Out
                            </button>
                        </form>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                            className="inline-flex items-center justify-center rounded-md text-mustard-600 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    className={`md:hidden bg-blue-600 overflow-hidden transition-all duration-300 ease-in-out ${showingNavigationDropdown ? 'max-h-96 py-4' : 'max-h-0 py-0'
                        }`}
                >
                    <div className="flex flex-col space-y-2 container">
                        <ResponsiveNavLink
                            href={route('dashboard.lomba.index')}
                            active={route().current('dashboard.lomba.index')}
                        >
                            Lomba
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('dashboard.beasiswa.index')}
                            active={route().current('dashboard.beasiswa.index')}
                        >
                            Beasiswa
                        </ResponsiveNavLink>
                        <form onSubmit={handleLogout}>
                            <button
                                type="submit"
                                className="text-mustard-600 border-2 border-mustard-600 font-semibold rounded-full py-2 px-5 w-full text-center"
                            >
                                Log Out
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className='pt-20'>{children}</main>
        </section>
    );
};

export default AdminLayout;