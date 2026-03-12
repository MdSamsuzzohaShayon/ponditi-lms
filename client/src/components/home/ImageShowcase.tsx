// ─────────────────────────────────────────────
//  IMAGE SHOWCASE COMPONENT
// ─────────────────────────────────────────────

import { memo } from "react";
import AccentRingLg from "../svg/AccentRingLg";
import AccentRingSm from "../svg/AccentRingSm";
import AccentCross from "../svg/AccentCross";
import BookIcon from "../icons/BookIcon";
import AwardIcon from "../icons/AwardIcon";
import StarIcon from "../icons/StarIcon";

const ImageShowcase = memo(({s}: {s: Record<string, string>}) => (
    <div className={s.imageShowcase} aria-hidden="true">
      <div className={s.imageBgGreen} />
      <div className={s.imageBgPattern} />
      <div className={s.imageGradientOverlay} />
      <div className={s.imageScanLine} />
  
      <img
        src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=700&auto=format&fit=crop&q=85"
        alt="Instructor"
        className={s.instructorImg}
        loading="eager"
      />
  
      <div className={`${s.imageAccentRing} ${s.imageAccentRing1}`}><AccentRingLg /></div>
      <div className={`${s.imageAccentRing} ${s.imageAccentRing2}`}><AccentRingSm /></div>
      <div className={`${s.imageAccentRing} ${s.imageAccentRing3}`}><AccentCross /></div>
  
      <div className={s.expBadge}>
        <div className={s.expBadgeNum}>12+</div>
        <div className={s.expBadgeLabel}>Years<br />Expert</div>
      </div>
  
      <div className={s.imageStatsRibbon}>
        <div className={`${s.imageStatPill} d-flex align-items-center gap-2`}>
          <div className={s.imageStatIcon} style={{ background: "#E6FAF0" }}><BookIcon /></div>
          <div>
            <div className={s.imageStatNum}>480+</div>
            <div className={s.imageStatLabel}>Courses</div>
          </div>
        </div>
        <div className={`${s.imageStatPill} d-flex align-items-center gap-2`}>
          <div className={s.imageStatIcon} style={{ background: "#EEE9FF" }}><AwardIcon /></div>
          <div>
            <div className={s.imageStatNum}>98%</div>
            <div className={s.imageStatLabel}>Pass Rate</div>
          </div>
        </div>
        <div className={`${s.imageStatPill} d-flex align-items-center gap-2`}>
          <div className={s.imageStatIcon} style={{ background: "#FFF8E1" }}>
            <div className="d-flex gap-1">{[...Array(5)].map((_,i) => <StarIcon key={i}/>)}</div>
          </div>
          <div>
            <div className={s.imageStatNum}>4.9</div>
            <div className={s.imageStatLabel}>Rating</div>
          </div>
        </div>
      </div>
    </div>
  ));
  
  ImageShowcase.displayName = 'ImageShowcase';

  export default ImageShowcase;