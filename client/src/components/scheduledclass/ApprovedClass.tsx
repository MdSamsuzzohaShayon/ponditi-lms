import { useSelector } from 'react-redux';
import React from 'react';
import ScheduledClassList from './ScheduledClassList';
import { useAppSelector } from '@/redux/store';

// SOR = student or teacher
function ApprovedClass() {
  const acceptedSCOU = useAppSelector((state) => state.scheduledclass.acceptedSCOU);
  // @ts-ignore
  const acceptRequestHandler = async (are, scheduledclassId) => {
    console.log(scheduledclassId);
  };
  // @ts-ignore
  const rejectRequestHandler = async (are, scheduledclassId) => {
    are.preventDefault();
    console.log(scheduledclassId);
  };

  return (
    <div className="ApprovedClass">
      <h1>Scheduled Class List</h1>
      {acceptedSCOU.length > 0 ? (
        <ScheduledClassList scheduledClassList={acceptedSCOU} acceptRequestHandler={acceptRequestHandler} rejectRequestHandler={rejectRequestHandler} finishClassHandler={()=>{}} />
      ) : (
        <div className="alert alert-danger">No request found</div>
      )}
    </div>
  );
}

export default ApprovedClass;
