'use client'

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChangePass from '@/components/changepassword/ChangePass';
import Loader from '@/components/elements/Loader';
import MessageList from '@/components/elements/MessageList';
import { toggleLoading, resetErrorList } from '@/redux/reducers/elementsSlice';
import { toggleAuthUser } from '@/redux/reducers/userReducer';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';


function index() {
  let isMounted = false;
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoading = useAppSelector((state) => state.elements.isLoading);

  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = localStorage.getItem('user');
      if (user === null) {
        dispatch(toggleAuthUser(false));
        router.push('/user/login');
      } else {
        dispatch(toggleAuthUser(true));
      }
      dispatch(resetErrorList());
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);

  return (
    <main>
      <div className="container mt-2">
        <MessageList />
      </div>
      <div className="changepassword">{isLoading ? <Loader /> : <ChangePass />}</div>
    </main>
  );
}

export default index;
