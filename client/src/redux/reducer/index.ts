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
      imgGenerica: [],
      categoria: "celulares"
    },
    {
      id: "B021",
      marca: "Lenovo",
      modelo: "Lenovo 842p",
      color: "Gris",
      capacidad: "1tb",
      descripcionLarga: "descripcion larga",
      descripcionCorta: "descripcion corta",
      imgGenerica: [],
      categoria: "compuadoras"
    },
    {
      id: "N021",
      marca: "Apple",
      modelo: "Iphone 13",
      color: "Gris",
      capacidad: "1tb",
      descripcionLarga: "descripcion larga",
      descripcionCorta: "descripcion corta",
      imgGenerica: [],
      categoria: "compuadoras"
    },
    {
      id: "R021",
      marca: "Asus",
      modelo: "Rock",
      color: "Gris",
      capacidad: "1tb",
      descripcionLarga: "descripcion larga",
      descripcionCorta: "descripcion corta",
      imgGenerica: [],
      categoria: "compuadoras"
    },
    {
      id: "S021",
      marca: "Razer",
      modelo: "Viper Mini",
      color: "Gris",
      capacidad: "1tb",
      descripcionLarga: "descripcion larga",
      descripcionCorta: "descripcion corta",
      imgGenerica: [],
      categoria: "compuadoras"
    },
    {
      id: "L021",
      marca: "Logitech",
      modelo: "G346",
      color: "Gris",
      capacidad: "1tb",
      descripcionLarga: "descripcion larga",
      descripcionCorta: "descripcion corta",
      imgGenerica: [],
      categoria: "compuadoras"
    },
  ],
  suppliers: [{
    id: "asdasd",
    code: 123132,
    nombre: "Proveedor",
    direccion: "Direccion 1234",
    poblacion: "1234",
    postal: 123,
    cifNif: "1234",
    telefono: "1199999999",
  },{
    id: "fsds",
    code: 432165,
    nombre: "Proveedor2",
    direccion: "Direccion 4321",
    poblacion: "4321",
    postal: 4321,
    cifNif: "4321",
    telefono: "1199999999",
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