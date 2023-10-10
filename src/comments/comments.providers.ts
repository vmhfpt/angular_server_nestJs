import { Connection } from 'mongoose';
import { CommentSchema } from 'src/schemas/comments.schema';

export const commentsProviders = [
  {
    provide: 'COMMENT_MODEL',
    useFactory: (connection: Connection) => connection.model('Comment', CommentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];