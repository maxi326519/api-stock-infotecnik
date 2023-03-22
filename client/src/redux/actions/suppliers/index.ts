import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Supplier } from "../../../interfaces";
import axios from "axios";

export const POST_SUPPLIER = "POST_SUPPLIER";
export const GET_SUPPLIER = "GET_SUPPLIER";
export const UPDATE_SUPPLIER = "UPDATE_SUPPLIER";

export function postSupplier(newSupplier: Supplier): ThunkAction<
Promise<void>,
RootState,
null,
AnyAction
>  {
  return async(dispatch: Dispatch<AnyAction>) => {
    try{

      const response = await axios.post("/suppliers", newSupplier);

      dispatch({
        type: POST_SUPPLIER,
        payload: response.data,
      })
    }catch(error: any){
      throw new Error(error.message);
    }
  }
}

export function getSuppliers(): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      const suppliers = await axios.get("/suppliers");

      dispatch({
        type: GET_SUPPLIER,
        payload: suppliers.data,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

export function updateSuppllier(
  updateSupplier: Supplier
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {

      axios.patch("/suppliers", updateSupplier);

      dispatch({
        type: UPDATE_SUPPLIER,
        payload: updateSupplier,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
