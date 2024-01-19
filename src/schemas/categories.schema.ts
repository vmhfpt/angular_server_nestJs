import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: String,
  parent_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});