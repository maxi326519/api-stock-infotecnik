import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Product } from "../../../interfaces";
import axios from "axios";

export const GET_STOCK = "POST_STOCK";
export const UPDATE_STOCK = "POST_STOCK";

export function getSuppliers(): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      const inventory = axios.get("/inventory");

      dispatch({
        type: GET_STOCK,
        payload: inventory,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}


export function updateProduct(
  updateProduct: Product
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      axios.patch("/products", updateProduct);

      dispatch({
        type: UPDATE_STOCK,
        payload: updateProduct,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}