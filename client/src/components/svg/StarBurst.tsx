import { ISVGBaseProps } from "@/types";
import { memo, useMemo } from "react";

const StarBurst = memo(({ size = 32, color = "#3EC878" }: ISVGBaseProps) => {
    const lines = useMemo(() => {
        const angles = [0, 45, 90, 135];
        return angles.flatMap(a => [a, a + 180]).map((angle, i) => ({
            x2: 16 + 13 * Math.cos((angle * Math.PI) / 180),
            y2: 16 + 13 * Math.sin((angle * Math.PI) / 180),
            key: i
        }));
    }, []);

    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            {lines.map(line => (
                <line key={line.key} x1="16" y1="16"
                    x2={line.x2} y2={line.y2}
                    stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            ))}
            <circle cx="16" cy="16" r="3.5" fill={color} />
        </svg>
    );
});

StarBurst.displayName = 'StarBurst';

export default StarBurst;