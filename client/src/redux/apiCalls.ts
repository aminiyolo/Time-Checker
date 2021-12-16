import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  loginSet,
} from "../redux/userRedux";

import { axiosInstance } from "../config";
import { Dispatch } from "redux";
import { loadStart, loadSuccess, loadFailure } from "./recordRedux";

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
  try {
    await axiosInstance.get("/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(logoutSuccess());
  } catch (err) {
    console.log(err);
    alert("잠시 후에 다시 시도해주세요.");
  }
};

export const uploadRecord = async (dispatch: Dispatch, data: IRecordData) => {
  dispatch(loadStart());

  try {
    const res = await axiosInstance.post("/records/post", data);
    dispatch(loadSuccess(res.data));
  } catch (err) {
    dispatch(loadFailure());
  }
};

export const getRecord = async (dispatch: Dispatch, params: IDate) => {
  dispatch(loadStart());

  try {
    const res = await axiosInstance.get("/records/get", {
      params: { ...params },
    });
    dispatch(loadSuccess(res.data));
  } catch (err) {
    dispatch(loadFailure());
  }
};
