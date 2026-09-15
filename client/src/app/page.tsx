import React, { cache } from 'react';
import { BACKEND_URL } from '@/config/keys';
import { IClassType, IResponseData, ISubject, ITuitionm, IClassTypesResponse, ISubjectsResponse, ITuitionmsResponse, IFeatureItem } from '@/types';
import { fetchWithErrorHandling } from '@/utils/fetcher';
import s from '@/styles/HomePage.module.scss';
import { categories, instructors, testimonials } from '@/utils/staticData';
import TestimonialCard from '@/components/home/TestimonialCard';
import HeroDecorations from '@/components/home/HeroDecorations';
import ImageShowcase from '@/components/home/ImageShowcase';
import HeroContent from '@/components/home/HeroContent';
import FloatCards from '@/components/home/FloatCards';
import StatsBanner from '@/components/home/StatsBanner';
import CategoryCard from '@/components/home/CategoryCard';
import CoursesSection from '@/components/home/CoursesSection';
import VideoIcon from '@/components/icons/VideoIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import ClockIcon from '@/components/icons/ClockIcon';
import TrophyIcon from '@/components/icons/TrophyIcon';
import CircleRing from '@/components/svg/CircleRing';
import DotsGrid from '@/components/svg/DotsGrid';
import InstructorCard from '@/components/home/InstructorCard';
import StarBurst from '@/components/svg/StarBurst';




// ─── Constants ───────────────────────────────────────────────

const REVALIDATE_INTERVAL_SECONDS = 3600;
const FETCH_OPTIONS = {
  next: { revalidate: REVALIDATE_INTERVAL_SECONDS },
};

const FEATURES: readonly IFeatureItem[] = [
  { icon: <VideoIcon />, title: 'Live Sessions', description: 'Interactive classes with real-time feedback' },
  { icon: <UsersIcon />, title: 'Small Groups', description: 'Maximum 5 students per batch' },
  { icon: <ClockIcon />, title: 'Flexible Timing', description: 'Schedule classes at your convenience' },
  { icon: <TrophyIcon />, title: 'Certification', description: 'Get recognized certificates' },
];

const EMPTY_RESPONSE_DATA: IResponseData = {
  classTypes: [],
  subjects: [],
  tuitionms: [],
};

// ─── Cached Fetch Functions ──────────────────────────────────
// React.cache deduplicates requests within a single render pass.
// Combined with Next.js Data Cache (via `revalidate`), this provides
// two levels of caching: request-level memoization + data-level ISR.

const fetchClassTypes = cache(async (): Promise<IClassType[]> => {
  try {
    const response = await fetchWithErrorHandling<IClassTypesResponse>(
      `${BACKEND_URL}/api/classtype/all`,
      FETCH_OPTIONS
    );
    return response?.classTypes ?? [];
  } catch (error) {
    console.error('[HomePage] Failed to fetch class types:', error);
    return [];
  }
});

const fetchSubjects = cache(async (): Promise<ISubject[]> => {
  try {
    const response = await fetchWithErrorHandling<ISubjectsResponse>(
      `${BACKEND_URL}/api/subject/all`,
      FETCH_OPTIONS
    );
    return response?.subjects ?? [];
  } catch (error) {
    console.error('[HomePage] Failed to fetch subjects:', error);
    return [];
  }
});

const fetchTuitionms = cache(async (): Promise<ITuitionm[]> => {
  try {
    const response = await fetchWithErrorHandling<ITuitionmsResponse>(
      `${BACKEND_URL}/api/tuitionm/all`,
      FETCH_OPTIONS
    );
    return response?.tuitionms ?? [];
  } catch (error) {
    console.error('[HomePage] Failed to fetch tuitionms:', error);
    return [];
  }
});

// ─── Data Aggregation with Parallel Fetching ─────────────────

async function fetchHomePageData(): Promise<IResponseData> {
  try {
    const [classTypes, subjects, tuitionms] = await Promise.all([
      fetchClassTypes(),
      fetchSubjects(),
      fetchTuitionms(),
    ]);

    return { classTypes, subjects, tuitionms };
  } catch (error) {
    console.error('[HomePage] Data fetch failed:', error);
    return EMPTY_RESPONSE_DATA;
  }
}








// ─── Page Component ──────────────────────────────────────────

export default async function HomePage(): Promise<React.ReactElement> {
  const homePageData = await fetchHomePageData();
  const { classTypes, subjects, tuitionms } = homePageData;
  return (
    <div className="w-100">
      {/* Hero section  */}
      <section className={s.hero}>
        <div className={s.ambientOrb1} aria-hidden="true" />
        <div className={s.ambientOrb2} aria-hidden="true" />
        <span className={`${s.bgWord} ${s.bgWordCareer}`} aria-hidden="true">career</span>
        <span className={`${s.bgWord} ${s.bgWordBusiness}`} aria-hidden="true">business</span>
        <HeroDecorations s={s} />
        <ImageShowcase s={s} />
        <div className="container-xl px-4 px-lg-5 w-100 h-100" style={{ position: 'relative', zIndex: 4 }}>
          <div className={`row ${s.heroRow}`}>
            <div className="col-12 col-lg-6 col-xl-5 d-flex align-items-center">
              <HeroContent classTypes={classTypes} subjects={subjects} tuitionms={tuitionms} s={s} />
            </div>
          </div>
        </div>
        <FloatCards s={s} />
      </section>

      <StatsBanner s={s} />
      {/* Category section  */}
      <section className={s.categoriesSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="text-center mb-5">
            <span className={s.sectionBadge}>EXPLORE TOPICS</span>
            <h2 className={s.sectionTitle}>Browse by <span className="text-gradient">Category</span></h2>
            <p className={s.sectionSubtitle}>Discover courses tailored to your interests and goals</p>
          </div>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-2">
                <CategoryCard {...category} s={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses section - client component */}
      <CoursesSection />



      {/* Features section  */}
      <section className={s.featuresSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className={s.sectionBadge}>WHY EDUCAMB</span>
              <h2 className={s.sectionTitle}>Transform Your Learning <span className="text-gradient">Experience</span></h2>
              <p className={s.sectionSubtitle}>
                We combine expert instruction with personalized attention to help you achieve your goals.
              </p>
              <div className="row g-4 mt-4">
                {FEATURES.map((feature, index) => (
                  <div key={index} className="col-6">
                    <div className={s.featureItem}>
                      <div className={s.featureIcon}>{feature.icon}</div>
                      <h5>{feature.title}</h5>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
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
                <div className={s.featuresDeco1}>
                  <CircleRing size={120} color="#3EC878" strokeWidth={2} />
                </div>
                <div className={s.featuresDeco2}>
                  <DotsGrid color="#4A3D8F" cols={4} rows={4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor section  */}
      <section className={s.instructorsSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="text-center mb-5">
            <span className={s.sectionBadge}>EXPERT TEACHERS</span>
            <h2 className={s.sectionTitle}>Meet Our <span className="text-gradient">Instructors</span></h2>
            <p className={s.sectionSubtitle}>Learn from industry experts and passionate educators</p>
          </div>
          <div className="row g-4">
            {instructors.map((instructor, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                <InstructorCard {...instructor} s={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial section  */}
      <section className={s.testimonialsSection}>
        <div className="container-xl px-4 px-lg-5">
          <div className="text-center mb-5">
            <span className={s.sectionBadge}>STUDENT SUCCESS</span>
            <h2 className={s.sectionTitle}>What Our <span className="text-gradient">Students Say</span></h2>
          </div>
          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-12 col-md-4">
                <TestimonialCard {...testimonial} s={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section  */}
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
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1={3} y1={9} x2={15} y2={9} />
                    <polyline points="11,5 15,9 11,13" />
                  </svg>
                </a>
              </div>
            </div>
            <div className={s.ctaDeco1}>
              <StarBurst size={40} color="rgba(255,255,255,0.2)" />
            </div>
            <div className={s.ctaDeco2}>
              <CircleRing size={80} color="rgba(255,255,255,0.1)" dashed />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}