import { Request, Response } from 'express';
import { Order } from '../../models/Order';
import { isSomeFieldEmpty } from '../../utils/isSomeFieldEmpty';

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;

    const someFieldEmpty = isSomeFieldEmpty([table, products]);

    if (someFieldEmpty) {
      return res.status(400).json({
        message: 'Required fields are missing',
        category: null,
      });
    }

    const order = await Order.create({ table, products });

    return res.status(201).json({
      message: 'Order created sucessfully',
      order,
    });
  } catch {
    return res.status(500).json({
      message: 'Internal server error',
      order: null,
    });
  }
}
