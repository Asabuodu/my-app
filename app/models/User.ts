// // models/User.ts
// import mongoose, { Schema, Document, models, model } from "mongoose";

// export interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
// }

// const UserSchema: Schema = new Schema<IUser>({
//   username: { type: String },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// export const User = models.User || model<IUser>("User", UserSchema);


// app/models/User.ts

// import mongoose, { Schema, model, models } from "mongoose";

// const userSchema = new Schema({
//   email: { type: String, required: true, unique: true },
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// export const User = mongoose.models.User || mongoose.model("User", userSchema);



// app/models/User.ts
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false  },
  name: String,
   avatar: String,
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);