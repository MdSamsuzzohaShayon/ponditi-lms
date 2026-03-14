import { ISVGBaseProps } from "@/types";
import { memo } from "react";

const ArcShape = memo(({ size = 60, color = "#3EC878" }: ISVGBaseProps) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M10,50 Q10,10 50,10" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M18,50 Q18,18 50,18" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M26,50 Q26,26 50,26" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.25" />
    </svg>
  ));
  
  ArcShape.displayName = 'ArcShape';

  export default ArcShape;