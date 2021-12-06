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

export const login = async (dispatch: Dispatch, userData: IUserData) => {
  dispatch(loginStart());

  try {
    const res = await axiosInstance.post("/users/login", userData);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
