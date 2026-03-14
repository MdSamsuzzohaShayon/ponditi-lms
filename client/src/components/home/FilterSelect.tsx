// components/search/FilterSelect.tsx
import { JSX, memo, useCallback, useEffect, useRef, useState } from "react";
import ChevronDown from "../icons/ChevronDown";

interface FilterOption {
  id: string | number;
  name: string;
}

interface IFilterSelectProps {
  label: string;
  icon: JSX.Element | null;
  options: FilterOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  s: Record<string, string>;
}

const FilterSelect = memo(({ s, label, icon, options, value, onChange }: IFilterSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<FilterOption | null>(
    options.find(opt => opt.id === value) || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected when value changes externally
  useEffect(() => {
    const newSelected = options.find(opt => opt.id === value);
    setSelected(newSelected || null);
  }, [value, options]);

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

  const handleSelect = useCallback((option: FilterOption) => {
    setSelected(option);
    onChange?.(option.id);
    setIsOpen(false);
  }, [onChange]);

  return (
    <div ref={dropdownRef} className={s.filterSelect}>
      <button
        onClick={handleToggle}
        className={`${s.filterBtn} ${isOpen || selected ? s.filterBtnActive : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {icon && <span style={{ color: "#4A3D8F", flexShrink: 0 }}>{icon}</span>}
        <span className={s.filterBtnText}>{selected?.name || label}</span>
        <span className={`${s.filterChevron} ${isOpen ? s.filterChevronOpen : ""}`}>
          <ChevronDown />
        </span>
      </button>
      {isOpen && (
        <div className={s.filterDropdown} role="listbox">
          {options.map(opt => (
            <div
              key={opt.id}
              className={`${s.filterOption} ${selected?.id === opt.id ? s.filterOptionSelected : ""}`}
              onClick={() => handleSelect(opt)}
              role="option"
              aria-selected={selected?.id === opt.id}
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

FilterSelect.displayName = 'FilterSelect';

export default FilterSelect;