/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SearchParamsInterface } from '../../types/redux/searchInterface';
import { ETuitionStyle } from '../../types/enums';
import { SingleUserInterface } from '../../types/redux/userInterface';

export const initialSearchParams: SearchParamsInterface = {
  location: '',
  ClassTypeId: 0, // id
  SubjectId: 0, // id
  tutionplace: ETuitionStyle.ANY, // Online - tution location
  TuitionmId: 0,
};

const initialTuitionType = [
  {
    id: 1,
    type: ETuitionStyle.ONLINE,
    text: 'Online',
  },
  {
    id: 2,
    type: ETuitionStyle.TL,
    text: "Teacher's Location",
  },
  {
    id: 3,
    type: ETuitionStyle.SL,
    text: "Student's Location",
  },
];

const initialSeachUserList: SingleUserInterface[] = [];

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTypeList: initialTuitionType,
    /**
     * @dynamic or changable elements of the website
     */
    searchParams: initialSearchParams,
    searchAllUserList: [],

    /**
     * @function for paginations
     */
    searchUserList: initialSeachUserList,
    rpStart: 0, // rp = result pagination
    rpTotal: 10,
    rpCurrentPage: 1,
    rpTotalPage: 1,
  },
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    setSearchUserList: (state, action) => {
      state.searchUserList = action.payload;
    },
    resetSearchUserList: (state) => {
      state.searchUserList = [];
    },
    setSearchAllUserList: (state, action) => {
      state.searchAllUserList = action.payload;
    },
    setRPStart: (state, action) => {
      state.rpStart = action.payload;
    },
    setRPTotal: (state, action) => {
      state.rpTotal = action.payload;
    },
    setRPCurrentPage: (state, action) => {
      state.rpCurrentPage = action.payload;
    },
    setRPTotalPage: (state, action) => {
      state.rpTotalPage = action.payload;
    },
  },
});

export const { setSearchParams, setSearchUserList, setSearchAllUserList, setRPStart, setRPTotal, setRPTotalPage, setRPCurrentPage, resetSearchUserList } =
  searchSlice.actions;

export default searchSlice.reducer;
