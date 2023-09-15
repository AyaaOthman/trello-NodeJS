import { Schema, SchemaTypeOptions, model } from "mongoose";
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["toDo", "doing", "done"],
      required: true,
      default: "toDo",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    assignTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deadLine: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const taskModel = model("Task", taskSchema);

export default taskModel;
