import { useDispatch, useSelector } from "react-redux";
import { PROFILE_STATE_CHANGE } from "../redux/actionTypes";
import { SET_PROFILE, SET_PROFILES } from "../redux/actions/profileActions";
import AppStack from "./appStack";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Routes = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profileState.profile);
  const profilesState = useSelector((state) => state.profileState.profiles);

  const getProfiles = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
      });
      const result = await res.json();
      if (result.length > 0) {
        dispatch(SET_PROFILES(result));
      }
    } catch (error) {
      console.log("🚀 ~ file: route.js:15 ~ getProfiles ~ error:", error);
    }
  };

  const getProfileData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(PROFILE_STATE_CHANGE);
      jsonValue != null ? JSON.parse(jsonValue) : null;
      if (jsonValue) {
        dispatch(SET_PROFILE(jsonValue));
      }
    } catch (error) {
      console.log("🚀 ~ file: route.js:29 ~ getProfileData ~ error:", error);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    if (!profileState) {
      getProfileData();
    } else {
      console.log(
        "🚀 ~ file: route.js:21 ~ useEffect ~ profileState:",
        profileState
      );
    }
    console.log(
      "🚀 ~ file: route.js:55 ~ Routes ~ profilesState:",
      profilesState.length
    );
  }, [profileState, profilesState]);

  return <AppStack />;
};

export default Routes;
