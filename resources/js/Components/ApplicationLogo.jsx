import { Link } from '@inertiajs/react'; 

export default function ApplicationLogo({ variant = 'blue', ...props }) {
    const logoSrc = variant === 'yellow'
        ? '/assets/yellow-logo.png'
        : '/assets/blue-logo.png';

    const gradientTextClass =
        variant === 'yellow'
            ? 'bg-gradient-to-l from-mustard-500 to-mustard-600'
            : 'bg-gradient-to-l from-blue-800 to-blue-700';

    return (
        <Link href={route('home')} className="inline-block"> 
            <div className="flex items-center space-x-2" {...props}>
                <img src={logoSrc} alt={`${variant} logo`} className="h-8 w-auto" />
                <span className={`text-2xl font-tiltWrap bg-clip-text text-transparent ${gradientTextClass}`}>
                    ELEvent
                </span>
            </div>
        </Link>
    );
}