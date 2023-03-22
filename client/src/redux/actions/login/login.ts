import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Login, RootState } from "../../../interfaces";
import axios from "axios";

export const LOGIN = "LOGIN";
export const LOG_OUT = "LOG_OUT";

export function login(
  user: Login
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      let response = {};
      let error = null;

      await axios
        .post("/login", user)
        .then((res: any) => {
          response = res.data;
        })
        .catch((err: any) => {
          error = err.response.data.error;
        });

      if (error) throw new Error(error);

      dispatch({
        type: LOGIN,
        payload: response,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function logOut(
  user: Login
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({
        type: LOG_OUT,
        payload: null,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
