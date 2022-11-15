import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function cancelOrder(req: Request, res: Response) {
  try {
    const { orderId } = req.params;

    await Order.findByIdAndDelete(orderId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      order: null,
    });
  }
}
