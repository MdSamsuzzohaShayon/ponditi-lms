'use client'

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { SocialLinksInterface } from '../../types/redux/elementsInterface';
import styles from "@/styles/footer.module.scss";
import { useAppSelector } from '@/redux/store';

function Footer() {
  const socialItems = useAppSelector((state) => state.elements.socialItems);
  return (
    <footer className={`${styles.footer} shadow`}>
      <div className="container">
        <div className={`row align-items-center py-4 gy-3 ${styles.footerInner}`}>

          {/* Copyright */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <span className={styles.copyright}>
              © 2023 Ponditil. All Rights Reserved.
            </span>
          </div>

          {/* Email */}
          <div className="col-12 col-md-4 text-center">
            <a href="mailto:info@ponditi.com" className={styles.footerEmail}>
              info@ponditi.com
            </a>
          </div>

          {/* Links + Socials */}
          <div className="col-12 col-md-4">
            <ul className={`list-unstyled d-flex justify-content-center justify-content-md-end align-items-center flex-wrap gap-3 m-0 ${styles.footerLinks}`}>
              <li>
                <Link href="/pirvacypolicy" className={styles.footerLink}>Privacy Policy</Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footerLink}>Contact</Link>
              </li>
              <li>
                <Link href="/faq" className={styles.footerLink}>FAQs</Link>
              </li>
              <li>
                <div className={`d-flex gap-2 ${styles.socials}`}>
                  {[
                    { href: "/", src: "/icons/fb.svg", alt: "Facebook" },
                    { href: "/", src: "/icons/twitter.svg", alt: "Twitter" },
                    { href: "/", src: "/icons/linkedin.svg", alt: "LinkedIn" },
                    { href: "/", src: "/icons/instagram.svg", alt: "Instagram" },
                  ].map(({ href, src, alt }) => (
                    <Link key={alt} href={href} className={styles.socialIcon} aria-label={alt}>
                      <img src={src} alt={alt} width={18} height={18} />
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
