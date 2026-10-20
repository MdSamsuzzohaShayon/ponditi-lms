Here is my src/app/page.tsx:

```
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

```


Here are some child components:

```
// ─────────────────────────────────────────────
//  DECORATIONS COMPONENT
// ─────────────────────────────────────────────

import { memo } from "react";
import Zigzag from "../svg/Zigzag";
import TriangleOutline from "../svg/TriangleOutline";
import TriangleSolid from "../svg/TriangleSolid";
import DotsGrid from "../svg/DotsGrid";
import CircleRing from "../svg/CircleRing";
import CrossPlus from "../svg/CrossPlus";
import StarBurst from "../svg/StarBurst";
import SquareRotated from "../svg/SquareRotated";
import WaveLine from "../svg/WaveLine";
import Hexagon from "../svg/Hexagon";
import ArcShape from "../svg/ArcShape";
import Diamond from "../svg/Diamond";
import OrbitRing from "../svg/OrbitRing";
import SpiralDots from "../svg/SpiralDots";

const HeroDecorations = memo(({s}: {s: Record<string, string>}) => (
    <>
      <div className={`${s.deco} ${s.decoZigzag}`} aria-hidden="true"><Zigzag /></div>
      <div className={`${s.deco} ${s.decoTriTop}`} aria-hidden="true"><TriangleOutline size={30} /></div>
      <div className={`${s.deco} ${s.decoTriMid}`} aria-hidden="true"><TriangleSolid size={20} /></div>
      <div className={`${s.deco} ${s.decoTriRight}`} aria-hidden="true"><TriangleSolid size={28} color="rgba(62,200,120,0.5)" /></div>
      <div className={`${s.deco} ${s.decoTriBottomRight}`} aria-hidden="true"><TriangleSolid size={24} color="rgba(74,61,143,0.4)" /></div>
      <div className={`${s.deco} ${s.decoDotsPurple}`} aria-hidden="true"><DotsGrid color="#4A3D8F" cols={5} rows={5} /></div>
      <div className={`${s.deco} ${s.decoDotsGreen}`} aria-hidden="true"><DotsGrid color="#3EC878" cols={7} rows={7} gap={15} /></div>
      <div className={`${s.deco} ${s.decoRingTopLeft}`} aria-hidden="true"><CircleRing size={80} color="#3EC878" strokeWidth={2} /></div>
      <div className={`${s.deco} ${s.decoRingBottom}`} aria-hidden="true"><CircleRing size={56} color="#4A3D8F" strokeWidth={2} dashed /></div>
      <div className={`${s.deco} ${s.decoCrossLeft}`} aria-hidden="true"><CrossPlus size={30} color="rgba(74,61,143,0.28)" /></div>
      <div className={`${s.deco} ${s.decoCrossRight}`} aria-hidden="true"><CrossPlus size={26} color="rgba(62,200,120,0.4)" /></div>
      <div className={`${s.deco} ${s.decoStar}`} aria-hidden="true"><StarBurst size={30} color="rgba(62,200,120,0.65)" /></div>
      <div className={`${s.deco} ${s.decoSquare}`} aria-hidden="true"><SquareRotated size={24} color="rgba(74,61,143,0.32)" /></div>
      <div className={`${s.deco} ${s.decoWave}`} aria-hidden="true"><WaveLine color="rgba(62,200,120,0.35)" /></div>
      <div className={`${s.deco} ${s.decoHexLeft}`} aria-hidden="true"><Hexagon size={44} color="rgba(74,61,143,0.25)" /></div>
      <div className={`${s.deco} ${s.decoArcTop}`} aria-hidden="true"><ArcShape size={60} color="rgba(62,200,120,0.35)" /></div>
      <div className={`${s.deco} ${s.decoSpiral}`} aria-hidden="true"><SpiralDots color="#4A3D8F" /></div>
      <div className={`${s.deco} ${s.decoDiamond}`} aria-hidden="true"><Diamond size={28} color="rgba(62,200,120,0.45)" /></div>
      <div className={`${s.deco} ${s.decoOrbitRing}`} aria-hidden="true"><OrbitRing size={70} color="rgba(74,61,143,0.2)" /></div>
    </>
  ));
  
  HeroDecorations.displayName = 'HeroDecorations';

  export default HeroDecorations;

```


Image showcase:

```
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

```

HeroContent:

```
'use client'

// ─────────────────────────────────────────────
//  HERO CONTENT COMPONENT
// ─────────────────────────────────────────────

import { ETuitionStyle, IClassType, IFilterOption, ISubject, ITuitionm} from "@/types";
import React, { memo, useCallback, useState } from "react";
import FilterSelect from "./FilterSelect";
import SearchIcon from "../icons/SearchIcon";
import LocationAutocomplete from "../ui/LocationAutocomplete";
import { useAppSelector } from "@/redux/store";
import axios from "@/config/axios";

/**
 * Previous code
 * https://github.com/MdSamsuzzohaShayon/ponditi-lms/blob/68085d9f1e77929ba99b5affff565f0544df6746/client/components/search/SearchForm.jsx
 */

interface HeroContentProps {
    s: Record<string, string>;
    // filterData: IFilterOption[];
    classTypes: IClassType[]; subjects: ISubject[]; tuitionms: ITuitionm[];
}

const tuitionStyleOptions = [{id: ETuitionStyle.ANY, name:  ETuitionStyle.ANY}
    , {id: ETuitionStyle.ONLINE, name:  ETuitionStyle.ONLINE}, 
    {id: ETuitionStyle.SL, name:  "Student's Location"},
     {id: ETuitionStyle.TL, name:  "Teacher's Location"}]

const HeroContent = ({ classTypes, subjects, tuitionms, s }: HeroContentProps) => {

    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const searchParams = useAppSelector((state) => state.search.searchParams);


    const handleLocationChange = useCallback((location: string | null) => {
        setSelectedLocation(location);
        console.log("Location selected:", location); // You can see the selected value here
        // You can now use this location in your search logic, e.g., dispatch to Redux
        // dispatch(setSearchParams({ location: location }));
    }, []);

    const searchTeacherHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
          const response = await axios.get('/search/teacher', {
            params: searchParams,
          });
          if (response.status === 200) {
            // dispatch(setSearchAllUserList(response.data.teachers));
            // // rpStart: 0, // rp = result pagination
            // dispatch(setRPStart(0));
            // // rpCurrentPage: 1,
            // dispatch(setRPCurrentPage(1));
            // // searchUserList: [],
            // const displayableItems = response.data.teachers.slice(rpStart, rpTotal);
            // dispatch(setSearchUserList(displayableItems));
            // // rpTotalPage: 1,
            // dispatch(setRPTotalPage(Math.ceil(response.data.teachers.length / rpTotal)));
          } else if (response.status === 204) {
            window.localStorage.removeItem('search');
            // dispatch(setErrorList(['No teacher found']));
            // dispatch(resetSearchUserList());
          }
        } catch (error) {
          console.log(error);
        //   window.localStorage.removeItem('search');
        //   if (error?.response?.data?.msg) {
        //     dispatch(setErrorList([error.response.data.msg]));
        //   }
        }
      };


    return (
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
                    {/* {filterData.map(f => (
                        <FilterSelect s={s} key={f.label} label={f.label} icon={f.icon} options={f.options} />
                    ))} */}
                    <div className={`position-relative w-100 ${s.filterSelect}`}>
                        <LocationAutocomplete
                            onLocationChange={handleLocationChange}
                            placeholder="Location"
                            s={s}

                        />
                    </div>
                    <FilterSelect s={s} key="tuition-style" label="Tuition Style" icon={null} options={tuitionStyleOptions} />
                    <FilterSelect s={s} key="medium" label="Medium" icon={null} options={(tuitionms || []).map((t) => ({id: t.id, name: t.name}))} />
                    <FilterSelect s={s} key="class" label="Class" icon={null} options={(classTypes || []).map(ct => ({id: ct.id, name: ct.name}))} />
                    <FilterSelect s={s} key="subject" label="Subject" icon={null} options={(subjects || []).map((s) => ({id: s.id, name: s.name}))} />
                    <button className={s.searchBtn}>
                        <SearchIcon />
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}



export default HeroContent;

```


FloatCards:

```
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
  

```


Courses section:

```
'use client';

import React, { useState, useCallback } from 'react';
import s from '@/styles/HomePage.module.scss';
import { popularCourses } from '@/utils/staticData';
import CourseCard from './CourseCard';

// ─── Type Definitions ────────────────────────────────────────

type CourseTab = 'popular' | 'new' | 'top';

interface TabConfig {
  key: CourseTab;
  label: string;
}

// ─── Constants (pre-computed labels, no string manipulation per render) ──

const COURSE_TABS: readonly TabConfig[] = [
  { key: 'popular', label: 'Popular' },
  { key: 'new', label: 'New' },
  { key: 'top', label: 'Top' },
];

// ─── Component ────────────────────────────────────────────────

export default function CoursesSection(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<CourseTab>('popular');

  const handleTabChange = useCallback((tab: CourseTab): void => {
    setActiveTab(tab);
  }, []);

  return (
    <section className={s.coursesSection}>
      <div className="container-xl px-4 px-lg-5">
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-5">
          <div>
            <span className={s.sectionBadge}>LEARN &amp; GROW</span>
            <h2 className={s.sectionTitle}>
              Popular <span className="text-gradient">Courses</span>
            </h2>
          </div>
          <div className="d-flex gap-2" role="tablist">
            {COURSE_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`${s.tabButton} ${activeTab === tab.key ? s.tabButtonActive : ''}`}
                onClick={() => handleTabChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="row g-4">
          {popularCourses.map((course, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <CourseCard {...course} s={s} />
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <a href="#" className={s.viewAllBtn}>
            View All Courses
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1={3} y1={8} x2={13} y2={8} />
              <polyline points="9,4 13,8 9,12" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

```



Please analyze and extract the complete design system of this page in detail, including layout structure, spacing rules, typography hierarchy, color palette, component styles, and overall visual language.

Treat this as a reusable design reference system. The goal is to replicate the same design consistency across future pages while maintaining the same look, feel, and interaction patterns.

When I later provide a page requirement, you should rebuild it using the same design system, ensuring consistency in layout, styling, and component behavior.

If I provide content, use it as the primary data source. If no content is provided, generate realistic placeholder (dummy) content that matches the context and tone of the design.

