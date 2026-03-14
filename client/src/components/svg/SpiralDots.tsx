import { memo, useMemo } from "react";

const SpiralDots = memo(({ color = "#4A3D8F" }: { color?: string }) => {
    const points = useMemo(() => {
      return Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const r = 8 + i * 4;
        return {
          x: 30 + r * Math.cos(a),
          y: 30 + r * Math.sin(a),
          r: Math.max(1, 3 - i * 0.2),
          opacity: 0.6 - i * 0.05,
          key: i
        };
      });
    }, []);
  
    return (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        {points.map(p => (
          <circle key={p.key} cx={p.x} cy={p.y} r={p.r} fill={color} opacity={p.opacity} />
        ))}
      </svg>
    );
  });
  
  SpiralDots.displayName = 'SpiralDots';


  export default SpiralDots;