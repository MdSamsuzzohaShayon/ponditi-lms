// ─────────────────────────────────────────────
//  HERO CONTENT COMPONENT
// ─────────────────────────────────────────────

import { IFilterOption } from "@/types";
import React, { memo } from "react";
import FilterSelect from "./FilterSelect";
import SearchIcon from "../icons/SearchIcon";

interface HeroContentProps {
    s:Record<string, string>;
    filterData: IFilterOption[];
}

const HeroContent = memo(({ s, filterData }: HeroContentProps) => (
    <div className={s.heroContent}>
        <div className={`${s.helloBadge} ${s.fadeUp}`}>Hello! I'm Master</div>

        <h1 className={`${s.heroHeading} ${s.fadeUp} ${s.d1}`}>
            Promoting<br />
            <span className={s.headingAccent}>Insight</span> &amp; Personal<br />
            Excellence
        </h1>

        <p className={`${s.heroSub} ${s.fadeUp} ${s.d2}`}>
            Transformative education for those who learn differently — discover your path to brilliance.
        </p>

        <a href="#" className={`d-inline-flex align-items-center gap-2 text-decoration-none ${s.heroCta} ${s.fadeUp} ${s.d3}`}>
            <span className={s.ctaArrowCircle}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="7" x2="12" y2="7" />
                    <polyline points="8,3 12,7 8,11" />
                </svg>
            </span>
            <span>All Courses</span>
        </a>

        {/* Filter Bar */}
        <div className={`${s.filterBar} ${s.fadeUp} ${s.d4}`}>
            <div className={s.filterLabel}>Find Your Tutor</div>
            <div className={s.filterRow}>
                {filterData.map(f => (
                    <FilterSelect s={s} key={f.label} label={f.label} icon={f.icon} options={f.options} />
                ))}
                <button className={s.searchBtn}>
                    <SearchIcon />
                    Search
                </button>
            </div>
        </div>
    </div>
));

HeroContent.displayName = 'HeroContent';

export default HeroContent;