import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Invoices } from "../../../interfaces";
import axios from "axios";

export const POST_INVOICE = "POST_INVOICE";
export const GET_INVOICE = "GET_INVOICE";
export const UPDATE_INVOICE = "UPDATE_INVOICE";

export function postInvoice(
  newInventory: any
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      const response = await axios.post("/invoices", newInventory);

      dispatch({
        type: POST_INVOICE,
        payload: response.data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getInvoice(): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      const invoices = await axios.get("/invoices");

      dispatch({
        type: GET_INVOICE,
        payload: invoices.data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateInvoice(
  updateInventory: Invoices
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      await axios.patch("/invoices", updateInventory);

      dispatch({
        type: UPDATE_INVOICE,
        payload: updateInventory,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}