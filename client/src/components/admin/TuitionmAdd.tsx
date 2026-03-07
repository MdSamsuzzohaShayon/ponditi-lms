/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '@/config/axios';
import { resetErrorList, setErrorList, toggleLoading } from '@/redux/reducers/elementsSlice';
import { setAddTuitionm, setTuitionmList, resetAddTuitionm } from '@/redux/reducers/tuitionmReducer';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';

// @ts-ignore
function TuitionmAdd(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const classtypeList = useAppSelector((state) => state.classtype.classtypeList);
  const addTuitionm = useAppSelector((state) => state.tuitionm.addTuitionm);

  const addTuitionmHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (addTuitionm.name === '') {
      return dispatch(setErrorList(['You must put tuitionm name']));
    }

    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/tuitionm/add', addTuitionm);
      // console.log(response);
      if (response.status === 201) {
        // response.data.tuitionm
        dispatch(setTuitionmList([response.data.tuitionm, ...props.tuitionmList]));
        dispatch(resetAddTuitionm());
        dispatch(resetErrorList());
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
        router.push('/admin/login');
      }
    } finally {
      // console.log('finally');
      dispatch(toggleLoading(false));
    }
    return null;
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log({[e.target.name]: e.target.value});
    dispatch(setAddTuitionm({ [e.target.name]: e.target.value }));
  };

  const classtypeSelectionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // sshe.preventDefault();
    const ClassTypeIdList: number[] = [...addTuitionm.ClassTypeId];
    const targetedId: number = parseInt(e.target.value, 10);
    // @ts-ignore
    if (e.target.checked === true) {
      ClassTypeIdList.push(targetedId);
      dispatch(setAddTuitionm({ ClassTypeId: ClassTypeIdList }));
    } else {
      // remove
      const targetedIdIndex = ClassTypeIdList.indexOf(targetedId);
      ClassTypeIdList.splice(targetedIdIndex, 1);
      dispatch(setAddTuitionm({ ClassTypeId: ClassTypeIdList }));
    }
  };
  return (
    <div className="TuitionmAdd">
      <div className="row mx-0 mb-3">
        <div className="col">
          <h1 className="h1">Add Tuition Medium</h1>
        </div>
      </div>
      <form className="mb-5" onSubmit={addTuitionmHandler}>
        <div className="row mx-0 mb-3">
          <div className="col">
            <label htmlFor="name">Medium Name</label>
            <input type="text" className="form-control" name="name" onChange={inputChangeHandler} />
          </div>
        </div>
        {/* =============================
        Do not delete it for now (if to delete clean all related functions ) */}
        {/* <div className="row mx-0 mb-3">
          {classtypeList &&
            classtypeList.map((sl, slIdx) => (
              <div className="col-md-3" key={slIdx}>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id={sl.name} name={sl.name} value={sl.id} onChange={classtypeSelectionHandler} />
                  <label className="form-check-label" htmlFor={sl.name}>
                    {sl.name}
                  </label>
                </div>
              </div>
            ))}
        </div> */}
        <div className="row mb-3 mx-0 d-flex">
          <div className="col">
            <button className="btn btn-primary w-fit" type="submit" id="tuitionm-addon">
              Add Class Type
            </button>
            <a href="#" className="btn btn-secondary w-fit" onClick={props.togglePartHandler} role="button">
              See class list
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TuitionmAdd;
