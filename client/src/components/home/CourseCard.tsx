// ─────────────────────────────────────────────
//  CARD COMPONENTS
// ─────────────────────────────────────────────

import { memo } from "react";
import UsersIcon from "../icons/UsersIcon";
import StarIcon from "../icons/StarIcon";

interface ICourseCardProps {
    title: string;
    students: string;
    rating: number;
    price: number;
    image: string;
    instructor: {
        name: string;
        avatar: string;
    };
    level: string;
    s: Record<string, string>
}

const CourseCard = memo(({ s, title, students, rating, price, image, instructor, level }: ICourseCardProps) => (
    <div className={s.courseCard}>
        <div className={s.courseImageWrapper}>
            <img src={image} alt={title} className={s.courseImage} loading="lazy" />
            <div className={s.courseLevel}>{level}</div>
        </div>
        <div className={s.courseContent}>
            <div className="d-flex align-items-center gap-2 mb-2">
                <img src={instructor.avatar} alt={instructor.name} className={s.courseInstructorAvatar} loading="lazy" />
                <span className={s.courseInstructorName}>{instructor.name}</span>
            </div>
            <h4 className={s.courseTitle}>{title}</h4>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-1">
                        <UsersIcon />
                        <span className={s.courseStats}>{students}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <StarIcon />
                        <span className={s.courseStats}>{rating}</span>
                    </div>
                </div>
                <span className={s.coursePrice}>${price}</span>
            </div>
        </div>
    </div>
));

CourseCard.displayName = 'CourseCard';


export default CourseCard;