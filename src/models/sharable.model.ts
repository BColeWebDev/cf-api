import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";

interface SharableAttrs {
  name: string;
}

export interface SharableDocument extends Document {
  name: string;
}

const sharableSchema = new Schema<SharableDocument>({
  name: String,
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
