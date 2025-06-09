import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react'; // Pastikan Iconify diimpor

const MultiSelectDropdown = ({ label, name, options = [], selectedValues = [], onChange, icon, error }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        let newSelectedValues;
        if (selectedValues.includes(option)) {
            newSelectedValues = selectedValues.filter((v) => v !== option);
        } else {
            newSelectedValues = [...selectedValues, option];
        }
        onChange(name, newSelectedValues);
    };

    return (
        <div className="relative z-10" ref={ref}>
            <label className="sr-only">{label}</label>
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer w-full border-2 border-gray-300 rounded-full text-sm px-4 py-3 bg-white flex justify-between items-center"
            >
                <div className="flex items-center gap-2 truncate max-w-[calc(100%-20px)]">
                    {icon && <Icon icon={icon} className="w-6 h-6 text-gray-500" />}
                    {selectedValues.length > 0
                        ? selectedValues.join(', ')
                        : label}
                </div>
                <div className="ml-2 text-gray-600">&#9662;</div>
            </div>
            {open && (
                <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto border border-gray-300 rounded-xl text-sm bg-white shadow-lg">
                    {options.map((option) => (
                        <label
                            key={option}
                            className="flex items-center px-3 py-1 hover:bg-gray-100 cursor-pointer select-none"
                        >
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(option)}
                                onChange={() => toggleOption(option)}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
        </div>
    );
};

export default MultiSelectDropdown;