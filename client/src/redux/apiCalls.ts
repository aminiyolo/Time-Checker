import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  loginSet,
} from "../redux/userRedux";

import { axiosInstance } from "../config";
import { Dispatch } from "redux";

interface IUserData {
  ID: string;
  password: string;
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
  }
};
