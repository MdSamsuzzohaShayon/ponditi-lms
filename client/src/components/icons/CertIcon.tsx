import { memo } from "react";

const CertIcon = memo(() => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 8h10M7 12h6" />
    </svg>
));

CertIcon.displayName = 'CertIcon';

export default CertIcon;