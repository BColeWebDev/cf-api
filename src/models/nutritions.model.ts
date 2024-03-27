import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

interface NutritionsAttrs {
  name: string;
}

export interface NutritionsDocument extends Document {
  name: string;
}

const NutritionsSchema = new Schema<NutritionsDocument>({
  name: String,
});
// Interface that describe property a user model has
interface NutritionsModel extends mongoose.Model<NutritionsDocument> {
  build(attrs: NutritionsAttrs): NutritionsDocument;
}

NutritionsSchema.statics.build = (attrs: NutritionsAttrs) => {
  return new Nutritions(attrs);
};

const Nutritions = mongoose.model<NutritionsDocument, NutritionsModel>(
  "Nutritions",
  NutritionsSchema
);

export { Nutritions };