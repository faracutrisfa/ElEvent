export default function PrimaryButton({
    className = '',
    disabled,
    children,
    variant = 'solid', 
    ...props
}) {
    const baseClasses = `inline-flex items-center leading-tight transition duration-150 ease-in-out `;
    const disabledClasses = disabled ? 'opacity-25' : '';

    const solidClasses = `border-2 border-transparent bg-mustard-600 px-5 py-3 font-semibold text-cream-1100 hover:bg-mustard-700 focus:bg-mustard-700 focus:outline-none focus:ring-2 focus:ring-mustard-500 focus:ring-offset-2`;

    const outlineClasses = `border-2 border-mustard-600 px-5 py-3 font-semibold text-mustard-600 hover:bg-mustard-600 hover:text-cream-1100 focus:bg-mustard-600 focus:text-cream-1100 focus:outline-none focus:ring-2 focus:ring-mustard-500 focus:ring-offset-2`;

    const getVariantClasses = () => {
        switch (variant) {
            case 'outline':
                return outlineClasses;
            case 'solid':
            default:
                return solidClasses;
        }
    };

    return (
        <button
            {...props}
            className={`${baseClasses} ${getVariantClasses()} ${disabledClasses} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}