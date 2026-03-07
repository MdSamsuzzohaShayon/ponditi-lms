'use client'

import { useEffect } from 'react';
import { toggleAuthUser, fetchAllUsersByAdmin } from '@/redux/reducers/userReducer';
import { toggleLoading } from '@/redux/reducers/elementsSlice';
import Dashboard from '@/components/admin/Dashboard';
import { fetchAllClassTypes } from '@/redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '@/redux/reducers/subjectReducer';
import { fetchAllTuitionms } from '@/redux/reducers/tuitionmReducer';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { UserRoleEnum } from '@/types/enums';


function index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.elements.isLoading);

  // get localstorage
  let isMounted = false;
  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = window.localStorage.getItem('user');
      const userData = JSON.parse(JSON.stringify(user));
      if (userData && userData.role === UserRoleEnum.ADMIN) {
        dispatch(toggleAuthUser(true));
        dispatch(toggleLoading(false));

        // Fetch data
        (async () => {
          await Promise.all([
            dispatch(fetchAllUsersByAdmin()),
            // dispatch(fetchAllClassTypes()),
            // dispatch(fetchAllSubjects()),
            // dispatch(fetchAllTuitionms())
          ]);
        })();
      } else {
        dispatch(toggleAuthUser(false));
        window.localStorage.removeItem('user');
        router.push('/admin/login');
      }
    }
    isMounted = true;
    // return () => {
    //   dispatch(resetAllUserList());
    // };
  }, []);

  // otherwise use dashboard component
  return (
    <div className="section-1 Admin">
      <Dashboard />
    </div>
  );
}

export default index;
