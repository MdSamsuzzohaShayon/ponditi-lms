/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../config/axios';
import MessageList from '../elements/MessageList';
import Loader from '../elements/Loader';
import { setErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import { setClasstypeList, setAddClassType } from '../../redux/reducers/classtypeReducer';
import ClassTypeAdd from './ClassTypeAdd';
import List from './List';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';

function ClassTypeContent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [addContent, setAddContent] = useState(false);

  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const classtypeList = useAppSelector((state) => state.classtype.classtypeList);

  const deleteClassTypeHandler = async (e: React.SyntheticEvent, classTypeId: number) => {
    e.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const response = await axios.delete(`/classtype/delete/${classTypeId}`);
      if (response.status === 200) {
        const newClassTypeList = classtypeList.filter((ctl) => ctl.id !== classTypeId);
        dispatch(setClasstypeList(newClassTypeList));
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

  const togglePartHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-return-assign
    setAddContent((prevState) => (prevState = !prevState));
  };

  return (
    <div className="ClassTypeContent w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <MessageList />
          {addContent ? (
            <ClassTypeAdd togglePartHandler={togglePartHandler} classtypeList={classtypeList} />
          ) : (
            <>
              <List list={classtypeList} title="Class Type List" deleteHandler={deleteClassTypeHandler} />
              <div className="row my-3 mx-0">
                <a href="#" className="btn btn-primary w-fit" onClick={togglePartHandler} role="button">
                  Add Class
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ClassTypeContent;
