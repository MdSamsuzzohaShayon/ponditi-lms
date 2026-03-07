import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserList from './UserList';
import { scheduledclassStatus } from '../../config/keys';
import { setSelectedTabElement } from '../../redux/reducers/adminReducer';
import { useAppSelector } from '@/redux/store';

const { APPROVED, REJECTED, PENDING } = scheduledclassStatus;

function UserContent() {
  const dispatch = useDispatch();
  const allUserList = useAppSelector((state) => state.user.allUserList);
  const allPendingUserList = useAppSelector((state) => state.user.allPendingUserList);
  const allRejectedUserList = useAppSelector((state) => state.user.allRejectedUserList);
  const allApprovedUserList = useAppSelector((state) => state.user.allApprovedUserList);
  const selectedTabElement = useAppSelector((state) => state.admin.selectedTabElement);

  const showConetent = () => {
    switch (selectedTabElement) {
      case APPROVED: {
        return <UserList allUserList={allApprovedUserList} selectedTabElement={selectedTabElement} />;
      }
      case PENDING: {
        return <UserList allUserList={allPendingUserList} selectedTabElement={selectedTabElement} />;
      }
      case REJECTED: {
        return <UserList allUserList={allRejectedUserList} selectedTabElement={selectedTabElement} />;
      }

      default: {
        return <UserList allUserList={allUserList} selectedTabElement={selectedTabElement} />;
      }
    }
  };
  return <div className="UserContent">{showConetent()}</div>;
}

export default UserContent;
