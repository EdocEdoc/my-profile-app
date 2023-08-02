import { combineReducers } from "redux";
import { profileReducers } from "./profileReducers";

const reducers = combineReducers({
  profileState: profileReducers,
});

export default reducers;
