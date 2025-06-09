import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

const AdminLayout = ({ children }) => {
    const { auth: { user } } = usePage().props;
    const [navOpen, setNavOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const navItems = [
        { label: 'Lomba', routeName: 'admin.lomba.index' },
        { label: 'Beasiswa', routeName: 'admin.beasiswa.index' },
    ];

    return (
        <section className="font-Lexend">
            <nav className="bg-blue-600 fixed w-full z-50">
                <div className="container flex justify-between h-20 py-1 px-4">
                    <div className="flex gap-14">
                        <div className='flex items-center'>
                            <ApplicationLogo variant="yellow" />
                        </div>
                        <div className="hidden md:flex gap-14">
                            {navItems.map(({ label, routeName }) => (
                                <NavLink
                                    key={routeName}
                                    href={route(routeName)}
                                    active={route().current(routeName)}
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center">
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
                            onClick={() => setNavOpen(!navOpen)}
                            className="text-mustard-600"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {navOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    className={`md:hidden bg-blue-600 overflow-hidden transition-all duration-300 ease-in-out ${navOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}
                >
                    <div className="flex flex-col space-y-2 container">
                        {navItems.map(({ label, routeName }) => (
                            <ResponsiveNavLink
                                key={routeName}
                                href={route(routeName)}
                                active={route().current(routeName)}
                            >
                                {label}
                            </ResponsiveNavLink>
                        ))}
                        <form onSubmit={handleLogout}>
                            <button
                                type="submit"
                                className="text-mustard-600 border-2 border-mustard-600 font-semibold rounded-full py-2 px-5 w-full"
                            >
                                Log Out
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="pt-20">{children}</main>
        </section>
    );
};

export default AdminLayout;