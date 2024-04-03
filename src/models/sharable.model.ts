import { ObjectId } from 'bson';
import { Schema, Document } from "mongoose";
import mongoose from "mongoose";




interface SharableAttrs {
  sharable_name: string;
  created_by: string;
  downloads:number;
  likes:number;
  regiment_difficulty:string;
  regiment_id:string;
  comments:string[];
  nutrition_id:string;
}

export interface SharableDocument extends Document {
  sharable_name: string;
  created_by: typeof Schema.Types.ObjectId;
  downloads:number;
  likes:number;
  regiment_id: typeof Schema.Types.ObjectId;
  comments:String[];
  nutrition_id:string;
}

const sharableSchema = new Schema<SharableDocument>({
  sharable_name: String,
  created_by: {
    type:ObjectId,
    required: true,
    ref:'User'
  },
  downloads: Number,
  likes: Number,
  regiment_id: {
    type:ObjectId,
    required: true,
    ref:'Regiments'
  },
  comments:[String],
  nutrition_id:String
});
// Interface that describe property a user model has
interface SharableModel extends mongoose.Model<SharableDocument> {
  build(attrs: SharableAttrs): SharableDocument;
}

sharableSchema.statics.build = (attrs: SharableAttrs) => {
  return new Sharable(attrs);
};

const Sharable = mongoose.model<SharableDocument, SharableModel>(
  "Sharable",
  sharableSchema
);

export { Sharable };
