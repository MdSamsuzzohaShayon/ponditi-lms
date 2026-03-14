import { memo } from "react";

// Image accent SVGs
const AccentRingLg = memo(() => (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <circle cx="45" cy="45" r="40" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="8 5" />
      <circle cx="45" cy="45" r="28" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 6" />
    </svg>
  ));
  
  AccentRingLg.displayName = 'AccentRingLg';

  export default AccentRingLg;