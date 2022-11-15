import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function listProducts(req: Request, res: Response) {
  const products = await Product.find();

  return res.status(200).json({
    message: 'Products listed sucessfully',
    products,
  });
}
