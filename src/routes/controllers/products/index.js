const { Product, Images } = require("../../../db/index");

const setProducts = async (products) => {
  console.log(products);

  const productRef = await Product.create(products);

  for (let i = 0; i < products.imgGenerica.length; i++) {
    const imageRef = await Images.create({ imgUrl: products.imgGenerica[0] });
    productRef.setImages(imageRef);
  }

  console.log(productRef.setImages);
  return productRef;
};

const getProducts = async () => {
  const response = await Product.findAll();
  return response;
};

const updateProducts = async (product) => {
  const query = await Product.findOne({
    where: { id: product.id },
  });

  await query.update(product);
};

const disabledProduct = async (productId) => {
  await Product.destroy({ where: { id: productId } });
};

module.exports = {
  setProducts,
  getProducts,
  updateProducts,
  disabledProduct,
};
