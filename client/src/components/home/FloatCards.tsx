// ─────────────────────────────────────────────
//  FLOAT CARDS COMPONENT
// ─────────────────────────────────────────────

import { memo } from "react";
import PersonIcon from "../icons/PersonIcon";
import PersonPlusIcon from "../icons/PersonPlusIcon";
import CertIcon from "../icons/CertIcon";

const FloatCards = memo(({s}: {s: Record<string, string>}) => (
    <>
      <div className={`${s.floatCard} ${s.cardLearners} d-flex align-items-center gap-3`}>
        <div className={s.cardIconBox}><PersonIcon /></div>
        <div>
          <div className={s.cardBigNum}>240</div>
          <div className={s.cardSmLabel}>Active Learners</div>
        </div>
      </div>
  
      <div className={`${s.floatCard} ${s.cardStudents}`}>
        <div className="d-flex align-items-center gap-2 mb-2">
          <div className={`${s.cardIconBox} ${s.cardIconSm}`}><PersonPlusIcon /></div>
          <span className={s.cardSmLabel}>Total Students</span>
        </div>
        <div className={s.cardBigNum} style={{ fontSize: "1.9rem", marginBottom: 10 }}>1,265</div>
        <div className="d-flex align-items-center">
          {["women/44","men/32","women/68"].map((p,i)=>(
            <img key={i} src={`https://randomuser.me/api/portraits/${p}.jpg`} alt="" className={s.avatarImg} loading="lazy" />
          ))}
          <div className={s.avatarPlus}>+</div>
        </div>
      </div>
  
      <div className={`${s.floatCard} ${s.cardCertified} d-flex flex-column align-items-center justify-content-center`}>
        <CertIcon />
        <div className={s.certText}>Certified Online<br />Educator</div>
      </div>
    </>
  ));
  
  FloatCards.displayName = 'FloatCards';


  export default FloatCards;
  