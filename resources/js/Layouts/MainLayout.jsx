import React, { useState, useMemo } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Footer from '@/Components/Footer';
import { usePage } from '@inertiajs/react';
import { Icon } from '@iconify/react';

const MainLayout = ({ children }) => {
    const [navOpen, setNavOpen] = useState(false);
    const { url } = usePage();

    const navItems = useMemo(() => [
        { label: 'Home', routeName: 'home', hash: null },
        { label: 'Eksplore', routeName: 'explore', hash: null },
        { label: 'FAQs', routeName: 'home', hash: '#faq' },
        { label: 'About Us', routeName: 'home', hash: '#about-us' },
    ], []);

    const isNavLinkActive = (routeName, hash) => {
        if (routeName === 'home' && !hash) {
            return route().current('home') && !url.includes('#');
        }
        if (routeName === 'explore') {
            return route().current('explore') || route().current('lomba.detail') || route().current('beasiswa.detail');
        }
        if (hash) {
            return url.includes(hash);
        }
        return false;
    };

    const activeLabel = useMemo(() => {
        const currentActiveItem = navItems.find(({ routeName, hash }) =>
            isNavLinkActive(routeName, hash)
        );
        return currentActiveItem ? currentActiveItem.label : 'Home';
    }, [url, navItems]);

    const navbarBgClass = useMemo(() => {
        return activeLabel === 'Eksplore' ? 'bg-blue-600' : 'bg-blue-900';
    }, [activeLabel]);

    return (
        <section className="font-Lexend bg-cream-600">
            <nav className={`${navbarBgClass} px-10 lg:px-20 fixed w-full z-50 transition-colors duration-300`}>
                <div className="flex justify-between h-20 py-1">
                    <div className="flex gap-14">
                        <div className='flex items-center'>
                            <ApplicationLogo variant="yellow" />
                        </div>
                        <div className="hidden md:flex gap-12">
                            {navItems.map(({ label, routeName, hash }) => (
                                <NavLink
                                    key={label}
                                    href={hash ? `${route(routeName)}${hash}` : route(routeName)}
                                    active={isNavLinkActive(routeName, hash)}
                                    hash={hash}
                                    className={isNavLinkActive(routeName, hash) && label === 'Eksplore' ? 'bg-blue-600 text-white' : 'text-white'}
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setNavOpen(!navOpen)}
                            className="text-mustard-600"
                            aria-label={navOpen ? "Close navigation" : "Open navigation"}
                        >
                            {navOpen ? (
                                <Icon icon="heroicons-outline:x" className="h-6 w-6" />
                            ) : (
                                <Icon icon="heroicons-outline:menu-alt-3" className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                <div
                    className={`md:hidden ${navbarBgClass} overflow-hidden transition-all duration-300 ease-in-out ${navOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}
                >
                    <div className="flex flex-col space-y-2 container">
                        {navItems.map(({ label, routeName, hash }) => (
                            <ResponsiveNavLink
                                key={label}
                                href={hash ? `${route(routeName)}${hash}` : route(routeName)}
                                active={isNavLinkActive(routeName, hash)}
                                hash={hash}
                                className={isNavLinkActive(routeName, hash) && label === 'Eksplore' ? 'bg-blue-600 text-white' : 'text-gray-200'}
                            >
                                {label}
                            </ResponsiveNavLink>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="pt-20">{children}</main>

            <Footer />
        </section>
    );
};

export default MainLayout;