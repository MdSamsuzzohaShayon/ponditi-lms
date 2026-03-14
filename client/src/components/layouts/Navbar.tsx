'use client'

import { memo, useMemo, useState, useEffect } from "react";
import s from '@/styles/Navbar.module.scss';
import BrandLogo from "../icons/BrandLogo";

// ─────────────────────────────────────────────
//  NAVBAR COMPONENT
// ─────────────────────────────────────────────



const Navbar = memo(() => {

  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(() => [
    { label: "Home", chevron: "▲", active: true },
    { label: "About", chevron: null, active: false },
    { label: "Courses", chevron: "▾", active: false },
    { label: "Blog", chevron: "▾", active: false },
    { label: "Contact", chevron: null, active: false },
  ], []);

  return (
    <nav className={`${s.navbar} ${scrolled ? s.navScrolled : ""}`}>
      <div className="container-xl px-4 px-lg-5">
        <div className="d-flex align-items-center justify-content-between">
          <a href="#" className={`d-flex align-items-center gap-2 text-decoration-none ${s.navBrand}`}>
            <BrandLogo />
            <span>Ponditi</span>
          </a>

          <ul className={`d-none d-lg-flex align-items-center list-unstyled mb-0 ${s.navLinks}`}>
            {navLinks.map(({ label, chevron, active }) => (
              <li key={label}>
                <a href="#" className={`${s.navLink} ${active ? s.navLinkActive : ""} d-flex align-items-center gap-1`}>
                  {label}{chevron && <span className={s.chevron}>{chevron}</span>}
                </a>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="User" className={s.navAvatar} loading="lazy" />
            <div className={`${s.menuLines} d-lg-none`}><span /><span /></div>
            <a href="#" className={`d-none d-md-flex align-items-center gap-2 text-decoration-none ${s.navReg}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="15" y2="18" />
              </svg>
              Student Registration
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
