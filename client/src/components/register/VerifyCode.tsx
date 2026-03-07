'use client'

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { 
  setCurrentUser, 
  setUserFormsType, 
  setVerifyCode, 
  resetVerifyCode, 
  setHasPhone, 
  setUserSendVerifyStep 
} from '@/redux/reducers/userReducer';
import { setErrorList, resetErrorList, toggleLoading, setSuccessMessageList } from '@/redux/reducers/elementsSlice';
import axios from '@/config/axios';
import { REGISTER, SEND_CODE, VERIFY_CODE } from '@/config/keys';
import styles from '@/styles/Register.module.scss';

function VerifyCode() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const verifyCode = useAppSelector((state) => state.user.verifyCode);
  const hasPhone = useAppSelector((state) => state.user.hasPhone);
  const sendOTP = useAppSelector((state) => state.user.sendOTP);

  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    dispatch(setVerifyCode({ otp: newOtpValues.join('') }));
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verifyCode.phone || otpValues.join('').length !== 6) {
      dispatch(setErrorList(['Please enter the complete 6-digit code']));
      return;
    }

    try {
      dispatch(toggleLoading(true));
      
      const response = await axios.put('/user/verifyotp', verifyCode, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        dispatch(resetErrorList());
        dispatch(setCurrentUser({ phone: verifyCode.phone }));
        dispatch(setUserSendVerifyStep(REGISTER));
        router.push(`/user/register/form?userId=${response.data.userId}`);
        dispatch(resetVerifyCode());
      }
    } catch (error: any) {
      dispatch(setErrorList([error?.response?.data?.msg || 'Verification failed']));
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const handleResendCode = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      dispatch(toggleLoading(true));
      
      const response = await axios.post('/user/sendotp', sendOTP, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201 || response.status === 208) {
        dispatch(setVerifyCode({ phone: sendOTP.phone, otp: '' }));
        dispatch(setHasPhone(true));
        dispatch(setUserFormsType(VERIFY_CODE));
        dispatch(setSuccessMessageList(['Code resent successfully']));
        
        setOtpValues(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error: any) {
      dispatch(setErrorList([error?.response?.data?.msg || 'Failed to resend code']));
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const handleNeedCode = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setUserFormsType(SEND_CODE));
    dispatch(resetVerifyCode());
    dispatch(setHasPhone(false));
  };

  return (
    <>
      <h2 className={styles.formTitle}>Enter Verification Code</h2>
      <p className={styles.formSubtitle}>
        We've sent a 6-digit code to <strong>{verifyCode.phone || sendOTP.phone}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        {!hasPhone && (
          <div className="row g-3 mb-3">
            <div className="col-12">
              <label htmlFor="phone" className={styles.label}>
                📱 Phone Number
              </label>
              <input
                type="tel"
                className={`form-control ${styles.input}`}
                name="phone"
                id="phone"
                value={verifyCode.phone}
                onChange={(e) => dispatch(setVerifyCode({ phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        )}

        <div className="row g-3 mb-3">
          <div className="col-12">
            <label className={styles.label}>
              🔐 Verification Code
            </label>
            <div className={styles.otpContainer}>
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  className={`form-control ${styles.otpInput}`}
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            type="button"
            className={styles.textButton}
            onClick={handleResendCode}
          >
            🔄 Resend Code
          </button>

          <button
            type="button"
            className={styles.textButton}
            onClick={handleNeedCode}
          >
            📲 Need new code?
          </button>
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className={`btn ${styles.submitBtn}`}
          >
            Verify & Continue →
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/user/login" className={styles.loginLink}>
            ← Back to Sign in
          </Link>
        </div>
      </form>
    </>
  );
}

export default VerifyCode;