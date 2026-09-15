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