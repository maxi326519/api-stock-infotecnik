import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Config, RootState } from "../../../interfaces";
import axios from "axios";

export const GET_CONFIGURATIONS = "GET_CONFIGURATIONS";
export const UPDATE_CONFIGURATIONS = "UPDATE_CONFIGURATIONS";

export function getConfig(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const configurations = await axios.get("/configurations");

      dispatch({
        type: GET_CONFIGURATIONS,
        payload: configurations.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function updateConfig(
  updateConfig: Config
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/configurations", updateConfig);

      dispatch({
        type: UPDATE_CONFIGURATIONS,
        payload: updateConfig,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}
