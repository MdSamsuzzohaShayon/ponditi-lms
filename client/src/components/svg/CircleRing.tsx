import { ICircleRingProps } from "@/types";
import { memo } from "react";

const CircleRing = memo(({ size = 60, color = "#3EC878", strokeWidth = 3, dashed = false }: ICircleRingProps) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="26" stroke={color} strokeWidth={strokeWidth} fill="none"
        strokeDasharray={dashed ? "6 5" : undefined} />
      {!dashed && <circle cx="30" cy="30" r="18" stroke={color} strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 4" />}
    </svg>
  ));
  
  CircleRing.displayName = 'CircleRing';


  export default CircleRing;