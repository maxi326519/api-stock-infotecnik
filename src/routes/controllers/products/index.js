const {
  Product,
  Capacidades,
  Colores,
  Category,
} = require("../../../db/index");
const { deleteImage } = require("../upload");

const setProducts = async (products) => {
  const productRef = await Product.create(products);
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

const deletedProduct = async (productId) => {
  const product = await Product.findOne({
    where: { id: productId },
  });
  if (!product) throw new Error("product not found");

  const images = product.dataValues.imgGenerica;
  console.log("for");
  for (let i = 0; i < images.length; i++) {
    console.log(images[i]);
    deleteImage(images[i]);
  }
  console.log("finished");
  /*   await Product.destroy({ where: { id: productId } }); */
};

const setAttributes = async (name, data) => {
  let model = null;

  if (name === "capacidad") {
    model = Capacidades;
  } else if (name === "color") {
    model = Colores;
  } else {
    throw new Error("invalid attribute name");
  }

  const modelRef = await model.findAll();
  let list = modelRef.map((cap) => cap[name]);
  let remove = [];
  let create = [];

  // Check to remove
  list.map((l) => {
    if (!data.includes(l)) {
      remove.push(l);
    }
  });
  await model.destroy({
    where: { [name]: remove },
  });

  // Add to create new data
  data.forEach((d) => {
    if (!list.includes(d)) {
      create.push({ [name]: d });
    }
  });
  await model.bulkCreate(create);

  const allData = model.findAll();
  return allData;
};

const getAttributes = async () => {
  const capacidadesRef = await Capacidades.findAll();
  const coloresRef = await Colores.findAll();
  const capacidades = capacidadesRef.map((c) => c.dataValues);
  const colores = coloresRef.map((c) => c.dataValues);

  return {
    capacidades,
    colores,
  };
};

const setCategories = async (data) => {
  let remove = []; // Categories to add
  let create = []; // Categories to delete

  // Get all categories
  const categoriasRef = await Category.findAll();

  // Get the name of the categories in dataBase
  let list = categoriasRef.map((cat) => cat.name);

  // Check categories to remove
  list.map((categoryName) => {
    if (!data.some((node) => node[1] === categoryName)) {
      remove.push(categoryName);
    }
  });
  await Category.destroy({
    where: { name: remove },
  });

  // Add to create new data
  data.forEach((node) => {
    if (!list.includes(node[1])) {
      create.push({
        id: node[0],
        name: node[1],
        parent: node[2],
      });
    }
  });
  await Category.bulkCreate(create);
};

const getCategories = async () => {
  const categories = Category.findAll();
  return categories;
};

module.exports = {
  setProducts,
  getProducts,
  updateProducts,
  deletedProduct,
  setAttributes,
  getAttributes,
  setCategories,
  getCategories,
};
