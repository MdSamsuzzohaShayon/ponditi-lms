import { memo } from "react";

const ChevronRight = memo(() => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#4A3D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
));

ChevronRight.displayName = 'ChevronRight';

export default ChevronRight;