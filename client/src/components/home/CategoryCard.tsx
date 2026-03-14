import { memo } from "react";

interface CategoryCardProps {
    icon: string;
    title: string;
    courses: number;
    color: string;
    s: Record<string, string>;
  }
  
  const CategoryCard = memo(({ s,icon, title, courses, color }: CategoryCardProps) => (
    <div className={s.categoryCard}>
      <div className={s.categoryIcon} style={{ background: color }}>{icon}</div>
      <h5 className={s.categoryTitle}>{title}</h5>
      <div className={s.categoryCourses}>{courses} Courses</div>
    </div>
  ));
  
  CategoryCard.displayName = 'CategoryCard';


  export default CategoryCard;