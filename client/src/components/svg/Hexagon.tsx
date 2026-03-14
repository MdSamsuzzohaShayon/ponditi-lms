import { ISVGBaseProps } from "@/types";
import { memo } from "react";

const Hexagon = memo(({ size = 40, color = "#4A3D8F" }: ISVGBaseProps) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <polygon points="20,2 36,11 36,29 20,38 4,29 4,11"
            stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
        <polygon points="20,10 28,15 28,25 20,30 12,25 12,15"
            stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.4" />
    </svg>
));

Hexagon.displayName = 'Hexagon';

export default Hexagon;