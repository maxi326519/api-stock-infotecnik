import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Transactions } from "../../../interfaces";
import axios from "axios";

export const POST_TRANSACTIONS: string = "POST_TRANSACTIONS";
export const GET_TRANSACTIONS: string = "GET_TRANSACTIONS";
export const DELETE_TRANSACTION: string = "DELETE_TRANSACTION";

export function postTransactions(
  newTransactions: any[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const transactions: Transactions[] = [];

      for (let i = 0; i < newTransactions.length; i++) {
        const response = await axios.post("/transactions", newTransactions[i]);
        transactions.push(response.data);
      }

      dispatch({
        type: POST_TRANSACTIONS,
        payload: transactions,
      });
    } catch (error: any) {
      console.log(error.response ? error.response.data.error : error);
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function getTransactions(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const transactions = await axios.get("/transactions");

      dispatch({
        type: GET_TRANSACTIONS,
        payload: transactions.data,
      });
    } catch (error: any) {
      console.log(error.response ? error.response.data.error : error);
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}
