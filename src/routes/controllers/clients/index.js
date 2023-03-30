const { Client } = require("../../../db/index");

const setClient = async (client) => {
  if (!client.numero) throw new Error("missing parameter: numero");
  if (!client.nombre) throw new Error("missing parameter: nombre");
  if (!client.direccion) throw new Error("missing parameter: direccion");
  if (!client.poblacion) throw new Error("missing parameter: poblacion");
  if (!client.postal) throw new Error("missing parameter: postal");
  if (!client.cifNif) throw new Error("missing parameter: cifNif");
  if (!client.telefono) throw new Error("missing parameter: telefono");

  const response = await Client.create(client);
  return response;
};

const getClient = async () => {
  const response = await Client.findAll();
  return response;
};

const updateClient = async (client) => {
  const query = await Client.findOne({
    where: { id: client.id },
  });

  await query.update(client);
};

const deleteClient = async (clientId) => {
  const client = await Client.findOne({
    where: { id: clientId },
  });
  if (!client) throw new Error("client not found");

  await Client.destroy({ where: { id: clientId } });
};

module.exports = {
  setClient,
  getClient,
  updateClient,
  deleteClient,
};
