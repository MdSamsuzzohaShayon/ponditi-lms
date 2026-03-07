'use client'

// JavaScript
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Section1 from '@/components/home/Section1';
import { fetchAllClassTypes } from '@/redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '@/redux/reducers/subjectReducer';
import { fetchAllTuitionms } from '@/redux/reducers/tuitionmReducer';
import { AppDispatch, useAppDispatch, useAppSelector } from '@/redux/store';
import { setSearchParams } from '@/redux/reducers/searchReducer';
import { UserRoleEnum } from '@/types/enums';
import SearchForm from '../search/SearchForm';
import styles from '@/styles/HomePage.module.scss';
import Link from 'next/link';

function MainPage() {
  let isMounted = true;

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const tuitionmList = useAppSelector((state) => state.tuitionm.tuitionmList);
  const authUserInfo = useAppSelector(state=> state.user.authUserInfo);


  
  const [formData, setFormData] = useState({
    location: "",
    tutionplace: "ANY",
    TuitionmId: "0",
    ClassTypeId: "0",
    SubjectId: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Business logic preserved — add search handler here
  };

  useEffect(() => {
    window.localStorage.removeItem('search');
    (async () => {
      if (isMounted) {
        await Promise.all([dispatch(fetchAllClassTypes(null)), dispatch(fetchAllSubjects(null)), dispatch(fetchAllTuitionms(null))]);

        if (tuitionmList.length > 0) {
          // Get first element
          const firstTuitionmElement = tuitionmList[0];
          // SET DEFAULT SEARCH PARAMS
          dispatch(
            setSearchParams({
              // location: '',
              TuitionmId: tuitionmList[0].id,
              // ClassTypeId: 0, // id
              // SubjectId: 0, // id
            }),
          );
        }
      }
    })();
    isMounted = false;
  }, []);

  {/* ── HERO SECTION ── */}
  return (

      <main>
        <section className={`py-5 ${styles.hero}`}>
          {/* Decorative blobs */}
          <span className={styles.blob1} aria-hidden="true" />
          <span className={styles.blob2} aria-hidden="true" />
          <span className={styles.gridOverlay} aria-hidden="true" />

          <div className="container position-relative">
            <div className="row align-items-center g-5">

              {/* ── LEFT: Copy + Search Form ── */}
              <div className="col-12 col-md-6">
                <div className={styles.badge}>🇧🇩 Bangladesh&apos;s #1 Tutor Marketplace</div>

                <h1 className={styles.headline}>
                  First Ever{" "}
                  <span className={styles.highlight}>Hourly-Paid</span>
                  <br />Tutoring Platform
                  <br />in Bangladesh
                </h1>

                <p className={styles.subtext}>
                  Hire your desired tutor, learn anything in your schedule &amp; location, and pay hourly.
                </p>

                {/* ── SEARCH CARD ── */}
                <div className={`${styles.searchCard} shadow-lg`}>
                  <p className={styles.searchTitle}>Find Your Tutor</p>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                      <div className="col-12">
                        <label htmlFor="location" className={styles.label}>
                          📍 Location
                        </label>
                        <input
                          className={`form-control ${styles.input}`}
                          id="location"
                          placeholder="Enter your location…"
                          type="text"
                          value={formData.location}
                          name="location"
                          autoComplete="off"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-6">
                        <label htmlFor="tutionplace" className={styles.label}>
                          🎓 Tuition Style
                        </label>
                        <select
                          name="tutionplace"
                          id="tutionplace"
                          className={`form-select ${styles.input}`}
                          value={formData.tutionplace}
                          onChange={handleChange}
                        >
                          <option value="ANY">Any Style</option>
                          <option value="ONLINE">Online</option>
                          <option value="TL">Teacher&apos;s Location</option>
                          <option value="SL">Student&apos;s Location</option>
                        </select>
                      </div>

                      <div className="col-6">
                        <label htmlFor="TuitionmId" className={styles.label}>
                          📚 Medium
                        </label>
                        <select
                          name="TuitionmId"
                          id="TuitionmId"
                          className={`form-select ${styles.input}`}
                          value={formData.TuitionmId}
                          onChange={handleChange}
                        >
                          <option value="0" disabled>Select medium*</option>
                        </select>
                      </div>

                      <div className="col-6">
                        <label htmlFor="ClassTypeId" className={styles.label}>
                          🏫 Class
                        </label>
                        <select
                          name="ClassTypeId"
                          id="ClassTypeId"
                          className={`form-select ${styles.input}`}
                          value={formData.ClassTypeId}
                          onChange={handleChange}
                        >
                          <option value="0" disabled>Select class*</option>
                        </select>
                      </div>

                      <div className="col-6">
                        <label htmlFor="SubjectId" className={styles.label}>
                          🔬 Subject
                        </label>
                        <select
                          name="SubjectId"
                          id="SubjectId"
                          className={`form-select ${styles.input}`}
                          value={formData.SubjectId}
                          onChange={handleChange}
                        >
                          <option value="0" disabled>Select subject*</option>
                        </select>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        className={`btn ${styles.searchBtn}`}
                        type="submit"
                      >
                        Search Tutor →
                      </button>
                    </div>
                  </form>
                </div>

                {/* Trust badges */}
                <div className={`d-flex gap-3 mt-4 flex-wrap ${styles.trustRow}`}>
                  <span className={styles.trustBadge}>✅ 500+ Tutors</span>
                  <span className={styles.trustBadge}>⭐ 4.8 Rating</span>
                  <span className={styles.trustBadge}>💳 Pay Per Hour</span>
                </div>
              </div>

              {/* ── RIGHT: Illustration ── */}
              <div className={`col-md-6 d-none d-md-flex justify-content-center ${styles.illustrationWrap}`}>
                <div className={styles.illustrationCard}>
                  <img
                    src="/shape/learner.svg"
                    alt="Learner illustration"
                    className={styles.illustration}
                  />
                  {/* Floating accent cards */}
                  <div className={`${styles.floatCard} ${styles.floatCard1}`}>
                    <span>📖</span> 1,200+ sessions today
                  </div>
                  <div className={`${styles.floatCard} ${styles.floatCard2}`}>
                    <span>🕐</span> Book in minutes
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

  );
}

export default MainPage;
