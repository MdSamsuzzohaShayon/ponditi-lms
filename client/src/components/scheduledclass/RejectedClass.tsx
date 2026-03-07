import { useSelector } from 'react-redux';
import React from 'react';
import ScheduledClassList from './ScheduledClassList';
import { useAppSelector } from '@/redux/store';

// SOR = student or teacher
function RejectedClass() {
  const rejectedSCOU = useAppSelector((state) => state.scheduledclass.rejectedSCOU);
//@ts-ignore
  const acceptRequestHandler = async (are, scheduledclassId) => {
    console.log(scheduledclassId);
  };
//@ts-ignore
  const rejectRequestHandler = async (are, scheduledclassId) => {
    are.preventDefault();
    console.log(scheduledclassId);
  };

  return (
    <div className="RejectedClass">
      <h1>Scheduled Class List</h1>
      {rejectedSCOU.length > 0 ? (
        <ScheduledClassList scheduledClassList={rejectedSCOU} acceptRequestHandler={acceptRequestHandler} rejectRequestHandler={rejectRequestHandler} finishClassHandler={()=>{}} />
      ) : (
        <div className="alert alert-danger">No request found</div>
      )}
    </div>
  );
}

export default RejectedClass;
