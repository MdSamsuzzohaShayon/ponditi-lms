// components/LocationAutocomplete.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import ChevronDown from "../icons/ChevronDown";

interface LocationAutocompleteProps {
  onLocationChange: (location: string | null) => void;
  placeholder?: string;
  initialValue?: string;
  s: Record<string, string>; // style from HomePage.module.scss - same as FilterSelect
}

const LocationAutocomplete = ({ onLocationChange, placeholder = "Location", initialValue = "", s }: LocationAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const autocompleteInstance = useRef<GeocoderAutocomplete | null>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize Geoapify autocomplete
  useEffect(() => {
    if (!autocompleteRef.current || autocompleteInstance.current) {
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
    if (!apiKey) {
      console.error("Geoapify API key is missing");
      return;
    }

    // Clear any existing content
    autocompleteRef.current.innerHTML = '';

    // Create the autocomplete instance
    autocompleteInstance.current = new GeocoderAutocomplete(
      autocompleteRef.current,
      apiKey,
      {
        placeholder: placeholder,
        skipIcons: true,
        debounceDelay: 300,
        // Position the dropdown manually
        // position: 'bottom',
      }
    );

    // Style the input to match your filter button
    const inputElement = autocompleteRef.current.querySelector('input');
    if (inputElement) {
      // Add your filter button classes to the input
      inputElement.className = s.filterBtn;
      inputElement.classList.add(s.locationInput);
      
      // Set initial value if provided
      if (initialValue) {
        inputElement.value = initialValue;
        setSelected(initialValue);
      }

      // Handle focus to open dropdown
      inputElement.addEventListener('focus', () => {
        setIsOpen(true);
      });

      // Handle input to track value
      inputElement.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        if (!target.value) {
          setSelected(null);
          onLocationChange(null);
        }
      });
    }

    // Style the dropdown to match your filter dropdown
    const style = document.createElement('style');
    style.textContent = `
      .geoapify-autocomplete-items {
        border: 1.5px solid rgba(74, 61, 143, 0.1) !important;
        border-radius: 14px !important;
        box-shadow: 0 12px 40px rgba(74, 61, 143, 0.18) !important;
        overflow: hidden !important;
        margin-top: 8px !important;
        background: white !important;
        font-family: 'Cabinet Grotesk', sans-serif !important;
      }
      
      .geoapify-autocomplete-item {
        padding: 10px 16px !important;
        font-size: 13px !important;
        cursor: pointer !important;
        color: #1A1A2B !important;
        font-weight: 500 !important;
        transition: background 0.15s !important;
        border-bottom: 1px solid rgba(74, 61, 143, 0.06) !important;
      }
      
      .geoapify-autocomplete-item:last-child {
        border-bottom: none !important;
      }
      
      .geoapify-autocomplete-item:hover {
        background: #F8F7FF !important;
        color: #4A3D8F !important;
      }
      
      .geoapify-autocomplete-item.selected {
        background: #EEEAFF !important;
        color: #4A3D8F !important;
        font-weight: 700 !important;
      }
      
      .geoapify-close-button {
        display: none !important;
      }
      
      .geoapify-autocomplete-input {
        padding-right: 40px !important;
      }
    `;
    document.head.appendChild(style);

    // Listen for selection
    autocompleteInstance.current.on('select', (location) => {
      if (location && location.properties) {
        const selectedLocationName = location.properties.formatted || location.properties.name || location.properties.city;
        setSelected(selectedLocationName);
        
        // Update input value
        if (inputElement) {
          inputElement.value = selectedLocationName;
        }
        
        onLocationChange(selectedLocationName);
        setIsOpen(false);
      }
    });

    // Listen for suggestions to show/hide dropdown indicator
    autocompleteInstance.current.on('suggestions', (suggestions) => {
      if (suggestions && suggestions.length > 0) {
        // Dropdown will show automatically
      }
    });

    return () => {
      if (autocompleteInstance.current) {
        // Clean up
        if (autocompleteRef.current) {
          autocompleteRef.current.innerHTML = '';
        }
        autocompleteInstance.current = null;
      }
      style.remove();
    };
  }, [placeholder, initialValue, s, onLocationChange]);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
    const input = autocompleteRef.current?.querySelector('input');
    if (input && !isOpen) {
      input.focus();
    }
  }, [isOpen]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(null);
    onLocationChange(null);
    
    const input = autocompleteRef.current?.querySelector('input');
    if (input) {
      input.value = '';
      input.focus();
    }
  }, [onLocationChange]);

  return (
    <div ref={containerRef} className={s.filterSelect}>
      <div 
        className={s.filterBtnWrapper}
        onClick={handleToggle}
        style={{ position: 'relative' }}
      >
        {/* Geoapify autocomplete container - this will render the input */}
        <div 
          ref={autocompleteRef} 
          className={`${s.locationAutocomplete} ${isOpen ? s.locationAutocompleteOpen : ''}`}
        />
        
        {/* Chevron icon positioned absolutely */}
        <span 
          className={`${s.filterChevron} ${isOpen ? s.filterChevronOpen : ''}`}
          style={{ 
            position: 'absolute', 
            right: '14px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          <ChevronDown />
        </span>
        
        {/* Clear button (optional) */}
        {selected && (
          <button 
            className={s.locationClearBtn}
            onClick={handleClear}
            aria-label="Clear location"
            style={{
              position: 'absolute',
              right: '40px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#999',
              zIndex: 2,
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              padding: 0,
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationAutocomplete;