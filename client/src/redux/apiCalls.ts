import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  loginSet,
} from "../redux/userRedux";

import { axiosInstance } from "../config";
import { Dispatch } from "redux";
import { loadData } from "./recordRedux";

interface IUserData {
  ID: string;
  password: string;
}

interface IRecordData {
  id: string;
  date: string;
  category: string;
  total: number;
}

interface IDate {
  date: string;
  id: string;
}

export const initialize = (dispatch: Dispatch) => {
  dispatch(loginSet());
};

export const login = async (dispatch: Dispatch, userData: IUserData) => {
  dispatch(loginStart());

  try {
    const res = await axiosInstance.post("/users/login", userData);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch: Dispatch, token: string) => {
  console.log("logout");
  try {
    await axiosInstance.get("/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(logoutSuccess());
  } catch (err) {
    console.log(err);
  }
};

export const uploadRecord = async (dispatch: Dispatch, data: IRecordData) => {
  try {
    const res = await axiosInstance.post("/records/post", data);
    console.log(res.data);
    dispatch(loadData(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getRecord = async (dispatch: Dispatch, params: IDate) => {
  try {
    const res = await axiosInstance.get("/records/get", {
      params: { ...params },
    });
    console.log(res.data);
    dispatch(loadData(res.data));
  } catch (err) {
    console.log(err);
  }
};
