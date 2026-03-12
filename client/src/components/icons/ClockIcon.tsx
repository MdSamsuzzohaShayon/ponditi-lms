import { memo } from "react";

const ClockIcon = memo(() => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
));

ClockIcon.displayName = 'ClockIcon';


export default ClockIcon;