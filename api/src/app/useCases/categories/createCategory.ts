import { Request, Response } from 'express';
import { Category } from '../../models/Category';
import { isSomeFieldEmpty } from '../../utils/isSomeFieldEmpty';

export async function createCategory(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    const someFieldEmpty = isSomeFieldEmpty([icon, name]);

    if (someFieldEmpty) {
      return res.status(400).json({
        message: 'Required fields are missing',
        category: null,
      });
    }

    const category = await Category.create({ icon, name });

    return res.status(201).json({
      message: 'Category created sucessfully',
      category,
    });
  } catch {
    return res.status(500).json({
      message: 'Internal server error',
      category: null,
    });
  }
}
