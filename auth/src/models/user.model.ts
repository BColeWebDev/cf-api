import mongoose from "mongoose"

// Interface that describe property to create new user
interface UserAttrs{
    first_name: string
    last_name:string
    experience:string
    email:string
    password:string
    bio:string
    age:string
    sex:string
    crown_member:boolean
}
// Interface that describe property a user model has
interface UserModel extends mongoose.Model<UserDocument>{
    build(attrs: UserAttrs): UserDocument;
}

interface UserDocument extends mongoose.Document {
    first_name:string,
    last_name:string,
    email: string,
    password: string,
    bio:string,
    age:string,
    sex:string,
    crown_member:boolean

}

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type: String,
        required:true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    bio:{
        type:String,
        required: true
    },
    age:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required: true
    },
    crown_member:{
        type:Boolean,
        required: true
    }
  },

  );

  userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
  }
  
  const User = mongoose.model<UserDocument, UserModel> ('User', userSchema);
  
  export { User };