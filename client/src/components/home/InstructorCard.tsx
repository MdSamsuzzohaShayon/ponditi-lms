import { memo } from "react";

interface InstructorCardProps {
    name: string;
    role: string;
    students: string;
    courses: number;
    image: string;
    subjects: string[];
    s: Record<string, string>;
  }
  
  const InstructorCard = memo(({ s, name, role, students, courses, image, subjects }: InstructorCardProps) => (
    <div className={s.instructorCard}>
      <div className={s.instructorCardImageWrapper}>
        <img src={image} alt={name} className={s.instructorCardImage} loading="lazy" />
        <div className={s.instructorCardSocial}>
          <a href="#" className={s.socialIcon} aria-label={`${name}'s Facebook`}>f</a>
          <a href="#" className={s.socialIcon} aria-label={`${name}'s LinkedIn`}>in</a>
          <a href="#" className={s.socialIcon} aria-label={`${name}'s Twitter`}>t</a>
        </div>
      </div>
      <h4 className={s.instructorCardName}>{name}</h4>
      <div className={s.instructorCardRole}>{role}</div>
      <div className={s.instructorCardSubjects}>
        {subjects.map((subject, i) => (
          <span key={i} className={s.subjectTag}>{subject}</span>
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
        <div>
          <div className={s.instructorStatNum}>{students}+</div>
          <div className={s.instructorStatLabel}>Students</div>
        </div>
        <div>
          <div className={s.instructorStatNum}>{courses}</div>
          <div className={s.instructorStatLabel}>Courses</div>
        </div>
      </div>
    </div>
  ));
  
  InstructorCard.displayName = 'InstructorCard';


  export default InstructorCard;