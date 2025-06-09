import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    hash = null,
    ...props
}) {

    const handleClick = (e) => {
        if (hash && window.location.pathname === props.href.split('#')[0]) {
            e.preventDefault();
            const targetId = hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <Link
            {...props}
            onClick={handleClick}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active
                ? 'border-mustard-400'
                : 'border-transparent '
                } font-semibold transition duration-150 ease-in-out focus:outline-none text-cream-500 ${className}`}
        >
            {children}
        </Link>
    );
}
