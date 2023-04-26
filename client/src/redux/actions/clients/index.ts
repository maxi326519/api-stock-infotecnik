import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, Client } from "../../../interfaces";
import axios from "axios";

export const POST_CLIENT = "POST_CLIENT";
export const GET_CLIENT = "GET_CLIENT";
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";

export function postClient(
  newClient: Client
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const client = {
        numero: newClient.numero,
        nombre: newClient.nombre,
        direccion: newClient.direccion,
        poblacion: newClient.poblacion,
        postal: newClient.postal,
        cifNif: newClient.cifNif,
        telefono: newClient.telefono,
      };

      const response = await axios.post("/clients", client);

      dispatch({
        type: POST_CLIENT,
        payload: response.data,
      });
    } catch (error: any) {
      console.log(error.response ? error.response.data.error : error);
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function getClients(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const clients = await axios.get("/clients");

      dispatch({
        type: GET_CLIENT,
        payload: clients.data,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function updateClient(
  updateClient: Client
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/clients", updateClient);

      dispatch({
        type: UPDATE_CLIENT,
        payload: updateClient,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}

export function deleteClient(
  clientId: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      console.log("Client ID:", clientId);
      await axios.delete(`/clients/${clientId}`);

      dispatch({
        type: DELETE_CLIENT,
        payload: clientId,
      });
    } catch (error: any) {
      throw new Error(error.response ? error.response.data.error : error);
    }
  };
}
