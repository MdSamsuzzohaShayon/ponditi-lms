'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Faq.module.scss';

function FaqPage() {
  // State to track which FAQ is open
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // FAQ Categories
  const faqCategories = [
    {
      category: "For Students",
      icon: "🎓",
      questions: [
        {
          q: "How do I find a tutor on Ponditil?",
          a: "Finding a tutor is easy! Simply use our search form on the homepage. Select your location, preferred tuition style (online, teacher's location, or student's location), subject, and class. Browse through the list of qualified tutors and choose the one that best fits your needs."
        },
        {
          q: "How does hourly payment work?",
          a: "Ponditil is Bangladesh's first hourly-paid tutoring platform. You only pay for the actual time you learn. After each session, you'll be charged based on the tutor's hourly rate. You can pay securely through our platform via mobile banking, credit card, or other payment methods."
        },
        {
          q: "Can I change my tutor if I'm not satisfied?",
          a: "Absolutely! Your satisfaction is our priority. If you're not completely satisfied with your tutor, you can request a change at any time. Simply go to your dashboard and select 'Change Tutor' or contact our support team for assistance."
        },
        {
          q: "What if I need to cancel a session?",
          a: "You can cancel a session up to 2 hours before the scheduled time without any charge. For cancellations within 2 hours, a small cancellation fee may apply. You can manage all your sessions from your dashboard."
        },
        {
          q: "Are the tutors verified?",
          a: "Yes! All tutors on Ponditil go through a strict verification process. We verify their educational qualifications, teaching experience, and conduct background checks. You can see each tutor's verification status on their profile."
        }
      ]
    },
    {
      category: "For Tutors",
      icon: "👨‍🏫",
      questions: [
        {
          q: "How do I become a tutor on Ponditil?",
          a: "To become a tutor, click on 'Sign Up' and select 'Tutor Registration'. Fill in your details, upload your educational certificates, and complete your profile. Our team will review your application and verify your credentials within 24-48 hours."
        },
        {
          q: "How and when do I get paid?",
          a: "Tutors receive payments weekly for all completed sessions. Payments are processed every Sunday for the previous week's sessions. You can withdraw your earnings via mobile banking (bKash, Nagad), bank transfer, or keep them in your Ponditil wallet."
        },
        {
          q: "Can I set my own hourly rate?",
          a: "Yes! You have full control over your hourly rate. We recommend checking market rates for your subject and experience level to stay competitive. You can adjust your rate anytime from your tutor dashboard."
        },
        {
          q: "What if a student doesn't show up?",
          a: "If a student doesn't show up within 15 minutes of the scheduled time, the session is automatically marked as 'no-show'. You'll still receive 50% of your hourly rate as compensation. Please report repeated no-shows to our support team."
        },
        {
          q: "Is there any commission fee?",
          a: "Yes, Ponditil charges a nominal 15% commission on each completed session. This covers platform maintenance, student acquisition, payment processing, and 24/7 support. You keep 85% of your earnings."
        }
      ]
    },
    {
      category: "Payments & Security",
      icon: "💰",
      questions: [
        {
          q: "What payment methods are accepted?",
          a: "We accept multiple payment methods including bKash, Nagad, Rocket, credit/debit cards, and bank transfers. You can choose your preferred method when making payments or withdrawing earnings."
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely! We use 256-bit encryption and follow industry-standard security protocols. Your payment information is never stored on our servers. All transactions are processed through secure payment gateways."
        },
        {
          q: "How do refunds work?",
          a: "If you're unsatisfied with a session, you can request a refund within 24 hours. Our team will review the case and process refunds for valid claims. Refunds are typically processed within 3-5 business days."
        },
        {
          q: "Can I get an invoice for my payments?",
          a: "Yes, you can download invoices for all your transactions from your dashboard. Go to 'Payment History' and click on any transaction to download a detailed invoice. This is great for keeping records or expense tracking."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: "⚙️",
      questions: [
        {
          q: "What if I face technical issues during a session?",
          a: "If you experience technical difficulties during a session, first try refreshing your browser or checking your internet connection. If problems persist, contact our 24/7 support team immediately. We'll help resolve the issue and can reschedule the session if needed."
        },
        {
          q: "Do I need any special software for online sessions?",
          a: "No special software is required! All online sessions are conducted through our built-in video conferencing system. You just need a modern web browser (Chrome, Firefox, Safari, or Edge) and a stable internet connection."
        },
        {
          q: "How do I reset my password?",
          a: "Click on 'Forgot Password' on the login page. Enter your registered email or phone number, and we'll send you a password reset link/code. Follow the instructions to create a new password."
        },
        {
          q: "Can I use Ponditil on my mobile phone?",
          a: "Yes! Ponditil is fully responsive and works perfectly on all devices. You can access our platform through any mobile browser. We're also developing dedicated iOS and Android apps, coming soon!"
        }
      ]
    }
  ];

  return (
    <main>
      <section className={`py-5 ${styles.hero}`}>
        {/* Decorative blobs - EXACT same as MainPage */}
        <span className={styles.blob1} aria-hidden="true" />
        <span className={styles.blob2} aria-hidden="true" />
        <span className={styles.gridOverlay} aria-hidden="true" />

        <div className="container position-relative">
          <div className="row align-items-center g-5">
            
            {/* ── LEFT COLUMN: FAQ Content ── */}
            <div className="col-12 col-lg-6">
              <div className={styles.badge}>❓ Frequently Asked Questions</div>

              <h1 className={styles.headline}>
                Everything You Need to{" "}
                <span className={styles.highlight}>Know</span>
              </h1>

              <p className={styles.subtext}>
                Can't find what you're looking for? Our support team is here to help 24/7.
              </p>

              {/* Contact Card */}
              <div className={`${styles.contactCard} shadow-lg`}>
                <div className={styles.contactIcon}>💬</div>
                <div className={styles.contactContent}>
                  <h3>Still have questions?</h3>
                  <p>Our support team is ready to help you</p>
                  <div className={styles.contactButtons}>
                    <Link href="/contact" className={styles.contactBtn}>
                      Contact Support →
                    </Link>
                    <Link href="mailto:admin@wevdevlab.org" className={styles.emailBtn}>
                      admin@wevdevlab.org
                    </Link>
                  </div>
                </div>
              </div>

              {/* Trust badges - EXACT same as MainPage */}
              <div className={`d-flex gap-3 mt-4 flex-wrap ${styles.trustRow}`}>
                <span className={styles.trustBadge}>✅ 24/7 Support</span>
                <span className={styles.trustBadge}>⭐ 5000+ Happy Users</span>
                <span className={styles.trustBadge}>💬 Quick Response</span>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Illustration ── */}
            <div className={`col-lg-6 d-none d-lg-flex justify-content-center ${styles.illustrationWrap}`}>
              <div className={styles.illustrationCard}>
                <img
                  src="/shape/learner.svg"
                  alt="FAQ illustration"
                  className={styles.illustration}
                />
                {/* Floating stats - EXACT same style as MainPage */}
                <div className={`${styles.floatCard} ${styles.floatCard1}`}>
                  <span>⚡</span> Avg. response: 5min
                </div>
                <div className={`${styles.floatCard} ${styles.floatCard2}`}>
                  <span>📚</span> 50+ help articles
                </div>
              </div>
            </div>

          </div>

          {/* ── FAQ Categories Section (Full Width) ── */}
          <div className="row mt-5 pt-5">
            <div className="col-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    {category.category}
                  </h2>
                  
                  <div className={styles.faqGrid}>
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 10 + faqIndex;
                      const isOpen = openFaqs.includes(globalIndex);
                      
                      return (
                        <div 
                          key={faqIndex} 
                          className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
                        >
                          <button
                            className={styles.faqQuestion}
                            onClick={() => toggleFaq(globalIndex)}
                          >
                            <span>{faq.q}</span>
                            <span className={styles.faqIcon}>
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          <div className={styles.faqAnswer}>
                            <p>{faq.a}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Help Center CTA ── */}
          <div className={`row mt-5 ${styles.helpCta}`}>
            <div className="col-12">
              <div className={styles.helpCard}>
                <div className={styles.helpContent}>
                  <h2>Need personalized help?</h2>
                  <p>Our support team is available 24/7 to answer all your questions</p>
                  <div className={styles.helpButtons}>
                    <Link href="/contact" className={styles.primaryBtn}>
                      Contact Us Now →
                    </Link>
                    <Link href="/user/dashboard" className={styles.secondaryBtn}>
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
                <div className={styles.helpIllustration}>
                  <img src="/icons/inbox.svg" alt="Support team" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default FaqPage;