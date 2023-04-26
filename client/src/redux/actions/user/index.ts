import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, PostUser, User } from "../../../interfaces";
import axios from "axios";

export const POST_USER = "POST_USER";
export const GET_USERS = "GET_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export function postUser(
  newUser: PostUser
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const user: PostUser = {
        rol: newUser.rol,
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password,
      };

      const response = await axios.post("/user", user);

      dispatch({
        type: POST_USER,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function getUsers(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.get("/user");

      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function updateUser(
  user: User
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/user", user);

      dispatch({
        type: UPDATE_USER,
        payload: user,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function deleteUser(
  userId: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.delete(`/user/${userId}`);

      dispatch({
        type: DELETE_USER,
        payload: userId,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}
