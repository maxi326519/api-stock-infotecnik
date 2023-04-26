import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Product } from "../../../interfaces";
import axios from "axios";

export const POST_PRODUCT = "POST_PRODUCT";
export const GET_PRODUCT = "GET_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const POST_CATEGORIES = "POST_CATEGORIES";
export const POST_CAPACIDADES = "POST_CAPACIDADES";
export const POST_COLORES = "POST_COLORES";
export const GET_ATTRIBUTES = "GET_ATTRIBUTES";

export function postProduct(
  newProduct: Product
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const product = {
        codigo: newProduct.codigo,
        modelo: newProduct.modelo,
        marca: newProduct.marca,
        color: newProduct.color,
        capacidad: newProduct.capacidad,
        descLarga: newProduct.descLarga,
        descCorta: newProduct.descCorta,
        Images: newProduct.Images,
        CategoryId: newProduct.CategoryId,
      };
            
      const response = await axios.post("/products", product);

      dispatch({
        type: POST_PRODUCT,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function getProduct(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const products = await axios.get("/products");

      dispatch({
        type: GET_PRODUCT,
        payload: products.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
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
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function deleteProduct(
  productId: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.delete(`/products/${productId}`);

      dispatch({
        type: DELETE_PRODUCT,
        payload: productId,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function postCapacidades(
  capacidades: string[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      console.log(capacidades);
      await axios.post("/products/attributes/capacidad", capacidades);

      dispatch({
        type: POST_CAPACIDADES,
        payload: capacidades,
      });
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function postColores(
  colores: string[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      console.log(colores);
      await axios.post("/products/attributes/color", colores);

      dispatch({
        type: POST_COLORES,
        payload: colores,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function getAttributes(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.get("/products/attributes");

      const attributes = {
        capacidades: response.data.capacidades.map((cap: any) => cap.capacidad),
        colores: response.data.colores.map((cap: any) => cap.color),
        categories: response.data.categories.map((cat: any) => [
          cat.id,
          cat.name,
          cat.parent,
        ]),
      };

      dispatch({
        type: GET_ATTRIBUTES,
        payload: attributes,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function postCategories(
  categories: any
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      console.log(categories);
      const response = await axios.post("/products/categories", categories);
      console.log(response.data);

      dispatch({
        type: POST_CATEGORIES,
        payload: categories,
      });
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}
