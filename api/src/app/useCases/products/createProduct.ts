import { Request, Response } from 'express';
import { Product } from '../../models/Product';
import { isSomeFieldEmpty } from '../../utils/isSomeFieldEmpty';

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    const someFieldEmpty = isSomeFieldEmpty([
      name,
      description,
      price,
      category,
      ingredients,
      imagePath,
    ]);

    if (someFieldEmpty) {
      return res.status(400).json({
        message: 'Required fields are missing',
        product: null,
      });
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      imagePath,
    });

    return res.status(201).json({
      message: 'Product created sucessfully',
      product,
    });
  } catch {
    return res.status(500).json({
      message: 'Internal server error',
      category: null,
    });
  }
}
