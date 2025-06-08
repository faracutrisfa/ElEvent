export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center leading-tight border border-transparent bg-mustard-600 px-5 py-3 font-semibold text-cream-1100 transition duration-150 ease-in-out hover:bg-mustard-700 focus:bg-mustard-700 focus:outline-none focus:ring-2 focus:ring-mustard-500 focus:ring-offset-2${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
