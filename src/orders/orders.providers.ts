import { Connection } from 'mongoose';
import { OrderSchema } from 'src/schemas/orders.schema';

export const ordersProviders = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (connection: Connection) => connection.model('Order', OrderSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];