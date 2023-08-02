import { PROFILES_STATE_CHANGE, PROFILE_STATE_CHANGE } from "../actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_PROFILE = (receivedData) => async (dispatch) => {
  try {
    const data =
      typeof receivedData == "string" ? JSON.parse(receivedData) : receivedData;
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(PROFILE_STATE_CHANGE, jsonValue);
    } catch (e) {}
    await dispatch({ type: PROFILE_STATE_CHANGE, payload: data });
  } catch (error) {}
};

export const SET_PROFILES = (receivedData) => async (dispatch) => {
  try {
    const data =
      typeof receivedData == "string" ? JSON.parse(receivedData) : receivedData;
    await dispatch({ type: PROFILES_STATE_CHANGE, payload: data });
  } catch (error) {}
};
