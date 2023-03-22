import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Product } from "../../../interfaces";
import axios from "axios";

export const POST_PRODUCT = "POST_PRODUCT";
export const GET_PRODUCT = "GET_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export function postProduct(
  newProduct: Product
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      const response = await axios.post("/products", newProduct);

      dispatch({
        type: POST_PRODUCT,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

export function getProduct(): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      const products = await axios.get("/products");

      dispatch({
        type: GET_PRODUCT,
        payload: products.data,
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

      await axios.patch("/products", updateProduct);

      dispatch({
        type: UPDATE_PRODUCT,
        payload: updateProduct,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
