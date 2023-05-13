import { Stock, Product, Supplier, Image as ImageDB } from "../../../db/index";

const setInventory = async (products: any) => {
  /* Validations */
  const postProducts = [];
  for (const product of products) {
    let IMEISerie = null;

    if (product.estado === undefined)
      throw new Error(`missing parameter (estado)`);
    if (product.fechaAlta === undefined)
      throw new Error(`missing parameter (fechaAlta)`);
    if (product.cantidad === undefined)
      throw new Error(`missing parameter (cantidad)`);
    if (product.catalogo === undefined)
      throw new Error(`missing parameter (catalogo)`);
    if (product.IMEISerie === undefined)
      throw new Error(`missing parameter (IMEISerie)`);
    if (product.precioSinIVA === undefined)
      throw new Error(`missing parameter (precioSinIVA)`);
    if (product.precioIVA === undefined)
      throw new Error(`missing parameter (precioIVA)`);
    if (product.precioIVAINC === undefined)
      throw new Error(`missing parameter (precioIVAINC)`);
    if (product.recargo === undefined)
      throw new Error(`missing parameter (recargo)`);
    if (product.total === undefined)
      throw new Error(`missing parameter (total)`);
    if (product.detalles === undefined)
      throw new Error(`missing parameter (detalles)`);
    if (product.SupplierId === undefined)
      throw new Error(`missing parameter (SupplierId)`);

    if (product.IMEISerie !== "") {
      const stockRef = await Stock.findOne({
        where: { IMEISerie: product.IMEISerie },
      });
      if (stockRef) throw new Error("IMEISerie already exist");
      IMEISerie = product.IMEISerie;
    }

    postProducts.push({
      ...product,
      IMEISerie,
    });
  }

  /* Create and add Inventory to Product */
  let inventory = [];
  for (let i = 0; i < postProducts.length; i++) {
    /* Save images and get refenreces */
    let imagesRef: any = [];
    if (postProducts[i].Images?.length > 0) {
      imagesRef = await ImageDB.bulkCreate(
        postProducts[i].Images.map((url: string) => ({ url: url }))
      );
    }

    /* Get product reference */
    let productRef = null;
    if (postProducts[i].ProductId) {
      console.log("Buscando un producto");
      productRef = await Product.findOne({
        where: { id: postProducts[i].ProductId },
      });
      if (!productRef)
        throw new Error(`Product not found (${postProducts[i].ProductId})`);
    }

    /* Get supplier reference */
    let supplierRef = null;
    if (postProducts[i].SupplierId) {
      supplierRef = await Supplier.findOne({
        where: { id: postProducts[i].SupplierId },
      });
      if (!supplierRef)
        throw new Error(`Supplier not found (${postProducts[i].SupplierId})`);
    }

    console.log(postProducts);

    /* Create inventory */
    const stock: any = await Stock.create(postProducts[i]);

    /* Add refereces */
    if (imagesRef) await stock.setImages(imagesRef);
    if (supplierRef) await stock.setSupplier(supplierRef);
    if (productRef) {
      await stock.setProduct(productRef);
      
      /* Update product */
      await productRef.update({
        cantidad: productRef.dataValues.cantidad + postProducts[i].cantidad,
      });
    }

    inventory.push({
      ref: stock,
      data: {
        ...stock.dataValues,
        Images: imagesRef.map((data: any) => data.dataValues.url),
      },
    });
  }

  return inventory;
};

const getInventory = async () => {
  const response = await Stock.findAll({
    include: {
      model: ImageDB,
      attributes: ["url"],
    },
  });
  return response.map((stock) => ({
    ...stock.dataValues,
    Images: stock.dataValues.Images.map((image: any) => image.url),
  }));
};

const updateInventory = async (stock: any) => {
  const query = await Stock.findOne({
    where: { id: stock.id },
  });

  if (query) await query.update(stock);
  else throw new Error("stock not found");
};

const disabledInventory = async (productId: string) => {
  await Product.destroy({ where: { id: productId } });
};

export { setInventory, getInventory, updateInventory, disabledInventory };
