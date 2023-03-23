const { Stock, Product } = require("../../../db/index");

const setInventory = async (products) => {
  /* Inventory array instance to save new data */
  let inventory = [];

  /* Create and add Inventory to Product */
  for (let i = 0; i < products.length; i++) {
    /* Create inventory */
    const stock = await Stock.create(products[i]);
    /* Add to product reference */
    const productRef = await Product.findOne({
       where: { id: products[i].product },
      });
      if (!productRef)
      throw new Error(`No se encontro el producto ${products[i].product}`);
      /* Add inventory to product */
      const responseP = await productRef.addStock(stock);
      inventory.push({
         ref: stock,
         data: {
            ...stock.dataValues,
            ProductId: responseP.id
         }
      });
  }

  return inventory;
};

const getInventory = async () => {
  const response = await Stock.findAll();
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
