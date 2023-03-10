const { Product } = require("../../../db/index");

const setProducts = async (products) =>{
   const response = await Product.create(products);
   return response;
}

const getProducts = async () => {
   const response = await Product.findAll();
   return response;
}

const updateProducts = async (product) =>{

   const query = await Product.findOne({
      where: { id: product.id }
   });

   await query.update(product);
}

const disabledProduct = async (productId) =>{
   await Product.destroy({ where: { id : productId } })
}

module.exports = {
  setProducts,
  getProducts,
  updateProducts,
  disabledProduct,
}