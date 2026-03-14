import { ISVGBaseProps } from "@/types";
import { memo } from "react";

const TriangleSolid = memo(({ size = 28, color = "#3EC878" }: ISVGBaseProps) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <polygon points="14,2 26,24 2,24" fill={color} />
    </svg>
));

TriangleSolid.displayName = 'TriangleSolid';

export default TriangleSolid;