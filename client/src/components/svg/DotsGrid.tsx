import { IDotsGridProps } from "@/types";
import { memo, useMemo } from "react";

const DotsGrid = memo(({ color = "#4A3D8F", cols = 6, rows = 6, gap = 14, dotSize = 5 }: IDotsGridProps) => {
    const dots = useMemo(() => {
        const dotArray = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                dotArray.push(
                    <circle key={`${r}-${c}`}
                        cx={c * gap + dotSize} cy={r * gap + dotSize}
                        r={dotSize / 2} fill={color} opacity="0.5"
                    />
                );
            }
        }
        return dotArray;
    }, [color, cols, rows, gap, dotSize]);

    const w = (cols - 1) * gap + dotSize * 2;
    const h = (rows - 1) * gap + dotSize * 2;

    return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>{dots}</svg>;
});

DotsGrid.displayName = 'DotsGrid';


export default DotsGrid;