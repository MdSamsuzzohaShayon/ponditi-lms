'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { setSendOTP, setVerifyCode, setHasPhone, setUserSendVerifyStep } from '@/redux/reducers/userReducer';
import { toggleLoading, setErrorList, setSuccessMessageList, resetErrorList } from '@/redux/reducers/elementsSlice';
import axios from '@/config/axios';
import countryPhoneCodes from '@/data/countryPhoneCode.json';
import { VERIFY_CODE } from '@/config/keys';
import styles from '@/styles/Register.module.scss';

function SendCode() {
  const dispatch = useDispatch();
  const [noValidate, setNoValidate] = useState(true);
  
  const sendOTP = useAppSelector((state) => state.user.sendOTP);

  const validatePhoneNumber = (phone: string): { isValid: boolean; error?: string } => {
    if (!phone) return { isValid: false, error: 'Phone number is required' };
    if (phone.length !== 11) return { isValid: false, error: 'Number must be 11 digits' };
    if (phone[0] !== '0') return { isValid: false, error: 'Number must start with 0' };
    return { isValid: true };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(setSendOTP({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoValidate(false);
    
    const validation = validatePhoneNumber(sendOTP.phone);
    if (!validation.isValid) {
      dispatch(setErrorList([validation.error || 'Invalid phone number']));
      return;
    }

    try {
      dispatch(toggleLoading(true));
      
      const response = await axios.post('/user/sendotp', sendOTP, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201 || response.status === 208) {
        dispatch(setVerifyCode({ phone: sendOTP.phone, otp: '' }));
        dispatch(setHasPhone(true));
        dispatch(setUserSendVerifyStep(VERIFY_CODE));
        dispatch(resetErrorList());
        dispatch(setSuccessMessageList([response.data.msg]));
      }
    } catch (error: any) {
      dispatch(setErrorList([error?.response?.data?.msg || 'Failed to send code. Please try again.']));
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const renderPhoneError = () => {
    if (noValidate) return null;
    const validation = validatePhoneNumber(sendOTP.phone);
    if (!validation.isValid) {
      return <p className={styles.errorMessage}>{validation.error}</p>;
    }
    return null;
  };

  return (
    <>
      <h2 className={styles.formTitle}>Get Started with Phone</h2>
      
      <form onSubmit={handleSubmit} noValidate={noValidate}>
        <div className="row g-3 mb-3">
          <div className="col-12">
            <label htmlFor="phone" className={styles.label}>
              📱 Mobile Number
            </label>
            
            <div className={styles.phoneInputGroup}>
              <select
                name="cc"
                id="cc"
                className={`form-select ${styles.countryCodeSelect}`}
                value={sendOTP.cc}
                onChange={handleInputChange}
              >
                {countryPhoneCodes.map((country, idx) => (
                  <option key={idx} value={country.code}>
                    +{country.code}
                  </option>
                ))}
              </select>
              
              <input
                type="tel"
                name="phone"
                id="phone"
                className={`form-control ${styles.phoneInput}`}
                placeholder="17XXXXXXXX"
                value={sendOTP.phone}
                onChange={handleInputChange}
              />
            </div>
            
            {renderPhoneError()}
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className={`btn ${styles.submitBtn}`}
          >
            Send Verification Code →
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/user/login" className={styles.loginLink}>
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </>
  );
}

export default SendCode;