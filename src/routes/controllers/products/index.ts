import { Product, Capacity, Color, Category, Image, Marca } from "../../../db/index";
import { deleteImage } from "../upload";

const setProducts = async (products: any) => {
  if (!products.CategoryId) throw new Error("missing parameter (CategoryId)");

  const categoryRef = await Category.findOne({
    where: { id: products.CategoryId },
  });
  if (!categoryRef) throw new Error("category not found");

  let Images = [];
  let imagesRef = null;
  if (products.Images) {
    imagesRef = await Image.bulkCreate(
      products.Images.map((url: string) => ({ url: url }))
    );
    Images = imagesRef.map((ref) => ref.dataValues.url);
  }

  const productRef: any = await Product.create(products);

  await productRef.setCategory(categoryRef);
  await productRef.setImages(imagesRef);

  return { ...productRef.dataValues, Images };
};

const getProducts = async () => {
  const response = await Product.findAll({
    include: {
      model: Image,
      attributes: ["url"],
    },
  });
  const products = response.map((data) => ({
    ...data.dataValues,
    Images: data.dataValues.Images.map((image: any) => image.url),
  }));
  return products;
};

const updateProducts = async (product: any) => {
  const query = await Product.findOne({
    where: { id: product.id },
  });

  if (query) await query.update(product);
  else throw new Error("product not found");
};

const deletedProduct = async (productId: any) => {
  const product = await Product.findOne({
    where: { id: productId },
    include: {
      model: Image,
      attributes: ["url"],
    },
  });
  if (!product) throw new Error("product not found");

  const images = product.dataValues.Images.map((image: any) => image.url);
  console.log(images);
  for (let i = 0; i < images.length; i++) {
    console.log(images[i]);
    deleteImage(images[i]);
  }
  await Product.destroy({ where: { id: productId } });
};

const setAttributes = async (name: any, data: any) => {
  let model = null;

  if (name === "capacidad") {
    model = Capacity;
  } else if (name === "color") {
    model = Color;
  } else if (name === "marca") {
    model = Marca;
  } else {
    throw new Error("invalid attribute name");
  }

  const modelRef = await model.findAll();
  let list = modelRef.map((cap: any) => cap[name]);
  let remove: any = [];
  let create: any = [];

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
  data.forEach((d: any) => {
    if (!list.includes(d)) {
      create.push({ [name]: d });
    }
  });
  await model.bulkCreate(create);

  const allData = await model.findAll();
  return allData;
};

const getAttributes = async () => {
  const capacidadesRef = await Capacity.findAll();
  const coloresRef = await Color.findAll();
  const marcasRef = await Marca.findAll();
  const categories = await Category.findAll();

  const capacidades = capacidadesRef.map((c) => c.dataValues);
  const colores = coloresRef.map((c) => c.dataValues);
  const marcas = marcasRef.map((m) => m.dataValues);

  return {
    capacidades,
    colores,
    categories,
    marcas,
  };
};

const setCategories = async (data: any) => {
  let remove: any = []; // Categories to add
  let create: any = []; // Categories to delete

  // Get all categories
  const categoriasRef = await Category.findAll();

  // Get the name of the categories in dataBase
  let list = categoriasRef.map((cat: any) => cat.name);

  // Check categories to remove
  list.map((categoryName) => {
    if (!data.some((node: any) => node[1] === categoryName)) {
      remove.push(categoryName);
    }
  });
  await Category.destroy({
    where: { name: remove },
  });

  // Add to create new data
  data.forEach((node: any) => {
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

export {
  setProducts,
  getProducts,
  updateProducts,
  deletedProduct,
  setAttributes,
  getAttributes,
  setCategories,
};
