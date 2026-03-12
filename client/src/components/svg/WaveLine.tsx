import { memo } from "react";

const WaveLine = memo(({ color = "#3EC878" }: { color?: string }) => (
    <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
      <path d="M0,15 C20,5 40,25 60,15 C80,5 100,25 120,15"
        stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  ));
  
  WaveLine.displayName = 'WaveLine';


  export default WaveLine;