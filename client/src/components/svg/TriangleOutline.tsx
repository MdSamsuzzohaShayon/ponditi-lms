import { ISVGBaseProps } from "@/types";
import { memo } from "react";

const TriangleOutline = memo(({ size = 32, color = "#3EC878" }: ISVGBaseProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <polygon points="16,2 30,28 2,28" stroke={color} strokeWidth="3" fill="none" strokeLinejoin="round" />
    </svg>
));

TriangleOutline.displayName = 'TriangleOutline';


export default TriangleOutline;