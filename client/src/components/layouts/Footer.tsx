'use client'


import s from "@/styles/footer.module.scss";
import { useAppSelector } from '@/redux/store';
import BrandLogo from '../icons/BrandLogo';

function Footer() {
  const socialItems = useAppSelector((state) => state.elements.socialItems);
  return (
    <footer className={s.footer}>
    <div className="container-xl px-4 px-lg-5">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <BrandLogo />
            <span className={s.footerBrand}>Ponditi</span>
          </div>
          <p className={s.footerText}>
            Empowering learners through personalized education. Join us to discover your true potential.
          </p>
          <div className="d-flex gap-3">
            <a href="#" className={s.socialLink}>f</a>
            <a href="#" className={s.socialLink}>t</a>
            <a href="#" className={s.socialLink}>in</a>
            <a href="#" className={s.socialLink}>ig</a>
          </div>
        </div>

        <div className="col-6 col-lg-2">
          <h5 className={s.footerTitle}>Quick Links</h5>
          <ul className={s.footerLinks}>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Instructors</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="col-6 col-lg-2">
          <h5 className={s.footerTitle}>Support</h5>
          <ul className={s.footerLinks}>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>

        <div className="col-lg-4">
          <h5 className={s.footerTitle}>Subscribe to Our Newsletter</h5>
          <p className={s.footerText}>Get the latest updates on new courses and special offers</p>
          <div className={s.newsletterForm}>
            <input type="email" placeholder="Your email address" className={s.newsletterInput} />
            <button className={s.newsletterButton}>Subscribe</button>
          </div>
        </div>
      </div>

      <div className={s.footerBottom}>
        <div>© 2024 Ponditi. All rights reserved.</div>
        <div className="d-flex gap-3">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
