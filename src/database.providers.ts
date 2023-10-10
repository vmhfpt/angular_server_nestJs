import * as mongoose from 'mongoose';

export const databaseConfig = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://ak47016599:tctk19tdptcxlddm@cluster0.tq8jxdo.mongodb.net/test?retryWrites=true&w=majority'),
  },
];