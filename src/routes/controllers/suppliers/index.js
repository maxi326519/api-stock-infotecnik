const { Supplier } = require("../../../db/index");

const setSupplier = async (supplier) => {
  if (!supplier.codigo) throw new Error("missing parameter: codigo");
  if (!supplier.numero) throw new Error("missing parameter: numero");
  if (!supplier.nombre) throw new Error("missing parameter: nombre");
  if (!supplier.direccion) throw new Error("missing parameter: direccion");
  if (!supplier.poblacion) throw new Error("missing parameter: poblacion");
  if (!supplier.postal) throw new Error("missing parameter: postal");
  if (!supplier.cifNif) throw new Error("missing parameter: cifNif");
  if (!supplier.telefono) throw new Error("missing parameter: telefono");

  const response = await Supplier.create(supplier);
  return response;
};

const getSupplier = async () => {
  const response = await Supplier.findAll();
  return response;
};

const updateSupplier = async (supplier) => {
  const query = await Supplier.findOne({
    where: { id: supplier.id },
  });

  await query.update(supplier);
};

const disabledSupplier = async (supplierId) => {
  await Supplier.destroy({ where: { id: supplierId } });
};

module.exports = {
  setSupplier,
  getSupplier,
  updateSupplier,
  disabledSupplier,
};
