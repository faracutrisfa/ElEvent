import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active
                    ? 'border-mustard-400'
                    : 'border-transparent '
                } font-semibold transition duration-150 ease-in-out focus:outline-none text-cream-500 ${className}`}
        >
            {children}
        </Link>
    );
}
