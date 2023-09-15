import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      minLength: [3, "min char is 3 "],
      maxLength: [10, "max length is 10"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isLogIn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

userSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});

userSchema.pre("findOneAndDelete", function () {
  this.where({ isDeleted: false });
});

userSchema.pre("findOneAndUpdate", function () {
  this.where({ isDeleted: false });
});

userSchema.pre("findByIdAndUpdate", function () {
  this.where({ isDeleted: false });
});

userSchema.pre("findByIdAndDelete", function () {
  this.where({ isDeleted: false });
});

const userModel = model("User", userSchema);

export default userModel;
