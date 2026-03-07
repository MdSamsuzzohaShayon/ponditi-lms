'use client'

// React/next
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Config/util
import axios from '@/config/axios';

// Redux
import { toggleAuthUser, setSelectedContent } from '@/redux/reducers/userReducer';
import { toggleLoading } from '@/redux/reducers/elementsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';

// Hooks
import useMediaQuery from '@/hooks/useMediaQuery';

// Component
import DisplayInbox from './DisplayInbox';
import DisplayNotificationBar from './DisplayNotificationBar';

// Types
import { UserNotificationInterface } from '@/types/redux/userInterface';
import { ClassStatusEnum, StatusEnum, UserRoleEnum } from '@/types/enums';
import { useRouter } from 'next/navigation';
import styles from '@/styles/header.module.scss';

function Header() {
  let isMounted = false;

  // hooks
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isBreakpoint = useMediaQuery(768);

  // States from redux
  const menuItemList = useAppSelector((state) => state.elements.menuItemList);
  const userUnseenNotifications = useAppSelector((state) => state.user.userUnseenNotifications);
  const userNotifications = useAppSelector((state) => state.user.userNotifications);
  const authenticatedUser = useAppSelector((state) => state.user.authenticatedUser);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const roomListOfAUser = useAppSelector((state) => state.message.roomListOfAUser);
  const unseenMessageList = useAppSelector((state) => state.message.unseenMessageList); // unseenMessageList

  // State local
  const [dashboardUrl, setDashboardUrl] = useState('/user/dashboard');
  const [showNotificationBar, setShowNotificationBar] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const [showMenues, setShowMenues] = useState(false);
  const [showInboxes, setShowInboxes] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Ref
  const notificationMenuItem = useRef(null);

  useEffect(() => {
    if (isMounted === false) {
      const user = localStorage.getItem('user');
      if (user !== null) {
        const userData = JSON.parse(user);

        if (userData.role === UserRoleEnum.ADMIN) {
          setDashboardUrl('/admin');
        } else {
          setDashboardUrl('/user/dashboard');
        }
      }
    }
    isMounted = true;
  }, []);

  // Logout
  const logoutHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/user/logout');
      dispatch(toggleAuthUser(null));
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      window.localStorage.removeItem('user');
    }
  };

  const natificationBarCloseHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowNotificationBar(false);
  };

  const dropdownMenuHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowMenues((prevState) => !prevState);
    setShowNotificationBar(false);
    setShowInboxes(false);
  };
  const notificationBarHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowMenues(false);
    setShowInboxes(false);
    setShowNotificationBar((prevState) => !prevState);
  };
  const inboxBarHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowMenues(false);
    setShowNotificationBar(false);
    setShowInboxes((prevState) => !prevState);
  };

  {/* ── HEADER ── */ }
  return (

    <header className={`${styles.header} shadow`}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Logo */}
          <div className={styles.logoWrap}>
            <img src="/logo.png" alt="Ponditil" className={styles.logo} />
          </div>

          {/* Desktop nav */}
          <nav className={`d-none d-md-flex align-items-center gap-4 ${styles.nav}`}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/faq" className={styles.navLink}>FAQs</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
            <Link href="/user/login" className={`btn ${styles.btnOutline}`}>Log In</Link>
            <Link href="/user/register" className={`btn ${styles.btnPrimary}`}>Sign Up</Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`d-md-none ${styles.hamburger}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={`d-md-none pb-3 ${styles.mobileMenu}`}>
            <Link href="/" className={styles.mobileLink}>Home</Link>
            <Link href="/faq" className={styles.mobileLink}>FAQs</Link>
            <Link href="/contact" className={styles.mobileLink}>Contact</Link>
            <div className="d-flex gap-2 mt-2">
              <Link href="/login" className={`btn w-50 ${styles.btnOutline}`}>Log In</Link>
              <Link href="/register" className={`btn w-50 ${styles.btnPrimary}`}>Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </header>

  );
}

export default Header;
