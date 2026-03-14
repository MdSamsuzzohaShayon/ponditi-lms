import { memo } from "react";

const AccentCross = memo(() => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="14" y1="2" x2="14" y2="26" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="2" y1="14" x2="26" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
));

AccentCross.displayName = 'AccentCross';


export default AccentCross;