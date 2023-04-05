const { Stock, Product, Image } = require("../../../db/index");

const setInventory = async (products) => {
  /* Inventory array instance to save new data */
  let inventory = [];

  /* Create and add Inventory to Product */
  for (let i = 0; i < products.length; i++) {
    /* Save images and get refenreces */
    let imagesRef = null;
    if (products[0].imagenes.length > 0) {
      imagesRef = await Image.bulkCreate(
        products[0].imagenes.map((url) => ({ url: url }))
      );
    }

    /* Get product reference */
    const productRef = await Product.findOne({
      where: { id: products[i].product },
    });
    if (!productRef)
      throw new Error(`No se encontro el producto ${products[i].product}`);

    /* Create inventory */
    const stock = await Stock.create(products[i]);

    /* Add refereces */
    const responseP = await productRef.addStock(stock);
    if (imagesRef) await stock.setImages(imagesRef);

    console.log(await Image.findAll());

    inventory.push({
      ref: stock,
      data: {
        ...stock.dataValues,
        imagenes: imagesRef.map((data) => data.dataValues.url),
      },
    });
  }

  return inventory;
};

const getInventory = async () => {
  const response = await Stock.findAll({
    include: {
      model: Image,
      attributes: ["url"],
    },
  });
  return response;
};

const updateInventory = async (stock) => {
  const query = await Stock.findOne({
    where: { id: stock.id },
  });

  await query.update(stock);
};

const disabledInventory = async (productId) => {
  await Product.destroy({ where: { id: productId } });
};

module.exports = {
  setInventory,
  getInventory,
  updateInventory,
  disabledInventory,
};
