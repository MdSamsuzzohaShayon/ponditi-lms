import { ISVGBaseProps } from "@/types";
import { memo } from "react";

const Diamond = memo(({ size = 28, color = "#4A3D8F" }: ISVGBaseProps) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <polygon points="14,1 27,14 14,27 1,14" stroke={color} strokeWidth="2" fill="none" />
      <polygon points="14,7 21,14 14,21 7,14" fill={color} opacity="0.3" />
    </svg>
  ));
  
  Diamond.displayName = 'Diamond';

  export default Diamond;