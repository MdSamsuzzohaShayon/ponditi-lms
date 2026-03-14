import { memo } from "react";

const SearchIcon = memo(() => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
));

SearchIcon.displayName = 'SearchIcon';

export default SearchIcon;