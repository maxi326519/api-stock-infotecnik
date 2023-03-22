const { Supplier } = require("../../../db/index");

const setSupplier = async (supplier) => {
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
