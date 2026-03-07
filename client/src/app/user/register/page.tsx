'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { resetErrorList, toggleLoading } from '@/redux/reducers/elementsSlice';
import { fetchAllClassTypes } from '@/redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '@/redux/reducers/subjectReducer';
import { fetchAllTuitionms } from '@/redux/reducers/tuitionmReducer';
import { resetSendOTP, resetVerifyCode, resetRegisterableUser } from '@/redux/reducers/userReducer';
import SendCode from '@/components/register/SendCode';
import VerifyCode from '@/components/register/VerifyCode';
import MessageList from '@/components/elements/MessageList';
import styles from '@/styles/Register.module.scss';
import Image from 'next/image';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userSendVerifyStep = useAppSelector((state) => state.user.userSendVerifyStep);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);

  const renderForm = () => {
    switch (userSendVerifyStep) {
      case 'VERIFY_CODE':
        return <VerifyCode />;
      default:
        return <SendCode />;
    }
  };

  useEffect(() => {
    dispatch(resetSendOTP());
    dispatch(resetVerifyCode());
    dispatch(resetRegisterableUser());
    dispatch(resetErrorList());
    dispatch(toggleLoading(false));

    Promise.all([
      dispatch(fetchAllClassTypes(null)),
      dispatch(fetchAllSubjects(null)),
      dispatch(fetchAllTuitionms(null))
    ]);

    return () => {
      dispatch(resetErrorList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (authUserInfo?.id) {
      router.push('/user/dashboard');
    }
  }, [authUserInfo, router]);

  return (
    <main>
      <section className={`py-5 ${styles.hero}`}>
        {/* Decorative blobs - EXACT same as MainPage */}
        <span className={styles.blob1} aria-hidden="true" />
        <span className={styles.blob2} aria-hidden="true" />
        <span className={styles.gridOverlay} aria-hidden="true" />

        <div className="container position-relative">
          <div className="row align-items-center g-5 min-vh-100">

            {/* ── LEFT COLUMN: Form ── */}
            <div className="col-12 col-lg-6">
              <div className={styles.badge}>🚀 Join Ponditil Community</div>

              <h1 className={styles.headline}>
                Create Your{" "}
                <span className={styles.highlight}>Account</span>
                <br />Start Your Learning Journey
              </h1>

              <p className={styles.subtext}>
                Join thousands of students and tutors across Bangladesh.
                Get verified in minutes and start learning today.
              </p>

              {/* Form Card - EXACT same card style as MainPage */}
              <div className={`${styles.formCard} shadow-lg`}>
                <MessageList />
                {renderForm()}
              </div>

              {/* Trust badges - EXACT same as MainPage */}
              <div className={`d-flex gap-3 mt-4 flex-wrap ${styles.trustRow}`}>
                <span className={styles.trustBadge}>✅ 1000+ Happy Students</span>
                <span className={styles.trustBadge}>⭐ Verified Tutors</span>
                <span className={styles.trustBadge}>🔒 Secure Registration</span>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Illustration ── */}
            <div className={`col-lg-6 d-none d-lg-flex justify-content-center ${styles.illustrationWrap}`}>
              <div className={styles.illustrationCard}>
                <Image
                  width={400}
                  height={300}
                  src="/shape/learner.svg"
                  alt="Registration illustration"
                  className={styles.illustration}
                />
                {/* Floating stats - EXACT same style as MainPage */}
                <div className={`${styles.floatCard} ${styles.floatCard1}`}>
                  <span>📱</span> 2-Step Verification
                </div>
                <div className={`${styles.floatCard} ${styles.floatCard2}`}>
                  <span>🔐</span> 100% Secure
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;