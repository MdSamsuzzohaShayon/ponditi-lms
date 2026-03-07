/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '@/config/axios';
import { setErrorList, toggleLoading, resetErrorList } from '@/redux/reducers/elementsSlice';
import { setAddSubject, resetAddSubject, setSubjectList } from '@/redux/reducers/subjectReducer';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';

// @ts-ignore
function SubjectAdd(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const addSubject = useAppSelector((state) => state.subject.addSubject);

  const addSubjectHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (addSubject.name === '') {
      return dispatch(setErrorList(['You must put subject name']));
    }
    // @ts-ignore
    if (addSubject?.classTypeId === 0) {
      return dispatch(setErrorList(['You must select classtype']));
    }
    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/subject/add', addSubject);
      // console.log(response);
      if (response.status === 201) {
        dispatch(resetErrorList());
        // add subject to the list
        dispatch(setSubjectList([response.data.subject, ...props.subjectList]));
        // reset subject
        dispatch(resetAddSubject());
      }
    } catch (error) {
      console.log(error);
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
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log({[iche.target.name]: iche.target.value});
    dispatch(setAddSubject({ [e.target.name]: e.target.value }));
  };

  const classTypeSelectionHandler = (e: React.ChangeEvent<HTMLSelectElement, HTMLInputElement>) => {
    // sshe.preventDefault();
    const classTypeIdList: number[] = [...addSubject.classTypeId];
    const targetedId = parseInt(e.target.value, 10);
    // @ts-ignore
    if (e.target.checked === true) {
      classTypeIdList.push(targetedId);
      dispatch(setAddSubject({ classTypeId: classTypeIdList }));
    } else {
      // remove
      const targetedIdIndex = classTypeIdList.indexOf(targetedId);
      classTypeIdList.splice(targetedIdIndex, 1);
      dispatch(setAddSubject({ classTypeId: classTypeIdList }));
    }
  };

  return (
    <div className="SubjectAdd">
      <div className="row mx-0 mb-3">
        <div className="col">
          <h1 className="h1">Add Subject</h1>
        </div>
      </div>
      <form className="mb-5" onSubmit={addSubjectHandler}>
        <div className="row mx-0 mb-3">
          <div className="col">
            <label htmlFor="name">Subject Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="E.G. Subject 1"
              name="name"
              aria-label="Recipient's username"
              aria-describedby="classtype-addon"
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <div className="row mx-0 mb-3">
          {props.classtypeList &&
          // @ts-ignore 
            props.classtypeList.map((sl) => (
              <div className="col-md-3" key={sl.id}>
                <div className="form-check form-check-inline">
                  {/* @ts-ignore */}
                  <input className="form-check-input" type="checkbox" id={sl.name} name={sl.name} value={sl.id} onChange={classTypeSelectionHandler} />
                  <label className="form-check-label" htmlFor={sl.name}>
                    {sl.name}
                  </label>
                </div>
              </div>
            ))}
        </div>
        <div className="row mb-3 mx-0 d-flex">
          <div className="col">
            <button className="btn btn-primary w-fit" type="submit" id="classtype-addon">
              Add Subject
            </button>
            <a href="#" className="btn btn-secondary w-fit" onClick={props.togglePartHandler} role="button">
              See subject list
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SubjectAdd;
