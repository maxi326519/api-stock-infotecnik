import { Stock, Product, Supplier, Image as ImageDB } from "../../../db/index";

const setInventory = async (products: any) => {
  /* Validations */
  const postProducts = [];
  for (const product of products) {
    let IMEISerie = null;
    let codigoDeBarras = null;
    let tipoCodigoDeBarras = null;
    let listTipoCodigoDeBarras = [
      "Ninguno",
      "Code128",
      "Code39",
      "UPC-A",
      "UPC-E",
      "EAN8",
      "EAN-13",
    ];

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
    if (product.tipoCodigoDeBarras === undefined)
      throw new Error(`missing parameter (tipoCodigoDeBarras)`);
    if (product.codigoDeBarras === undefined)
      throw new Error(`missing parameter (codigoDeBarras)`);
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
    if (product.Images === undefined)
      throw new Error(`missing parameter (Images)`);
    if (product.supplierId === undefined)
      throw new Error(`missing parameter (supplierId)`);

    if (product.IMEISerie !== "") {
      const stockRef = await Stock.findOne({
        where: { IMEISerie: product.IMEISerie },
      });
      if (stockRef) throw new Error("IMEISerie already exist");
      IMEISerie = product.IMEISerie;
    }

    if (product.tipoCodigoDeBarras !== "") {
      if (listTipoCodigoDeBarras.includes(product.tipoCodigoDeBarras)) {
        tipoCodigoDeBarras = product.tipoCodigoDeBarras;
      } else {
        throw new Error(`invalid data (estado)`);
      }
    }

    if (tipoCodigoDeBarras && product.codigoDeBarras !== "") {
      const stockRef = await Stock.findOne({
        where: { codigoDeBarras: product.codigoDeBarras },
      });
      if (stockRef) throw new Error("codigoDeBarras already exist");
      codigoDeBarras = product.codigoDeBarras;
    }

    postProducts.push({
      ...product,
      IMEISerie,
      codigoDeBarras,
      tipoCodigoDeBarras,
    });
  }

  /* Create and add Inventory to Product */
  let inventory = [];
  for (let i = 0; i < postProducts.length; i++) {
    /* Save images and get refenreces */
    let imagesRef: any = [];
    if (postProducts[i].Images.length > 0) {
      imagesRef = await ImageDB.bulkCreate(
        postProducts[i].Images.map((url: string) => ({ url: url }))
      );
    }

    /* Get product reference */
    let productRef = null;
    if (postProducts[i].productId) {
      productRef = await Product.findOne({
        where: { id: postProducts[i].productId },
      });
      if (!productRef)
        throw new Error(`Product not found (${postProducts[i].productId})`);
    }

    /* Get supplier reference */
    let supplierRef = null;
    if (postProducts[i].supplierId) {
      supplierRef = await Supplier.findOne({
        where: { id: postProducts[i].supplierId },
      });
      if (!supplierRef)
        throw new Error(`Supplier not found (${postProducts[i].supplierId})`);
    }

    /* Create inventory */
    const stock: any = await Stock.create(postProducts[i]);

    /* Add refereces */
    if (imagesRef) await stock.setImages(imagesRef);
    if (productRef) await stock.setProduct(productRef);
    if (supplierRef) await stock.setSupplier(supplierRef);

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
