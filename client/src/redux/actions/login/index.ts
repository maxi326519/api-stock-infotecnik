import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Login, RootState, User } from "../../../interfaces";
import axios from "axios";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const PRESISTENCE = "PRESISTENCE";

export function login(
  user: Login
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.post("/login", user);

      dispatch({
        type: LOGIN,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function logOut() {
  return {
    type: LOGOUT,
  };
}

export function persistence(
  user: User
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({
        type: PRESISTENCE,
        payload: user,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}
