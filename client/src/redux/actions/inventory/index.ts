import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Stock } from "../../../interfaces";
import axios from "axios";

export const GET_INVENTORY = "GET_INVENTORY";
export const UPDATE_STOCK = "UPDATE_STOCK";

export function getInventory(): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      const inventory = await axios.get("/inventory");

      dispatch({
        type: GET_INVENTORY,
        payload: inventory.data,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}


export function updateStock(
  updateStock: Stock
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      await axios.patch("/products", updateStock);

      dispatch({
        type: UPDATE_STOCK,
        payload: updateStock,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}