import { POST_PRODUCT, POST_SUPPLIER, POST_STOCK } from "../actions";
import { State } from "../../interfaces";
import { AnyAction } from "redux";

const initialState: State = {
  user: {
    name: " Cargando"
  },
  products: [
    {
      id: "C001",
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
      id: "B021",
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
    {
      id: "N021",
      marca: "Apple",
      modelo: "Iphone 13",
      color: "Gris",
      capacidad: "1tb",
      descripcionLarga: "descripcion larga",
      descripcionCorta: "descripcion corta",
      estado: "",
      imgGenerica: "",
      familia: "compuadoras"
    },
    {
      id: "R021",
      marca: "Asus",
      modelo: "Rock",
      color: "Gris",
      capacidad: "1tb",
      descripcionLarga: "descripcion larga",
      descripcionCorta: "descripcion corta",
      estado: "",
      imgGenerica: "",
      familia: "compuadoras"
    },
    {
      id: "S021",
      marca: "Razer",
      modelo: "Viper Mini",
      color: "Gris",
      capacidad: "1tb",
      descripcionLarga: "descripcion larga",
      descripcionCorta: "descripcion corta",
      estado: "",
      imgGenerica: "",
      familia: "compuadoras"
    },
    {
      id: "L021",
      marca: "Logitech",
      modelo: "G346",
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
    code: 432165,
    name: "Proveedor2",
    address: "Direccion 4321",
    poblation: "4321",
    cifNif: "4321",
    phone: "1199999999",
  }],
  stock: [],
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
    case POST_STOCK:
      return {
        ...state,
        inventory: [...state.suppliers, action.payload],
      };
    default:
      return state;
  }
}