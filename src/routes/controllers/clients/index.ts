import { Client } from "../../../interfaces";
import { Client as ClientDB } from "../../../db";

export const setClient = async (client: any) => {
  if (client.numero === undefined)
    throw new Error("missing parameter (numero)");
  if (client.nombre === undefined)
    throw new Error("missing parameter (nombre)");
  if (client.direccion === undefined)
    throw new Error("missing parameter (direccion)");
  if (client.poblacion === undefined)
    throw new Error("missing parameter (poblacion)");
  if (client.postal === undefined)
    throw new Error("missing parameter (postal)");
  if (client.cifNif === undefined)
    throw new Error("missing parameter (cifNif)");
  if (client.telefono === undefined)
    throw new Error("missing parameter (telefono)");

  const existingClient = await ClientDB.findOne({
      where: { cifNif: client.cifNif }
    });
  
  if (existingClient) {
      throw new Error("Client Cif already exist");
    }

  const response = await ClientDB.create(client);
  return response;
};

export const getClient = async () => {
  const response = await ClientDB.findAll();
  return response;
};

export const updateClient = async (client: Client) => {
  const query = await ClientDB.findOne({
    where: { id: client.id },
  });

  if (query) await query.update(client);
  else throw new Error("client not found");
};

export const deleteClient = async (clientId: string) => {
  const client = await ClientDB.findOne({
    where: { id: clientId },
  });

  if (client) await ClientDB.destroy({ where: { id: clientId } });
  else throw new Error("client not found");
};