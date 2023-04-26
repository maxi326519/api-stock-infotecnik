import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Invoices } from "../../../interfaces";
import axios from "axios";

export const POST_STOCK_INVOICE = "POST_STOCK_INVOICE";
export const POST_INVOICE = "POST_INVOICE";
export const GET_INVOICE = "GET_INVOICE";
export const UPDATE_INVOICE = "UPDATE_INVOICE";
export const DELETE_INVOICE = "DELETE_INVOICE";

export const GET_INVOICE_TYPES = "GET_INVOICE_TYPES";
export const UPDATE_INVOICE_TYPES = "UPDATE_INVOICE_TYPES";

export function postInvoice(
  newInventory: any
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.post("/invoice", newInventory);

      dispatch({
        type: POST_STOCK_INVOICE,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.data.error : error.message
      );
    }
  };
}

export function postServiceInvoice(
  newInventory: any
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.post("/invoice/services", newInventory);

      dispatch({
        type: POST_INVOICE,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.data.error : error.message
      );
    }
  };
}

export function getInvoice(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const invoices = await axios.get("/invoice");

      dispatch({
        type: GET_INVOICE,
        payload: invoices.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function updateInvoice(
  updateInventory: Invoices
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/invoice", updateInventory);

      dispatch({
        type: UPDATE_INVOICE,
        payload: updateInventory,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function deleteInvoice(
  invoiceId: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.delete(`/invoice/${invoiceId}`);

      dispatch({
        type: DELETE_INVOICE,
        payload: invoiceId,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function getTypes(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const types = await axios.get(`/invoice/types`);

      dispatch({
        type: GET_INVOICE_TYPES,
        payload: types,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function updateTypes(
  types: string[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch(`/invoice/$type`, types);

      dispatch({
        type: UPDATE_INVOICE_TYPES,
        payload: types,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}
