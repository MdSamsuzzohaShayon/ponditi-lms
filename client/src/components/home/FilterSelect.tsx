// ─────────────────────────────────────────────
//  FILTER SELECT COMPONENT
// ─────────────────────────────────────────────

import { JSX, memo, useCallback, useEffect, useRef, useState } from "react";
import ChevronDown from "../icons/ChevronDown";

interface IFilterSelectProps {
    label: string;
    icon: JSX.Element | null;
    options: string[];
    s: Record<string, string>; // style from HomePage.module.scss
}

const FilterSelect = memo(({ s, label, icon, options }: IFilterSelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleSelect = useCallback((option: string) => {
        setSelected(option);
        setIsOpen(false);
    }, []);

    return (
        <div ref={dropdownRef} className={s.filterSelect}>
            <button
                onClick={handleToggle}
                className={`${s.filterBtn} ${isOpen || selected ? s.filterBtnActive : ""}`}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                {icon && <span style={{ color: "#4A3D8F", flexShrink: 0 }}>{icon}</span>}
                <span className={s.filterBtnText}>{selected || label}</span>
                <span className={`${s.filterChevron} ${isOpen ? s.filterChevronOpen : ""}`}>
                    <ChevronDown />
                </span>
            </button>
            {isOpen && (
                <div className={s.filterDropdown} role="listbox">
                    {options.map(opt => (
                        <div
                            key={opt}
                            className={`${s.filterOption} ${selected === opt ? s.filterOptionSelected : ""}`}
                            onClick={() => handleSelect(opt)}
                            role="option"
                            aria-selected={selected === opt}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

FilterSelect.displayName = 'FilterSelect';

export default FilterSelect;