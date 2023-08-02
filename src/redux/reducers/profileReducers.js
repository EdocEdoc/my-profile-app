import {
  CLEAR_DATA,
  PROFILES_STATE_CHANGE,
  PROFILE_STATE_CHANGE,
} from "../actionTypes";

const initialState = {
  profile: null,
  profiles: [],
  withError: false,
  error: null,
  isLoading: false,
};

export const profileReducers = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_STATE_CHANGE:
      return {
        ...state,
        profile: action.payload,
      };

    case PROFILES_STATE_CHANGE:
      return {
        ...state,
        profiles: action.payload,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
