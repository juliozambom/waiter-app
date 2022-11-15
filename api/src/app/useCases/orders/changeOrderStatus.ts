import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      return res.status(400).json({
        message: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE',
        order: null,
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      order: null,
    });
  }
}
