import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-4 px-8 pt-1 text-cream-500 font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-mustard-600 focus:border-mustard-700'
                    : 'border-transparent hover:border-mustard-200') +
                className
            }
        >
            {children}
        </Link>
    );
}
