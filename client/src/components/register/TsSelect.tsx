import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRegisterableUser } from '../../redux/reducers/userReducer';
import { UserRoleEnum } from '@/types/enums';
import { useAppSelector } from '@/redux/store';



// Teacher student selection
function TsSelect() {
  const dispatch = useDispatch();
  const registerableUser = useAppSelector((state) => state.user.registerableUser);
  // @ts-ignore
  const toggleRole = (tre, role) => {
    tre.preventDefault();
    dispatch(setRegisterableUser({ role }));
  };

  return (
    <div className="row mb-3 mx-0 text-center">
      <div className="buttons my-3">
        <button
          type="button"
          onClick={(e) => toggleRole(e, UserRoleEnum.TEACHER)}
          className={registerableUser.role === UserRoleEnum.TEACHER ? 'btn btn-primary border  p-5 fs-3' : 'btn btn-primary-outline border  p-5 fs-3'}
        >
          Register as teacher
        </button>
        <button
          type="button"
          className={registerableUser.role === UserRoleEnum.STUDENT ? 'btn btn-primary border  p-5 fs-3' : 'btn btn-primary-outline border  p-5 fs-3'}
          onClick={(e) => toggleRole(e, 'STUDENT')}
        >
          Register as student
        </button>
      </div>
    </div>
  );
}

export default TsSelect;
