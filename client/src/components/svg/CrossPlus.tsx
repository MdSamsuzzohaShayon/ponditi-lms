import { ISVGBaseProps } from "@/types";
import { memo } from "react";

const CrossPlus = memo(({ size = 36, color = "#4A3D8F" }: ISVGBaseProps) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <line x1="18" y1="4" x2="18" y2="32" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="4"  y1="18" x2="32" y2="18" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ));
  
  CrossPlus.displayName = 'CrossPlus';

  export default CrossPlus;