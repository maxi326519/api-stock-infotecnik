import { Supplier } from "../../../db/index";

const setSupplier = async (supplier: any) => {
  if (supplier.numero === undefined)
    throw new Error("missing parameter (numero)");
  if (supplier.nombre === undefined)
    throw new Error("missing parameter (nombre)");
  if (supplier.direccion === undefined)
    throw new Error("missing parameter (direccion)");
  if (supplier.poblacion === undefined)
    throw new Error("missing parameter (poblacion)");
  if (supplier.postal === undefined)
    throw new Error("missing parameter (postal)");
  if (supplier.cifNif === undefined)
    throw new Error("missing parameter (cifNif)");
  if (supplier.telefono === undefined)
    throw new Error("missing parameter (telefono)");

  const response = await Supplier.create(supplier);
  return response;
};

const getSupplier = async () => {
  const response = await Supplier.findAll();
  return response;
};

const updateSupplier = async (supplier: any) => {
  const query = await Supplier.findOne({
    where: { id: supplier.id },
  });

  if (query) await query.update(supplier);
  else throw new Error("supplier not found");
};

const deleteSupplier = async (supplierId: string) => {
  const supplier = await Supplier.findOne({
    where: { id: supplierId },
  });
  if (!supplier) throw new Error("supplier not found");

  await Supplier.destroy({ where: { id: supplierId } });
};

export { setSupplier, getSupplier, updateSupplier, deleteSupplier };
