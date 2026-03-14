import { memo } from "react";

const ChevronDown = memo(() => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ));
  
  ChevronDown.displayName = 'ChevronDown';

  export default ChevronDown;