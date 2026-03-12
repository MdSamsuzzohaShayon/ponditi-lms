import { useState, useEffect, useRef } from "react";
import s from "@/styles/HomePage.module.scss";

// ─────────────────────────────────────────────
//  SVG DECORATIONS (keeping all your existing SVGs)
// ─────────────────────────────────────────────

// ... (all your existing SVG components remain exactly the same)
const Zigzag = () => (
  <svg width="96" height="64" viewBox="0 0 96 64" fill="none">
    <polyline points="0,54 24,10 48,54 72,10 96,54"
      stroke="#3EC878" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TriangleOutline = ({ size = 32, color = "#3EC878" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <polygon points="16,2 30,28 2,28" stroke={color} strokeWidth="3" fill="none" strokeLinejoin="round" />
  </svg>
);

const TriangleSolid = ({ size = 28, color = "#3EC878" }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <polygon points="14,2 26,24 2,24" fill={color} />
  </svg>
);

const DotsGrid = ({ color = "#4A3D8F", cols = 6, rows = 6, gap = 14, dotSize = 5 }) => {
  const dots = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      dots.push(
        <circle key={`${r}-${c}`}
          cx={c * gap + dotSize} cy={r * gap + dotSize}
          r={dotSize / 2} fill={color} opacity="0.5"
        />
      );
  const w = (cols - 1) * gap + dotSize * 2, h = (rows - 1) * gap + dotSize * 2;
  return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>{dots}</svg>;
};

const CircleRing = ({ size = 60, color = "#3EC878", strokeWidth = 3, dashed = false }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="26" stroke={color} strokeWidth={strokeWidth} fill="none"
      strokeDasharray={dashed ? "6 5" : undefined} />
    {!dashed && <circle cx="30" cy="30" r="18" stroke={color} strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 4" />}
  </svg>
);

const CrossPlus = ({ size = 36, color = "#4A3D8F" }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <line x1="18" y1="4" x2="18" y2="32" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="4"  y1="18" x2="32" y2="18" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

const StarBurst = ({ size = 32, color = "#3EC878" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {[0,45,90,135].flatMap(a=>[a,a+180]).map((angle, i) => (
      <line key={i} x1="16" y1="16"
        x2={16 + 13 * Math.cos((angle * Math.PI) / 180)}
        y2={16 + 13 * Math.sin((angle * Math.PI) / 180)}
        stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    ))}
    <circle cx="16" cy="16" r="3.5" fill={color} />
  </svg>
);

const SquareRotated = ({ size = 24, color = "#3EC878" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2"
      stroke={color} strokeWidth="2.5" fill="none" transform="rotate(45 12 12)" />
  </svg>
);

const WaveLine = ({ color = "#3EC878" }) => (
  <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
    <path d="M0,15 C20,5 40,25 60,15 C80,5 100,25 120,15"
      stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

const Hexagon = ({ size = 40, color = "#4A3D8F" }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <polygon points="20,2 36,11 36,29 20,38 4,29 4,11"
      stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
    <polygon points="20,10 28,15 28,25 20,30 12,25 12,15"
      stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.4" />
  </svg>
);

const OrbitRing = ({ size = 80, color = "#3EC878" }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="40" rx="36" ry="16" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
    <ellipse cx="40" cy="40" rx="36" ry="16" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(60 40 40)" />
    <ellipse cx="40" cy="40" rx="36" ry="16" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(120 40 40)" />
    <circle cx="40" cy="40" r="5" fill={color} opacity="0.7" />
  </svg>
);

const Diamond = ({ size = 28, color = "#4A3D8F" }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <polygon points="14,1 27,14 14,27 1,14" stroke={color} strokeWidth="2" fill="none" />
    <polygon points="14,7 21,14 14,21 7,14" fill={color} opacity="0.3" />
  </svg>
);

const ArcShape = ({ size = 60, color = "#3EC878" }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M10,50 Q10,10 50,10" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M18,50 Q18,18 50,18" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
    <path d="M26,50 Q26,26 50,26" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.25" />
  </svg>
);

const SpiralDots = ({ color = "#4A3D8F" }) => {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2, r = 8 + i * 4;
    return { x: 30 + r * Math.cos(a), y: 30 + r * Math.sin(a), r: Math.max(1, 3 - i * 0.2) };
  });
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={color} opacity={0.6 - i * 0.05} />)}
    </svg>
  );
};

// Image accent SVGs
const AccentRingLg = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
    <circle cx="45" cy="45" r="40" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="8 5" />
    <circle cx="45" cy="45" r="28" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 6" />
  </svg>
);

const AccentRingSm = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5 4" />
  </svg>
);

const AccentCross = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <line x1="14" y1="2" x2="14" y2="26" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="2"  y1="14" x2="26" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ─────────────────────────────────────────────
//  ICONS (keeping all your existing icons)
// ─────────────────────────────────────────────

const BrandLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="12" fill="#4A3D8F" />
    <path d="M20 8L32 14V22L20 32L8 22V14L20 8Z" stroke="white" strokeWidth="2" fill="none" />
    <path d="M20 15L25 18V22L20 27L15 22V18L20 15Z" fill="white" />
    <circle cx="20" cy="20" r="2" fill="#3EC878" />
  </svg>
);

const PersonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#4A3D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PersonPlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#4A3D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

const CertIcon = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4M7 8h10M7 12h6" />
  </svg>
);

const LocationIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronDown = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#F5C842" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#3EC878" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const AwardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#4A3D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

// New Icons for additional sections
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const VideoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m9 8 6 4-6 4V8z" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4A3D8F" strokeWidth="1.5">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

// ─────────────────────────────────────────────
//  FILTER SELECT (keeping your existing component)
// ─────────────────────────────────────────────

const FilterSelect = ({ label, icon, options }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={s.filterSelect}>
      <button onClick={() => setOpen(v => !v)}
        className={`${s.filterBtn} ${open || selected ? s.filterBtnActive : ""}`}>
        {icon && <span style={{ color: "#4A3D8F", flexShrink: 0 }}>{icon}</span>}
        <span className={s.filterBtnText}>{selected || label}</span>
        <span className={`${s.filterChevron} ${open ? s.filterChevronOpen : ""}`}>
          <ChevronDown />
        </span>
      </button>
      {open && (
        <div className={s.filterDropdown}>
          {options.map(opt => (
            <div key={opt}
              className={`${s.filterOption} ${selected === opt ? s.filterOptionSelected : ""}`}
              onClick={() => { setSelected(opt); setOpen(false); }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
//  NEW COMPONENTS
// ─────────────────────────────────────────────

// Course Card Component
const CourseCard = ({ title, students, rating, price, image, instructor, level }) => (
  <div className={s.courseCard}>
    <div className={s.courseImageWrapper}>
      <img src={image} alt={title} className={s.courseImage} />
      <div className={s.courseLevel}>{level}</div>
    </div>
    <div className={s.courseContent}>
      <div className="d-flex align-items-center gap-2 mb-2">
        <img src={instructor.avatar} alt={instructor.name} className={s.courseInstructorAvatar} />
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
);

// Testimonial Card Component
const TestimonialCard = ({ quote, author, role, avatar, rating }) => (
  <div className={s.testimonialCard}>
    <QuoteIcon />
    <p className={s.testimonialQuote}>{quote}</p>
    <div className="d-flex align-items-center gap-2 mb-2">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
    <div className="d-flex align-items-center gap-3">
      <img src={avatar} alt={author} className={s.testimonialAvatar} />
      <div>
        <div className={s.testimonialAuthor}>{author}</div>
        <div className={s.testimonialRole}>{role}</div>
      </div>
    </div>
  </div>
);

// Instructor Card Component
const InstructorCard = ({ name, role, students, courses, image, subjects }) => (
  <div className={s.instructorCard}>
    <div className={s.instructorCardImageWrapper}>
      <img src={image} alt={name} className={s.instructorCardImage} />
      <div className={s.instructorCardSocial}>
        <a href="#" className={s.socialIcon}>f</a>
        <a href="#" className={s.socialIcon}>in</a>
        <a href="#" className={s.socialIcon}>t</a>
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
);

// Category Card Component
const CategoryCard = ({ icon, title, courses, color }) => (
  <div className={s.categoryCard}>
    <div className={s.categoryIcon} style={{ background: color }}>{icon}</div>
    <h5 className={s.categoryTitle}>{title}</h5>
    <div className={s.categoryCourses}>{courses} Courses</div>
  </div>
);

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('popular');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filterData = [
    { label: "Location",      icon: <LocationIcon />, options: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Remote"] },
    { label: "Tuition Style", icon: null,              options: ["One-to-One", "Group Tuition", "Online Live", "Recorded", "Hybrid"] },
    { label: "Medium",        icon: null,              options: ["Bangla", "English", "Bangla & English"] },
    { label: "Class",         icon: null,              options: ["Class 1–5", "Class 6–8", "SSC (9–10)", "HSC (11–12)", "University", "Skills"] },
    { label: "Subject",       icon: null,              options: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Bangla", "ICT", "All Subjects"] },
  ];

  // Sample data for new sections
  const categories = [
    { icon: "📐", title: "Mathematics", courses: 156, color: "rgba(62,200,120,0.1)" },
    { icon: "🔬", title: "Science", courses: 142, color: "rgba(74,61,143,0.1)" },
    { icon: "💻", title: "Programming", courses: 98, color: "rgba(245,200,66,0.1)" },
    { icon: "🌍", title: "Languages", courses: 87, color: "rgba(62,200,120,0.1)" },
    { icon: "🎨", title: "Arts", courses: 64, color: "rgba(74,61,143,0.1)" },
    { icon: "📊", title: "Business", courses: 112, color: "rgba(245,200,66,0.1)" },
  ];

  const popularCourses = [
    {
      title: "Advanced Mathematics",
      students: "1.2k",
      rating: 4.9,
      price: 89,
      level: "Advanced",
      instructor: { name: "Dr. Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format"
    },
    {
      title: "Physics Fundamentals",
      students: "890",
      rating: 4.8,
      price: 69,
      level: "Beginner",
      instructor: { name: "Prof. James Wilson", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&auto=format"
    },
    {
      title: "English Literature",
      students: "2.1k",
      rating: 4.9,
      price: 79,
      level: "Intermediate",
      instructor: { name: "Emma Thompson", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format"
    },
    {
      title: "Web Development",
      students: "3.4k",
      rating: 5.0,
      price: 99,
      level: "All Levels",
      instructor: { name: "Alex Rivera", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format"
    }
  ];

  const testimonials = [
    {
      quote: "The personalized approach transformed my understanding of complex topics. My tutor adapted perfectly to my learning style.",
      author: "Priya Rahman",
      role: "Medical Student",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      rating: 5
    },
    {
      quote: "Found the perfect mentor for my programming journey. The one-on-one sessions were invaluable for my career growth.",
      author: "Tanvir Hasan",
      role: "Software Engineer",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 5
    },
    {
      quote: "My daughter's confidence in mathematics has skyrocketed. The tutors are patient, knowledgeable, and truly caring.",
      author: "Farida Begum",
      role: "Parent",
      avatar: "https://randomuser.me/api/portraits/women/90.jpg",
      rating: 5
    }
  ];

  const instructors = [
    {
      name: "Dr. Sarah Chen",
      role: "Mathematics Expert",
      students: "2.5k",
      courses: 12,
      subjects: ["Calculus", "Algebra", "Statistics"],
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Prof. James Wilson",
      role: "Physics Specialist",
      students: "1.8k",
      courses: 8,
      subjects: ["Mechanics", "Quantum", "Thermodynamics"],
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Emma Thompson",
      role: "Literature Professor",
      students: "2.1k",
      courses: 10,
      subjects: ["Poetry", "Prose", "Drama"],
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "Alex Rivera",
      role: "Tech Lead",
      students: "3.2k",
      courses: 15,
      subjects: ["React", "Python", "Node.js"],
      image: "https://randomuser.me/api/portraits/men/46.jpg"
    }
  ];

  return (
    <div className={s.pageRoot}>

      {/* ══════════════════════ NAVBAR (your existing navbar) */}
      <nav className={`${s.navbar} ${scrolled ? s.navScrolled : ""}`}>
        <div className="container-xl px-4 px-lg-5">
          <div className="d-flex align-items-center justify-content-between">
            <a href="#" className={`d-flex align-items-center gap-2 text-decoration-none ${s.navBrand}`}>
              <BrandLogo />
              <span>Educamb</span>
            </a>

            <ul className={`d-none d-lg-flex align-items-center list-unstyled mb-0 ${s.navLinks}`}>
              {[
                { label: "Home",    chevron: "▲", active: true  },
                { label: "About",   chevron: null               },
                { label: "Courses", chevron: "▾"                },
                { label: "Blog",    chevron: "▾"                },
                { label: "Contact", chevron: null               },
              ].map(({ label, chevron, active }) => (
                <li key={label}>
                  <a href="#" className={`${s.navLink} ${active ? s.navLinkActive : ""} d-flex align-items-center gap-1`}>
                    {label}{chevron && <span className={s.chevron}>{chevron}</span>}
                  </a>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center gap-3">
              <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="User" className={s.navAvatar} />
              <div className={`${s.menuLines} d-lg-none`}><span /><span /></div>
              <a href="#" className={`d-none d-md-flex align-items-center gap-2 text-decoration-none ${s.navReg}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6"  x2="21" y2="6"  />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="15" y2="18" />
                </svg>
                Student Registration
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════════════ HERO SECTION (your existing hero) */}
      <section className={s.hero}>

        <div className={s.ambientOrb1} aria-hidden="true" />
        <div className={s.ambientOrb2} aria-hidden="true" />

        <span className={`${s.bgWord} ${s.bgWordCareer}`}   aria-hidden="true">career</span>
        <span className={`${s.bgWord} ${s.bgWordBusiness}`} aria-hidden="true">business</span>

        {/* Decorations */}
        <div className={`${s.deco} ${s.decoZigzag}`}        aria-hidden="true"><Zigzag /></div>
        <div className={`${s.deco} ${s.decoTriTop}`}         aria-hidden="true"><TriangleOutline size={30} /></div>
        <div className={`${s.deco} ${s.decoTriMid}`}         aria-hidden="true"><TriangleSolid size={20} /></div>
        <div className={`${s.deco} ${s.decoTriRight}`}       aria-hidden="true"><TriangleSolid size={28} color="rgba(62,200,120,0.5)" /></div>
        <div className={`${s.deco} ${s.decoTriBottomRight}`} aria-hidden="true"><TriangleSolid size={24} color="rgba(74,61,143,0.4)" /></div>
        <div className={`${s.deco} ${s.decoDotsPurple}`}     aria-hidden="true"><DotsGrid color="#4A3D8F" cols={5} rows={5} /></div>
        <div className={`${s.deco} ${s.decoDotsGreen}`}      aria-hidden="true"><DotsGrid color="#3EC878" cols={7} rows={7} gap={15} /></div>
        <div className={`${s.deco} ${s.decoRingTopLeft}`}    aria-hidden="true"><CircleRing size={80} color="#3EC878" strokeWidth={2} /></div>
        <div className={`${s.deco} ${s.decoRingBottom}`}     aria-hidden="true"><CircleRing size={56} color="#4A3D8F" strokeWidth={2} dashed /></div>
        <div className={`${s.deco} ${s.decoCrossLeft}`}      aria-hidden="true"><CrossPlus size={30} color="rgba(74,61,143,0.28)" /></div>
        <div className={`${s.deco} ${s.decoCrossRight}`}     aria-hidden="true"><CrossPlus size={26} color="rgba(62,200,120,0.4)" /></div>
        <div className={`${s.deco} ${s.decoStar}`}           aria-hidden="true"><StarBurst size={30} color="rgba(62,200,120,0.65)" /></div>
        <div className={`${s.deco} ${s.decoSquare}`}         aria-hidden="true"><SquareRotated size={24} color="rgba(74,61,143,0.32)" /></div>
        <div className={`${s.deco} ${s.decoWave}`}           aria-hidden="true"><WaveLine color="rgba(62,200,120,0.35)" /></div>
        <div className={`${s.deco} ${s.decoHexLeft}`}        aria-hidden="true"><Hexagon size={44} color="rgba(74,61,143,0.25)" /></div>
        <div className={`${s.deco} ${s.decoArcTop}`}         aria-hidden="true"><ArcShape size={60} color="rgba(62,200,120,0.35)" /></div>
        <div className={`${s.deco} ${s.decoSpiral}`}         aria-hidden="true"><SpiralDots color="#4A3D8F" /></div>
        <div className={`${s.deco} ${s.decoDiamond}`}        aria-hidden="true"><Diamond size={28} color="rgba(62,200,120,0.45)" /></div>
        <div className={`${s.deco} ${s.decoOrbitRing}`}      aria-hidden="true"><OrbitRing size={70} color="rgba(74,61,143,0.2)" /></div>

        {/* Image Showcase */}
        <div className={s.imageShowcase} aria-hidden="true">
          <div className={s.imageBgGreen} />
          <div className={s.imageBgPattern} />
          <div className={s.imageGradientOverlay} />
          <div className={s.imageScanLine} />

          <img
            src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=700&auto=format&fit=crop&q=85"
            alt="Instructor"
            className={s.instructorImg}
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
                <div className="d-flex gap-1">{[...Array(5)].map((_,i)=><StarIcon key={i}/>)}</div>
              </div>
              <div>
                <div className={s.imageStatNum}>4.9</div>
                <div className={s.imageStatLabel}>Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container-xl px-4 px-lg-5 w-100 h-100" style={{ position: "relative", zIndex: 4 }}>
          <div className={`row ${s.heroRow}`}>
            <div className="col-12 col-lg-6 col-xl-5 d-flex align-items-center">
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
                      <FilterSelect key={f.label} label={f.label} icon={f.icon} options={f.options} />
                    ))}
                    <button className={s.searchBtn}>
                      <SearchIcon />
                      Search
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Float Cards */}
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
              <img key={i} src={`https://randomuser.me/api/portraits/${p}.jpg`} alt="" className={s.avatarImg} />
            ))}
            <div className={s.avatarPlus}>+</div>
          </div>
        </div>

        <div className={`${s.floatCard} ${s.cardCertified} d-flex flex-column align-items-center justify-content-center`}>
          <CertIcon />
          <div className={s.certText}>Certified Online<br />Educator</div>
        </div>

      </section>

      {/* ══════════════════════ NEW SECTION: STATS BANNER */}
      <section className={s.statsBanner}>
        <div className="container-xl px-4 px-lg-5">
          <div className="row g-4">
            <div className="col-6 col-lg-3">
              <div className={s.statItem}>
                <div className={s.statNumber}>15K+</div>
                <div className={s.statLabel}>Active Students</div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className={s.statItem}>
                <div className={s.statNumber}>480+</div>
                <div className={s.statLabel}>Expert Courses</div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className={s.statItem}>
                <div className={s.statNumber}>98%</div>
                <div className={s.statLabel}>Success Rate</div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className={s.statItem}>
                <div className={s.statNumber}>24/7</div>
                <div className={s.statLabel}>Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEW SECTION: CATEGORIES */}
      <section className={s.categoriesSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="text-center mb-5">
            <span className={s.sectionBadge}>EXPLORE TOPICS</span>
            <h2 className={s.sectionTitle}>Browse by <span className="text-gradient">Category</span></h2>
            <p className={s.sectionSubtitle}>Discover courses tailored to your interests and goals</p>
          </div>

          <div className="row g-4">
            {categories.map((cat, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-2">
                <CategoryCard {...cat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEW SECTION: POPULAR COURSES */}
      <section className={s.coursesSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-5">
            <div>
              <span className={s.sectionBadge}>LEARN & GROW</span>
              <h2 className={s.sectionTitle}>Popular <span className="text-gradient">Courses</span></h2>
            </div>
            <div className="d-flex gap-2">
              <button 
                className={`${s.tabButton} ${activeTab === 'popular' ? s.tabButtonActive : ''}`}
                onClick={() => setActiveTab('popular')}
              >
                Popular
              </button>
              <button 
                className={`${s.tabButton} ${activeTab === 'new' ? s.tabButtonActive : ''}`}
                onClick={() => setActiveTab('new')}
              >
                Newest
              </button>
              <button 
                className={`${s.tabButton} ${activeTab === 'top' ? s.tabButtonActive : ''}`}
                onClick={() => setActiveTab('top')}
              >
                Top Rated
              </button>
            </div>
          </div>

          <div className="row g-4">
            {popularCourses.map((course, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <CourseCard {...course} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <a href="#" className={s.viewAllBtn}>
              View All Courses
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="8" x2="13" y2="8" />
                <polyline points="9,4 13,8 9,12" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEW SECTION: WHY CHOOSE US */}
      <section className={s.featuresSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className={s.sectionBadge}>WHY EDUCAMB</span>
              <h2 className={s.sectionTitle}>Transform Your Learning <span className="text-gradient">Experience</span></h2>
              <p className={s.sectionSubtitle}>We combine expert instruction with personalized attention to help you achieve your goals.</p>

              <div className="row g-4 mt-4">
                <div className="col-6">
                  <div className={s.featureItem}>
                    <div className={s.featureIcon}><VideoIcon /></div>
                    <h5>Live Sessions</h5>
                    <p>Interactive classes with real-time feedback</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className={s.featureItem}>
                    <div className={s.featureIcon}><UsersIcon /></div>
                    <h5>Small Groups</h5>
                    <p>Maximum 5 students per batch</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className={s.featureItem}>
                    <div className={s.featureIcon}><ClockIcon /></div>
                    <h5>Flexible Timing</h5>
                    <p>Schedule classes at your convenience</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className={s.featureItem}>
                    <div className={s.featureIcon}><TrophyIcon /></div>
                    <h5>Certification</h5>
                    <p>Get recognized certificates</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className={s.featuresImageWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format" 
                  alt="Students learning"
                  className={s.featuresImage}
                />
                <div className={s.featuresDeco1}><CircleRing size={120} color="#3EC878" strokeWidth={2} /></div>
                <div className={s.featuresDeco2}><DotsGrid color="#4A3D8F" cols={4} rows={4} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEW SECTION: MEET OUR INSTRUCTORS */}
      <section className={s.instructorsSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="text-center mb-5">
            <span className={s.sectionBadge}>EXPERT TEACHERS</span>
            <h2 className={s.sectionTitle}>Meet Our <span className="text-gradient">Instructors</span></h2>
            <p className={s.sectionSubtitle}>Learn from industry experts and passionate educators</p>
          </div>

          <div className="row g-4">
            {instructors.map((instructor, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <InstructorCard {...instructor} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEW SECTION: TESTIMONIALS */}
      <section className={s.testimonialsSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="text-center mb-5">
            <span className={s.sectionBadge}>STUDENT SUCCESS</span>
            <h2 className={s.sectionTitle}>What Our <span className="text-gradient">Students Say</span></h2>
          </div>

          <div className="row g-4">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="col-12 col-md-4">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEW SECTION: CTA BANNER */}
      <section className={s.ctaSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className={s.ctaBanner}>
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h3 className={s.ctaTitle}>Ready to Start Your Learning Journey?</h3>
                <p className={s.ctaText}>Join thousands of students who are already learning with Educamb</p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <a href="#" className={s.ctaButton}>
                  Get Started Now
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="9" x2="15" y2="9" />
                    <polyline points="11,5 15,9 11,13" />
                  </svg>
                </a>
              </div>
            </div>
            <div className={s.ctaDeco1}><StarBurst size={40} color="rgba(255,255,255,0.2)" /></div>
            <div className={s.ctaDeco2}><CircleRing size={80} color="rgba(255,255,255,0.1)" dashed /></div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEW SECTION: FOOTER */}
      <footer className={s.footer}>
        <div className="container-xl px-4 px-lg-5">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <BrandLogo />
                <span className={s.footerBrand}>Educamb</span>
              </div>
              <p className={s.footerText}>
                Empowering learners through personalized education. Join us to discover your true potential.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className={s.socialLink}>f</a>
                <a href="#" className={s.socialLink}>t</a>
                <a href="#" className={s.socialLink}>in</a>
                <a href="#" className={s.socialLink}>ig</a>
              </div>
            </div>
            
            <div className="col-6 col-lg-2">
              <h5 className={s.footerTitle}>Quick Links</h5>
              <ul className={s.footerLinks}>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Courses</a></li>
                <li><a href="#">Instructors</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            
            <div className="col-6 col-lg-2">
              <h5 className={s.footerTitle}>Support</h5>
              <ul className={s.footerLinks}>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>
            
            <div className="col-lg-4">
              <h5 className={s.footerTitle}>Subscribe to Our Newsletter</h5>
              <p className={s.footerText}>Get the latest updates on new courses and special offers</p>
              <div className={s.newsletterForm}>
                <input type="email" placeholder="Your email address" className={s.newsletterInput} />
                <button className={s.newsletterButton}>Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className={s.footerBottom}>
            <div>© 2024 Educamb. All rights reserved.</div>
            <div className="d-flex gap-3">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}