export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block font-bold text-mustard-200` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
