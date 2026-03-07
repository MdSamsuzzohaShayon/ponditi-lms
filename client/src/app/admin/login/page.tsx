'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setLoginAdmin } from '@/redux/reducers/adminReducer';
import { resetErrorList, setErrorList, toggleLoading } from '@/redux/reducers/elementsSlice';
import { toggleAuthUser } from '@/redux/reducers/userReducer';
import axios from '@/config/axios';
import MessageList from '@/components/elements/MessageList';
import Loader from '@/components/elements/Loader';
import styles from '@/styles/AdminLogin.module.scss';

function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux state
  const loginAdmin = useAppSelector((state) => state.admin.loginAdmin);
  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLoginAdmin({ [e.target.name]: e.target.value }));
  };

  const loginSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!loginAdmin.emailorpass) {
      return dispatch(setErrorList(['You must use email or phone number to login']));
    }

    if (loginAdmin.password.length < 6) {
      return dispatch(setErrorList(['Password must be at least 6 characters long']));
    }

    // Prepare login object
    const loginObj = { ...loginAdmin };
    const pattern = /\d+/;
    
    if (loginObj.emailorpass.includes('@') && loginObj.emailorpass.includes('.')) {
      // @ts-ignore
      loginObj.email = loginObj.emailorpass;
      // @ts-ignore
      delete loginObj.emailorpass;
      // @ts-ignore
      delete loginObj.phone;
    } else if (pattern.test(loginObj.emailorpass)) {
      // @ts-ignore
      loginObj.phone = loginObj.emailorpass;
      // @ts-ignore
      delete loginObj.email;
      // @ts-ignore
      delete loginObj.emailorpass;
    } else {
      return dispatch(setErrorList(['Please enter a valid phone number or email']));
    }

    try {
      dispatch(toggleLoading(true));
      
      const response = await axios.post('/admin/login', loginObj, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        dispatch(resetErrorList());
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(toggleAuthUser(true));
        router.push('/admin');
      }
    } catch (error: any) {
      console.error('Admin Login Error:', error);
      
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        await axios.post('/user/logout');
      }
    } finally {
      dispatch(toggleLoading(false));
    }
    return null;
  };

  // Redirect if already logged in
  useEffect(() => {
    if (authUserInfo?.id) {
      router.push('/admin');
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
            
            {/* ── LEFT COLUMN: Admin Login Form ── */}
            <div className="col-12 col-lg-6">
              <div className={styles.badge}>👑 Admin Portal</div>

              <h1 className={styles.headline}>
                Admin{" "}
                <span className={styles.highlight}>Dashboard</span>
                <br />Access
              </h1>

              <p className={styles.subtext}>
                Secure admin login portal. Manage users, tutors, sessions, and platform settings.
              </p>

              {/* Admin Login Form Card */}
              <div className={`${styles.loginCard} shadow-lg`}>
                <div className={styles.cardHeader}>
                  <div className={styles.adminIcon}>⚙️</div>
                  <h2 className={styles.cardTitle}>Administrator Login</h2>
                </div>
                
                <MessageList />

                <form onSubmit={loginSubmitHandler}>
                  <div className="row g-4">
                    {/* Email/Phone Field */}
                    <div className="col-12">
                      <label htmlFor="emailorpass" className={styles.label}>
                        📧 Email or 📱 Phone
                      </label>
                      <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="emailorpass"
                        name="emailorpass"
                        value={loginAdmin.emailorpass || ''}
                        onChange={inputChangeHandler}
                        placeholder="admin@ponditi.com or 01700000000"
                        required
                      />
                      <p className={styles.fieldHint}>
                        Use your registered email or phone number
                      </p>
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
                        value={loginAdmin.password || ''}
                        onChange={inputChangeHandler}
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    {/* Security Note */}
                    <div className="col-12">
                      <div className={styles.securityNote}>
                        <span>🔐</span>
                        <p>This area is restricted to authorized administrators only</p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <div className={styles.formFooter}>
                        <button type="submit" className={`btn ${styles.loginBtn}`}>
                          Access Admin Dashboard →
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Admin Links */}
                <div className={styles.adminLinks}>
                  <Link href="/admin/forgot-password" className={styles.adminLink}>
                    Forgot password?
                  </Link>
                  <span className={styles.separator}>•</span>
                  <Link href="/" className={styles.adminLink}>
                    Back to Main Site
                  </Link>
                </div>
              </div>

              {/* Trust badges - EXACT same as MainPage */}
              <div className={`d-flex gap-3 mt-4 flex-wrap ${styles.trustRow}`}>
                <span className={styles.trustBadge}>🛡️ Secure Access</span>
                <span className={styles.trustBadge}>⚡ 2FA Available</span>
                <span className={styles.trustBadge}>📊 Full Control</span>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Admin Illustration ── */}
            <div className={`col-lg-6 d-none d-lg-flex justify-content-center ${styles.illustrationWrap}`}>
              <div className={styles.illustrationCard}>
                <img
                  src="/shape/learner.svg"
                  alt="Admin illustration"
                  className={styles.illustration}
                />
                {/* Floating stats - EXACT same style as MainPage */}
                <div className={`${styles.floatCard} ${styles.floatCard1}`}>
                  <span>👥</span> 10K+ Users
                </div>
                <div className={`${styles.floatCard} ${styles.floatCard2}`}>
                  <span>📚</span> 2.5K+ Tutors
                </div>
                <div className={`${styles.floatCard} ${styles.floatCard3}`}>
                  <span>💰</span> 50K+ Transactions
                </div>
                <div className={`${styles.floatCard} ${styles.floatCard4}`}>
                  <span>⚙️</span> System Online
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminLoginPage;