import { ISVGBaseProps } from "@/types";
import { memo } from "react";

const OrbitRing = memo(({ size = 80, color = "#3EC878" }: ISVGBaseProps) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="40" rx="36" ry="16" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
      <ellipse cx="40" cy="40" rx="36" ry="16" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(60 40 40)" />
      <ellipse cx="40" cy="40" rx="36" ry="16" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(120 40 40)" />
      <circle cx="40" cy="40" r="5" fill={color} opacity="0.7" />
    </svg>
  ));
  
  OrbitRing.displayName = 'OrbitRing';

  export default OrbitRing;