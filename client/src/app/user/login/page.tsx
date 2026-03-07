'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setErrorList, resetErrorList, toggleLoading, resetSuccessMessageList, setNoValidate } from '@/redux/reducers/elementsSlice';
import { setLoginInfo, resetLoginInfo } from '@/redux/reducers/userReducer';
import axios from '@/config/axios';
import MessageList from '@/components/elements/MessageList';
import Loader from '@/components/elements/Loader';
import styles from '@/styles/Login.module.scss';

function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redux state
  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const loginInfo = useAppSelector((state) => state.user.loginInfo);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const noValidate = useAppSelector((state) => state.elements.noValidate);

  // Validation state
  let validationPassed = true;

  // Handlers
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLoginInfo({ [e.target.name]: e.target.value }));
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetErrorList());
    dispatch(setNoValidate(false));

    if (!validationPassed) return;

    try {
      dispatch(toggleLoading(true));
      
      const response = await axios.post('/user/login', loginInfo, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        dispatch(resetErrorList());
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/user/dashboard');
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  // Validation functions
  const validatePhone = (phone: string) => {
    if (!phone || phone === '') {
      validationPassed = false;
      return (
        <p className={!noValidate ? styles.errorMessage : `${styles.errorMessage} d-none`}>
          Phone number cannot be empty
        </p>
      );
    }
    if (phone.length < 11) {
      validationPassed = false;
      return (
        <p className={!noValidate ? styles.errorMessage : `${styles.errorMessage} d-none`}>
          Please enter a valid 11-digit phone number
        </p>
      );
    }
    return null;
  };

  const validatePassword = (password: string) => {
    if (!password || password === '') {
      validationPassed = false;
      return (
        <p className={!noValidate ? styles.errorMessage : `${styles.errorMessage} d-none`}>
          Password cannot be empty
        </p>
      );
    }
    if (password.length < 6) {
      validationPassed = false;
      return (
        <p className={!noValidate ? styles.errorMessage : `${styles.errorMessage} d-none`}>
          Password must be at least 6 characters long
        </p>
      );
    }
    return null;
  };

  // Effects
  useEffect(() => {
    dispatch(resetErrorList());
    dispatch(setNoValidate(true));
    dispatch(toggleLoading(false));

    return () => {
      dispatch(resetSuccessMessageList());
      dispatch(resetLoginInfo());
    };
  }, [dispatch]);

  useEffect(() => {
    if (authUserInfo?.id) {
      router.push('/user/dashboard');
    }
  }, [authUserInfo, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main>
      <section className={`py-5 ${styles.hero}`}>
        {/* Decorative blobs - EXACT same as MainPage */}
        <span className={styles.blob1} aria-hidden="true" />
        <span className={styles.blob2} aria-hidden="true" />
        <span className={styles.gridOverlay} aria-hidden="true" />

        <div className="container position-relative">
          <div className="row align-items-center g-5 min-vh-100">
            
            {/* ── LEFT COLUMN: Login Form ── */}
            <div className="col-12 col-lg-6">
              <div className={styles.badge}>🔐 Welcome Back</div>

              <h1 className={styles.headline}>
                Sign In to{" "}
                <span className={styles.highlight}>Your Account</span>
              </h1>

              <p className={styles.subtext}>
                Access your dashboard, manage sessions, and connect with tutors or students.
              </p>

              {/* Login Form Card */}
              <div className={`${styles.loginCard} shadow-lg`}>
                <h2 className={styles.cardTitle}>Login</h2>
                
                <MessageList />

                <form onSubmit={loginHandler} noValidate={noValidate}>
                  <div className="row g-4">
                    {/* Phone/Email Field */}
                    <div className="col-12">
                      <label htmlFor="phone" className={styles.label}>
                        📱 Phone Number / Email
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="phone"
                        name="phone"
                        value={loginInfo.phone || ''}
                        onChange={inputChangeHandler}
                        placeholder="Enter your phone or email"
                        required
                      />
                      {loginInfo.phone && validatePhone(loginInfo.phone)}
                    </div>

                    {/* Password Field */}
                    <div className="col-12">
                      <label htmlFor="password" className={styles.label}>
                        🔒 Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${styles.input}`}
                        id="password"
                        name="password"
                        value={loginInfo.password || ''}
                        onChange={inputChangeHandler}
                        placeholder="Enter your password"
                        required
                      />
                      {loginInfo.password && validatePassword(loginInfo.password)}
                    </div>

                    {/* Forgot Password Link */}
                    <div className="col-12">
                      <div className={styles.forgotPassword}>
                        <Link href="/user/passwordrecover" className={styles.forgotLink}>
                          Forgot your password?
                        </Link>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <div className={styles.formFooter}>
                        <button type="submit" className={`btn ${styles.loginBtn}`}>
                          Sign In →
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Register Link */}
                <div className={styles.registerSection}>
                  <p className={styles.registerText}>
                    Don't have an account?{' '}
                    <Link href="/user/register" className={styles.registerLink}>
                      Create free account
                    </Link>
                  </p>
                </div>

                {/* Demo Credentials */}
                <div className={styles.demoSection}>
                  <p className={styles.demoTitle}>Demo Credentials:</p>
                  <div className={styles.demoGrid}>
                    <div className={styles.demoItem}>
                      <span className={styles.demoLabel}>Student:</span>
                      <span className={styles.demoValue}>01700000000 / 123456</span>
                    </div>
                    <div className={styles.demoItem}>
                      <span className={styles.demoLabel}>Tutor:</span>
                      <span className={styles.demoValue}>01800000000 / 123456</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badges - EXACT same as MainPage */}
              <div className={`d-flex gap-3 mt-4 flex-wrap ${styles.trustRow}`}>
                <span className={styles.trustBadge}>✅ 1000+ Active Users</span>
                <span className={styles.trustBadge}>⭐ Secure Login</span>
                <span className={styles.trustBadge}>🔒 256-bit Encrypted</span>
              </div>
            </div>

          {/* ── RIGHT COLUMN: Illustration ── */}
          <div className={`col-lg-6 d-none d-lg-flex justify-content-center ${styles.illustrationWrap}`}>
              <div className={styles.illustrationCard}>
                <img
                  src="/shape/learner.svg"
                  alt="Login illustration"
                  className={styles.illustration}
                />
                {/* Floating stats - EXACT same style as MainPage */}
                <div className={`${styles.floatCard} ${styles.floatCard1}`}>
                  <span>🚀</span> 500+ Active Sessions
                </div>
                <div className={`${styles.floatCard} ${styles.floatCard2}`}>
                  <span>⭐</span> 4.8 Rating
                </div>
                <div className={`${styles.floatCard} ${styles.floatCard3}`}>
                  <span>⚡</span> Instant Access
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;