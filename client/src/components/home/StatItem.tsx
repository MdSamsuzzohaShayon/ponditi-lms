// ─────────────────────────────────────────────
//  STATS BANNER COMPONENT
// ─────────────────────────────────────────────

import { IStatItemProps } from "@/types";
import { memo } from "react";


const StatItem = memo(({ s, number, label }: IStatItemProps) => (
    <div className={s.statItem}>
        <div className={s.statNumber}>{number}</div>
        <div className={s.statLabel}>{label}</div>
    </div>
));

StatItem.displayName = 'StatItem';

export default StatItem;