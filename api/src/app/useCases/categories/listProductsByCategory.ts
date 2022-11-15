import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    const products = await Product.find().where('category').equals(categoryId);

    console.log(products);

    return res.status(200).json({
      message: 'Products listed sucessfully',
      products,
    });
  } catch (error) {
    res.sendStatus(500);
  }
}
