import { POST_PRODUCT, POST_SUPPLIER, POST_INVENTORY } from "../actions";
import { State, User, Product, Supplier, Inventory, Invoices } from "../../interfaces";
import { AnyAction } from "redux";

const initialState = {
  user: {
    name: " Cargando"
  },
  products: [
    {
      barCode: "C001",
      marca: "Samsung",
      modelo: "Galaxy Z Fold4",
      color: "Graygreen",
      capacidad: "256gb",
      descripcionLarga: "descripcion larga",
      descripcionCorta: "descripcion corta",
      estado: "",
      imgGenerica: "",
      familia: "celulares"
    },
    {
      barCode: "B021",
      marca: "Lenovo",
      modelo: "Lenovo 842p",
      color: "Gris",
      capacidad: "1tb",
      descripcionLarga: "descripcion larga",
      descripcionCorta: "descripcion corta",
      estado: "",
      imgGenerica: "",
      familia: "compuadoras"
    },
  ],
  suppliers: [{
    code: 123132,
    name: "Proveedor",
    address: "Direccion 1234",
    poblation: "1234",
    cifNif: "1234",
    phone: "1199999999",
  },{
    code: 123132,
    name: "Proveedor2",
    address: "Direccion 4321",
    poblation: "4321",
    cifNif: "4321",
    phone: "1199999999",
  }],
  inventory: [],
  invoices: [],
};

export function Reducer(state: State = initialState, action: AnyAction) {
  switch (action.type) {
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
    case POST_INVENTORY:
      return {
        ...state,
        inventory: [...state.suppliers, action.payload],
      };
    default:
      return state;
  }
}