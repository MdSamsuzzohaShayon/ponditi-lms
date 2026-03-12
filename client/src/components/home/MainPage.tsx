import { useState, useEffect, useRef, memo, useCallback, useMemo, JSX } from "react";
import s from "@/styles/HomePage.module.scss";
import { categories, filterData, instructors, popularCourses, testimonials } from "@/utils/staticData";
import StarBurst from "../svg/StarBurst";
import CircleRing from "../svg/CircleRing";
import HeroDecorations from "./HeroDecorations";
import ImageShowcase from "./ImageShowcase";
import HeroContent from "./HeroContent";
import FloatCards from "./FloatCards";
import StatsBanner from "./StatsBanner";
import CategoryCard from "./CategoryCard";
import CourseCard from "./CourseCard";
import VideoIcon from "../icons/VideoIcon";
import UsersIcon from "../icons/UsersIcon";
import ClockIcon from "../icons/ClockIcon";
import TrophyIcon from "../icons/TrophyIcon";
import DotsGrid from "../svg/DotsGrid";
import InstructorCard from "./InstructorCard";
import TestimonialCard from "./TestimonialCard";






// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────

export default function HeroSection() {
  // const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'popular' | 'new' | 'top'>('popular');

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 10);
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const handleTabChange = useCallback((tab: 'popular' | 'new' | 'top') => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="w-100">
      {/* Navbar  */}

      <section className={s.hero}>
        <div className={s.ambientOrb1} aria-hidden="true" />
        <div className={s.ambientOrb2} aria-hidden="true" />

        <span className={`${s.bgWord} ${s.bgWordCareer}`} aria-hidden="true">career</span>
        <span className={`${s.bgWord} ${s.bgWordBusiness}`} aria-hidden="true">business</span>

        <HeroDecorations s={s} />
        <ImageShowcase s={s} />

        <div className="container-xl px-4 px-lg-5 w-100 h-100" style={{ position: "relative", zIndex: 4 }}>
          <div className={`row ${s.heroRow}`}>
            <div className="col-12 col-lg-6 col-xl-5 d-flex align-items-center">
              <HeroContent filterData={filterData} s={s} />
            </div>
          </div>
        </div>

        <FloatCards s={s} />
      </section>

      <StatsBanner s={s} />

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
                <CategoryCard {...cat} s={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.coursesSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-5">
            <div>
              <span className={s.sectionBadge}>LEARN & GROW</span>
              <h2 className={s.sectionTitle}>Popular <span className="text-gradient">Courses</span></h2>
            </div>
            <div className="d-flex gap-2">
              {(['popular', 'new', 'top'] as const).map(tab => (
                <button
                  key={tab}
                  className={`${s.tabButton} ${activeTab === tab ? s.tabButtonActive : ''}`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {popularCourses.map((course, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <CourseCard {...course} s={s} />
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
                  loading="lazy"
                />
                <div className={s.featuresDeco1}><CircleRing size={120} color="#3EC878" strokeWidth={2} /></div>
                <div className={s.featuresDeco2}><DotsGrid color="#4A3D8F" cols={4} rows={4} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <InstructorCard {...instructor} s={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.testimonialsSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="text-center mb-5">
            <span className={s.sectionBadge}>STUDENT SUCCESS</span>
            <h2 className={s.sectionTitle}>What Our <span className="text-gradient">Students Say</span></h2>
          </div>

          <div className="row g-4">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="col-12 col-md-4">
                <TestimonialCard {...testimonial} s={s}  />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.ctaSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className={s.ctaBanner}>
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h3 className={s.ctaTitle}>Ready to Start Your Learning Journey?</h3>
                <p className={s.ctaText}>Join thousands of students who are already learning with Ponditi</p>
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
    </div>
  );
}