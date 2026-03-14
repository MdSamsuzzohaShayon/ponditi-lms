import { memo } from "react";

const ChevronLeft = memo(() => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#4A3D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
));

ChevronLeft.displayName = 'ChevronLeft';

export default ChevronLeft;