import { models } from '../../../db/index';
const { Product, Stock } = models;

const getProductsAndStock = async (filters: any) => {
    const productsWithStock = await Product.findAll({
      where: filters,
      include: [Stock],
      limit: 15,
    });
  
    return productsWithStock;
  };

  export {
    getProductsAndStock,
  }