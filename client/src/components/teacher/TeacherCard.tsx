// components/teacher/TeacherCard.tsx
import { memo } from 'react';
import Link from 'next/link';
import { ICustomer } from '@/types';
import StarIcon from '../icons/StarIcon';
import ChevronRight from '../icons/ChevronRight';

interface TeacherCardProps {
  teacher: ICustomer;
  s: Record<string, string>;
}

// Helper function to calculate average rating (you'll need to implement this based on your data structure)
const calculateAverageRating = (teacher: ICustomer): number => {
  // If you have a ratings array in your customer object, calculate average here
  // For now, returning a default or random value for demo
  return 4.5;
};

// Helper function to get rate based on tuition style preference
const getTeacherRate = (teacher: ICustomer): number => {
  // You can determine which rate to show based on teacher's preferred tuition style
  if (teacher.tutionplace === 'ONLINE' && teacher.ol_rate) {
    return teacher.ol_rate;
  } else if (teacher.tutionplace === 'SL' && teacher.sl_rate) {
    return teacher.sl_rate;
  } else if (teacher.tutionplace === 'TL' && teacher.tl_rate) {
    return teacher.tl_rate;
  }
  // Return the highest available rate as fallback
  return Math.max(teacher.tl_rate || 0, teacher.sl_rate || 0, teacher.ol_rate || 0);
};

// Helper function to get specialties/subjects
const getTeacherSpecialties = (teacher: ICustomer): string[] => {
  // If you have subjects/tuitionmedium as arrays or comma-separated strings
  if (teacher.tuitionmedium) {
    return teacher.tuitionmedium.split(',').map(s => s.trim());
  }
  // Return a default based on profession or empty array
  return teacher.profession ? [teacher.profession] : [];
};

const TeacherCard = memo(({ teacher, s }: TeacherCardProps) => {
  const averageRating = calculateAverageRating(teacher);
  const teacherRate = getTeacherRate(teacher);
  const specialties = getTeacherSpecialties(teacher);
  
  // Calculate experience years (if experience is stored as a string like "5 years" or just a number)
  const experienceYears = teacher.experience 
    ? parseInt(teacher.experience) || 0 
    : 0;
  
  // Determine location display
  const locationDisplay = teacher.district || teacher.presentaddress || 'Location not specified';

  return (
    <div className={s.teacherCard}>
      <div className={s.teacherImageWrapper}>
        <img
          src={teacher.image || '/images/teacher-placeholder.jpg'}
          alt={teacher.name || 'Teacher'}
          className={s.teacherImage}
          loading="lazy"
        />
        {teacher.isVerified && (
          <span className={s.teacherBadge}>✓ Verified</span>
        )}
        {teacher.isAvailable && (
          <span className={`${s.teacherBadge} ${s.availableBadge}`}>Available</span>
        )}
      </div>
      
      <div className={s.teacherContent}>
        <div className={s.teacherHeader}>
          <div>
            <h3 className={s.teacherName}>{teacher.name || 'Teacher'}</h3>
            <p className={s.teacherTitle}>{locationDisplay}</p>
            {teacher.institution && (
              <p className={s.teacherInstitution}>{teacher.institution}</p>
            )}
          </div>
          <div className={s.teacherRating}>
            <StarIcon />
            <span>{averageRating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className={s.teacherSpecialties}>
          {specialties.slice(0, 3).map((specialty, index) => (
            <span key={index} className={s.specialtyTag}>
              {specialty}
            </span>
          ))}
          {specialties.length > 3 && (
            <span className={s.specialtyTag}>+{specialties.length - 3}</span>
          )}
        </div>
        
        <div className={s.teacherStats}>
          <div className={s.statItem}>
            <div className={s.statValue}>{teacher.totalHours || 0}+</div>
            <div className={s.statLabel}>Hours</div>
          </div>
          <div className={s.statItem}>
            <div className={s.statValue}>{experienceYears}</div>
            <div className={s.statLabel}>Years Exp.</div>
          </div>
          <div className={s.statItem}>
            <div className={s.statValue}>{teacher.age || 'N/A'}</div>
            <div className={s.statLabel}>Age</div>
          </div>
        </div>
        
        <div className={s.teacherFooter}>
          <div className={s.teacherPrice}>
            ৳{teacherRate} <span>/ hour</span>
          </div>
          <Link href={`/teacher/${teacher.id}`} className={s.viewProfileBtn}>
            View Profile
            <ChevronRight />
          </Link>
        </div>

        {/* Tuition Style Badges */}
        <div className={s.tuitionStyles}>
          {teacher.tutionplace === 'ONLINE' && (
            <span className={s.tuitionStyleBadge}>Online</span>
          )}
          {teacher.tutionplace === 'SL' && (
            <span className={s.tuitionStyleBadge}>Student's Location</span>
          )}
          {teacher.tutionplace === 'TL' && (
            <span className={s.tuitionStyleBadge}>Teacher's Location</span>
          )}
        </div>
      </div>
    </div>
  );
});

TeacherCard.displayName = 'TeacherCard';

export default TeacherCard;