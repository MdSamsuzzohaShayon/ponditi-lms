/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '@/config/axios';
import MessageList from '@/components/elements/MessageList';
import Loader from '@/components/elements/Loader';
import { setErrorList, toggleLoading, resetErrorList } from '@/redux/reducers/elementsSlice';
import { setSubjectList } from '@/redux/reducers/subjectReducer';
import SubjectAdd from './SubjectAdd';
import List from './List';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';

function SubjectContent() {
  const isMounted = false;

  const [addContent, setAddContent] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const subjectList = useAppSelector((state) => state.subject.subjectList);
  const classtypeList = useAppSelector((state) => state.classtype.classtypeList);
  // const subjectList = [];

  const togglePartHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setAddContent((prevState) => (prevState = !prevState));
  };

  const deleteSubjectHandler = async (e: React.SyntheticEvent, subjectId: number) => {
    e.preventDefault();
    // console.log(subjectId);
    try {
      dispatch(toggleLoading(true));
      if (!subjectId) {
        return dispatch(setErrorList(['No id found']));
      }
      const response = await axios.delete(`/subject/delete/${subjectId}`);
      if (response.status === 200) {
        const newSubjectList = subjectList.filter((ctl) => ctl.id !== subjectId);
        dispatch(setSubjectList(newSubjectList));
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
  };

  return (
    <div className="ClassTypeContent w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <MessageList />
          {addContent ? (
            <SubjectAdd togglePartHandler={togglePartHandler} classtypeList={classtypeList} subjectList={subjectList} />
          ) : (
            <>
              <List list={subjectList} title="Subject List" deleteHandler={deleteSubjectHandler} />
              <div className="row my-3 mx-0">
                <a href="#" className="btn btn-primary w-fit" onClick={togglePartHandler} role="button">
                  Add Subject
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SubjectContent;
