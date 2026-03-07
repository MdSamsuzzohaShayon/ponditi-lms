import { useSelector, useDispatch } from 'react-redux';
import ScheduledClassList from './ScheduledClassList';
import { toggleLoading, setErrorList } from '@/redux/reducers/elementsSlice';
import { setRequestedSCOU, setAcceptedSCOU, setRejectedSCOU } from '@/redux/reducers/scheduledclassReducer';
import { resetAuthUserInfo } from '@/redux/reducers/userReducer';
import axios from '@/config/axios';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';

// SOR = student or teacher
function SOTRequest() {
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * @select from redux store
   * */
  const requestedSCOU = useAppSelector((state) => state.scheduledclass.requestedSCOU);
  const acceptedSCOU = useAppSelector((state) => state.scheduledclass.acceptedSCOU);
  const rejectedSCOU = useAppSelector((state) => state.scheduledclass.rejectedSCOU);

  /**
   * @action handler
   */
  // @ts-ignore
  const acceptRequestHandler = async (are, scheduledclassId) => {
    are.preventDefault();
    try {
      // @ts-ignore
      dispatch(toggleLoading());
      // check recever id and current user id
      const response = await axios.put(`/scheduledclass/accept/${scheduledclassId}`);
      if (response.status === 200 || response.status === 202) {
        // find Item and move from  requestedSCOU to acceptedSCOU
        const newAcceptedSCOU = requestedSCOU.find((rs) => rs.id === scheduledclassId);
        const newRequestedSCOU = requestedSCOU.filter((rs) => rs.id !== scheduledclassId);
        dispatch(setAcceptedSCOU([...acceptedSCOU, newAcceptedSCOU]));
        dispatch(setRequestedSCOU(newRequestedSCOU));
      }
    } catch (error) {
      console.error(error);
      // @ts-ignore
      if (error?.response?.data?.msg) {
        // @ts-ignore
        dispatch(setErrorList([error.response.data.msg]));
      }
      // @ts-ignore
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        dispatch(resetAuthUserInfo());
        router.push('/user/login');
      }
    } finally {
      // @ts-ignore
      dispatch(toggleLoading());
    }
  };

  // @ts-ignore
  const rejectRequestHandler = async (are, scheduledclassId) => {
    are.preventDefault();
    try {
      // @ts-ignore
      dispatch(toggleLoading());
      // check recever id and current user id
      const response = await axios.put(`/scheduledclass/reject/${scheduledclassId}`);
      if (response.status === 200 || response.status === 202) {
        const newRejectedSCOU = requestedSCOU.find((rs) => rs.id === scheduledclassId);
        const newRequestedSCOU = requestedSCOU.filter((rs) => rs.id !== scheduledclassId);
        dispatch(setRejectedSCOU([...rejectedSCOU, newRejectedSCOU]));
        dispatch(setRequestedSCOU(newRequestedSCOU));
      }
    } catch (error) {
      console.log(error);
      // @ts-ignore
      if (error?.response?.data?.msg) {
        // @ts-ignore
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      // @ts-ignore
      dispatch(toggleLoading());
    }
  };

  return (
    <div className="SOTRequest">
      <h1>Requested Scheduled Class List</h1>
      {requestedSCOU.length > 0 ? (
        <ScheduledClassList scheduledClassList={requestedSCOU} acceptRequestHandler={acceptRequestHandler} rejectRequestHandler={rejectRequestHandler} finishClassHandler={()=>{}} />
      ) : (
        <div className="alert alert-danger">No request found</div>
      )}
    </div>
  );
}

export default SOTRequest;
