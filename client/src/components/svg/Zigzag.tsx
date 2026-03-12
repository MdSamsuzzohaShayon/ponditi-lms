import { memo } from "react";

const Zigzag = memo(() => (
    <svg width="96" height="64" viewBox="0 0 96 64" fill="none">
        <polyline points="0,54 24,10 48,54 72,10 96,54"
            stroke="#3EC878" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
));

Zigzag.displayName = 'Zigzag';

export default Zigzag;