import { Connection } from 'mongoose';
import { OrderDetailSchema } from 'src/schemas/orderdetails.schema';
export const orderDetailsProviders = [
  {
    provide: 'ORDER_DETAIL_MODEL',
    useFactory: (connection: Connection) => connection.model('Orderdetail', OrderDetailSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];