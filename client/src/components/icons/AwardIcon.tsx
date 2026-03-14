import { memo } from "react";

const AwardIcon = memo(() => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#4A3D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
));

AwardIcon.displayName = 'AwardIcon';

export default AwardIcon;