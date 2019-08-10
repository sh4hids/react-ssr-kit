import * as types from './types';

const initialState = {
  allPosts: [],
};

const postReducers = function(state = initialState, { type, payload }) {
  switch (type) {
    case types.FETCH_ALL:
      return {
        ...state,
        isFetchingAll: true,
      };
    case types.FETCH_ALL_DONE:
      return {
        ...state,
        allPosts: [...payload],
        isFetchingAll: false,
        fetchAllDone: true,
      };
    case types.FETCH_ALL_FAILED:
      return {
        ...state,
        isFetchingAll: false,
        fetchAllDone: false,
        fetchAllFailed: true,
      };
    default:
      return state;
  }
};

export default postReducers;
