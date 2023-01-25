import {
  SET_LOADING_SCREEN,
  SET_DYNAMIC_DATA,
} from '../actionTypes';

const initialState = {
  loading: false,
  dynamicData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_SCREEN: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SET_DYNAMIC_DATA: {
      return {
        ...state,
        dynamicData: action.payload,
      }
    }
    default:
      return state;
  }
}
