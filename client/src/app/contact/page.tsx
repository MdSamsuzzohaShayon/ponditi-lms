'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Contact.module.scss';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after submission
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // Contact information
  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["House 12, Road 5", "Block A, Banani", "Dhaka - 1213, Bangladesh"]
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+880 1234-567890", "+880 1987-654321", "24/7 Support Available"]
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: ["info@ponditi.com", "support@ponditi.com", "careers@ponditi.com"]
    },
    {
      icon: "🕐",
      title: "Working Hours",
      details: ["Sat - Thu: 9:00 AM - 8:00 PM", "Friday: 2:00 PM - 8:00 PM", "24/7 Online Support"]
    }
  ];

  // Support team
  const supportTeam = [
    {
      name: "Rafiq Ahmed",
      role: "Customer Support Lead",
      avatar: "/team/rafiq.jpg",
      email: "rafiq@ponditi.com",
      response: "Usually responds in 5min"
    },
    {
      name: "Fatima Begum",
      role: "Technical Support",
      avatar: "/team/fatima.jpg",
      email: "fatima@ponditi.com",
      response: "Usually responds in 10min"
    },
    {
      name: "Hasan Mahmud",
      role: "Tutor Support",
      avatar: "/team/hasan.jpg",
      email: "hasan@ponditi.com",
      response: "Usually responds in 15min"
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
            
            {/* ── LEFT COLUMN: Contact Info ── */}
            <div className="col-12 col-lg-6">
              <div className={styles.badge}>📞 Get in Touch</div>

              <h1 className={styles.headline}>
                We'd Love to{" "}
                <span className={styles.highlight}>Hear</span>
                <br />From You
              </h1>

              <p className={styles.subtext}>
                Have questions about our platform? Need help finding a tutor? 
                Our support team is here to help you 24/7.
              </p>

              {/* Contact Info Cards Grid */}
              <div className={styles.infoGrid}>
                {contactInfo.map((info, index) => (
                  <div key={index} className={styles.infoCard}>
                    <div className={styles.infoIcon}>{info.icon}</div>
                    <div className={styles.infoContent}>
                      <h3>{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className={styles.socialSection}>
                <h4>Follow Us</h4>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialLink}>
                    <img src="/icons/fb.svg" alt="Facebook" />
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <img src="/icons/twitter.svg" alt="Twitter" />
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <img src="/icons/linkedin.svg" alt="LinkedIn" />
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <img src="/icons/instagram.svg" alt="Instagram" />
                  </a>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Contact Form ── */}
            <div className={`col-lg-6 ${styles.formColumn}`}>
              <div className={`${styles.formCard} shadow-lg`}>
                <h2 className={styles.formTitle}>Send us a Message</h2>
                <p className={styles.formSubtitle}>
                  Fill out the form below and we'll get back to you within 24 hours
                </p>

                {isSubmitted ? (
                  <div className={styles.successMessage}>
                    <span className={styles.successIcon}>✓</span>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us. We'll respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label htmlFor="name" className={styles.label}>
                          👤 Full Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${styles.input}`}
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="email" className={styles.label}>
                          📧 Email Address
                        </label>
                        <input
                          type="email"
                          className={`form-control ${styles.input}`}
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="phone" className={styles.label}>
                          📱 Phone Number
                        </label>
                        <input
                          type="tel"
                          className={`form-control ${styles.input}`}
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="017XXXXXXXX"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="subject" className={styles.label}>
                          📌 Subject
                        </label>
                        <select
                          className={`form-select ${styles.input}`}
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="tutor">Become a Tutor</option>
                          <option value="payment">Payment Issue</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label htmlFor="message" className={styles.label}>
                          💬 Message
                        </label>
                        <textarea
                          className={`form-control ${styles.textarea}`}
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help you..."
                          required
                        />
                      </div>

                      <div className="col-12">
                        <div className={styles.formFooter}>
                          <p className={styles.privacyNote}>
                            By submitting, you agree to our{' '}
                            <Link href="/privacy">Privacy Policy</Link>
                          </p>
                          <button type="submit" className={`btn ${styles.submitBtn}`}>
                            Send Message →
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* ── Support Team Section ── */}
          <div className={`row mt-5 pt-5 ${styles.teamSection}`}>
            <div className="col-12 text-center">
              <div className={styles.teamBadge}>👥 Our Support Heroes</div>
              <h2 className={styles.teamTitle}>
                Meet Our <span className={styles.highlight}>Support Team</span>
              </h2>
              <p className={styles.teamSubtitle}>
                Friendly experts ready to help you 24/7
              </p>
            </div>

            {supportTeam.map((member, index) => (
              <div key={index} className="col-md-4">
                <div className={styles.teamCard}>
                  <div className={styles.teamAvatar}>
                    <img src={member.avatar} alt={member.name} />
                    <div className={styles.statusDot} />
                  </div>
                  <h3>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <a href={`mailto:${member.email}`} className={styles.teamEmail}>
                    {member.email}
                  </a>
                  <p className={styles.teamResponse}>{member.response}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Map Section ── */}
          <div className={`row mt-5 ${styles.mapSection}`}>
            <div className="col-12">
              <div className={styles.mapCard}>
                <div className={styles.mapPlaceholder}>
                  {/* Replace with actual Google Maps iframe */}
                  <div className={styles.mapOverlay}>
                    <img src="/shape/map-placeholder.svg" alt="Map" />
                    <div className={styles.mapLocation}>
                      <span className={styles.pin}>📍</span>
                      <p>Ponditil HQ, Banani, Dhaka</p>
                    </div>
                  </div>
                </div>
                <div className={styles.mapInfo}>
                  <h3>Visit Our Office</h3>
                  <p>We'd love to meet you in person!</p>
                  <Link href="https://maps.google.com" target="_blank" className={styles.mapBtn}>
                    Get Directions →
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default ContactPage;