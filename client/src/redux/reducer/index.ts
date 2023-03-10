import { POST_PRODUCT, GET_PRODUCT, UPDATE_PRODUCT } from "../actions/products";
import {
  POST_SUPPLIER,
  GET_SUPPLIER,
  UPDATE_SUPPLIER,
} from "../actions/suppliers";
import { POST_INVOICE, GET_INVOICE, UPDATE_INVOICE } from "../actions/invoices";
import { GET_STOCK, UPDATE_STOCK } from "../actions/inventory";
import { RootState } from "../../interfaces";
import { AnyAction } from "redux";

const initialState: RootState = {
  user: {
    name: "Cargando",
  },
  products: [],
  suppliers: [],
  stock: [],
  invoices: [],
};

export function Reducer(state: RootState = initialState, action: AnyAction) {
  switch (action.type) {
    /* POST METHOD*/
    case POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case POST_SUPPLIER:
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
      };

    case POST_INVOICE:
      return {};

    /* GET METHOD*/
    case GET_PRODUCT:
      return {};

    case GET_SUPPLIER:
      return {};

    case GET_INVOICE:
      return {};

    case GET_STOCK:
      return {};

    /* UPDATE METHOD*/
    case UPDATE_PRODUCT:
      return {};

    case UPDATE_INVOICE:
      return {};

    case UPDATE_STOCK:
      return {};

    default:
      return state;
  }
}
