/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { setUpdateUser } from '../../../redux/reducers/userReducer';
import RateInput from '../../register/RateInput';
// import { setSubjectList } from '../../../redux/reducers/subjectReducer';

import { useAppSelector, useAppDispatch } from '../../../redux/store';


type TuitionPlace = 'online' | 'tl' | 'sl';
interface RateChangePayload {
  name: 'ol_rate' | 'tl_rate' | 'sl_rate';
  rate: number;
}



function TutionDetail() {
  // const isMounted = true;

  const [placeItems, setPlaceItems] = useState<TuitionPlace[]>([]);
  const [isUserAvailable, setIsUserAvailable] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // const classtypeList = useAppSelector((state) => state.classtype.classtypeList);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const updateUser = useAppSelector((state) => state.user.updateUser);
  const tutionPlaces = useAppSelector((state) => state.search.searchTypeList);
  // const [available, setAvailable] = useState(currentUser.isAvailable);

  useEffect(() => {
    if (currentUser.isAvailable) {
      setIsUserAvailable(currentUser.isAvailable);
    }
  }, [currentUser]);

  // const classtypeInputChangeHandler = (iche) => {
  //   const val = parseInt(iche.target.value, 10);
  //   // console.log({val});
  //   // ClassTypeId
  //   dispatch(setUpdateUser({ ClassTypeId: [val] }));
  //   const newSubjectList = classtypeList.find((ctl) => ctl.id === val).Subjects;
  //   if (newSubjectList.length === 1) {
  //     dispatch(setUpdateUser({ SubjectId: [newSubjectList[0].id] }));
  //     dispatch(setSubjectList(newSubjectList));
  //   } else {
  //     dispatch(setSubjectList(newSubjectList));
  //   }
  // };
  // const subjectInputChangeHandler = (iche) => {
  //   const val = parseInt(iche.target.value, 10);
  //   // ClassTypeId
  //   dispatch(setUpdateUser({ SubjectId: [val] }));
  // };
  // Set default values with use effect
  // useEffect(() => {
  //   dispatch(
  //     setUpdateUser({
  //       firstname: currentUser?.firstname,
  //       lastname: currentUser?.lastname,
  //       email: currentUser?.email,
  //       district: currentUser?.district,
  //       presentaddress: currentUser?.presentaddress,
  //     })
  //   );
  // }, []);

  // const availablityChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>, isAvailable: boolean) => {
  //   console.log(e.target.checked);
  //   dispatch(setUpdateUser({ isAvailable }));
  //   setIsUserAvailable(isAvailable);
  //   // console.log(isAvailable);
  // };

  const availablityChangeHandler = (
    _e: React.ChangeEvent<HTMLInputElement>,
    isAvailable: boolean
  ) => {
    dispatch(setUpdateUser({ isAvailable }));
    setIsUserAvailable(isAvailable);
  };

  const tutionPlaceChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    tutionPlace: TuitionPlace
  ) => {
    if (e.target.checked) {
      const newPlaceItems = [...placeItems, tutionPlace];
      setPlaceItems(newPlaceItems);
      dispatch(setUpdateUser({ tutionplace: newPlaceItems }));
    } else {
      const newItems = placeItems.filter((pi) => pi !== tutionPlace);
      setPlaceItems(newItems);
      dispatch(setUpdateUser({ tutionplace: newItems }));
    }
  };

   /**
   * Tuition place toggle handler
   */
   const tuitionPlaceChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name as TuitionPlace;

    if (!e.target.checked) {
      if (name === 'online') {
        dispatch(setUpdateUser({ ol_rate: null }));
      } else if (name === 'tl') {
        dispatch(setUpdateUser({ tl_rate: null }));
      } else {
        dispatch(setUpdateUser({ sl_rate: null }));
      }
    }
  };



   const inputRateChangeHandler = ({ name, rate }: RateChangePayload) => {
    const newRate = Number.isNaN(rate) ? null : rate;

    dispatch(
      setUpdateUser({
        [name]: newRate,
      })
    );
  };

  return (
    <div className="TutionDetail">
      <div className="row mb-3 mx-0">
        <div className="col-md-12">
          <label htmlFor="isAvailable">Available Status</label>
          <div className="toggle d-flex">
            <div className="form-check w-fit">
              <input
                className="form-check-input"
                type="radio"
                name="available"
                id="available"
                onChange={(e) => availablityChangeHandler(e, true)}
                checked={isUserAvailable === true}
              />

              <label className="form-check-label" htmlFor="available">
                Available
              </label>
            </div>
            <div className="form-check w-fit mx-4">
              <input
                className="form-check-input"
                type="radio"
                name="notavailable"
                id="notavailable"
                checked={isUserAvailable !== true}
                onChange={(ace) => availablityChangeHandler(ace, false)}
              />
              <label className="form-check-label" htmlFor="notavailable">
                N/A
              </label>
            </div>
          </div>
        </div>
      </div>

      <RateInput user={currentUser} tuitionPlaceChange={tuitionPlaceChangeHandler} inputRateChange={inputRateChangeHandler} />
    </div>
  );
}

export default TutionDetail;
