/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleAuthUser } from '@/redux/reducers/userReducer';
import Detail from './Detail';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';

// inspire -  https://dribbble.com/shots/4986374-Job-dashboard-profile/attachments/1115022?mode=media

function Profile() {
  let isMounted = false;
  let isFetched = false;
  const dispatch = useDispatch();
  const router = useRouter();

  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (isMounted === false) {
      const user = localStorage.getItem('user');
      // console.log(user);
      if (user === null) {
        dispatch(toggleAuthUser(false));
        router.push('/user/login');
      } else {
        dispatch(toggleAuthUser(true));
      }
    }
    isMounted = true;
  }, []);

  /*
  const fetchSingleUser = async (userId) => {
    try {
      dispatch(toggleLoading(true));
      // console.log('try');
      const response = await axios.get(`/user/single/${userId}`);
      if (response.status === 200) {
        // console.log(response);
        // const newUser = Object.assign(currentUser, response.data.user);
        dispatch(setCurrentUser({ ...response.data.user }));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      dispatch(toggleLoading(false));
    }
  };
  */

  useEffect(() => {
    if (authUserInfo.id) {
      // console.log(authUserInfo);
      // fetchSingleUser(authUserInfo.id).catch((err) => console.log(err));

      isFetched = true;
    }
  }, [authUserInfo]);
  return (
    <div className="Profile m-4">
      {/* general detail  */}
      {/* userDetail, update, search, userId */}
      <Detail userDetail={currentUser} update search={false} userId={authUserInfo.id || null} />
      {/* updateable detail  */}
      
    </div>
  );
}

export default Profile;
