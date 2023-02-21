import { ADD_PRODUCT, ADD_SUPPLIER } from "../actions";

const initialState = {
  barCodes: [],
  products: [{
   code: "c001",
   date: "21/02/2023",
   EAN: "8806094504996",
   marca: "Samsung",
   modelo: "Galaxy Z Fold4",
   color: "Graygreen",
   capacidad: "256gb",
   descripcionLarga: "descripcion larga",
   descripcionCorta: "descripcion corta",
   imgGenerica: "",
   familia: "",
   Proveedor: "id",
   IMEI: "0189247091",
   TipoImpositivo: "",
   
  }],
  suppliers: [],
  invoices: [],
};

export function Reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        product: [...state.products, action.payload],
      };

    case ADD_SUPPLIER:
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
      };

    default:
      return state;
  }
}
