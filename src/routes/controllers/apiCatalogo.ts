import { Router } from "express";
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { getProductsAndStock } from '../controllers/ApiCatalogo/index';

const router = Router();


router.get('/api/products', async (req: Request, res: Response) => {
  const category = req.query.category as string;
  const price_min = parseFloat(req.query.price_min as string) || 0;
  const price_max = parseFloat(req.query.price_max as string) || Number.POSITIVE_INFINITY;

  const filters: any = {};
  if (category) filters.category = category;
  filters.price = { [Op.between]: [price_min, price_max] };

  try {
    const productsWithStock = await getProductsAndStock(filters);
    res.json(productsWithStock);
  } catch (error) {
    console.error('Error getting the products:', error);
    res.status(500).json({ message: 'Error getting the products' });
  }
});