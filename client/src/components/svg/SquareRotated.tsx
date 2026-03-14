import { ISVGBaseProps } from "@/types";
import { memo } from "react";

const SquareRotated = memo(({ size = 24, color = "#3EC878" }: ISVGBaseProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2"
            stroke={color} strokeWidth="2.5" fill="none" transform="rotate(45 12 12)" />
    </svg>
));

SquareRotated.displayName = 'SquareRotated';


export default SquareRotated;