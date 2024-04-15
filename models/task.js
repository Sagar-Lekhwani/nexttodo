import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema(
  {
    taskname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: 
        {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    ,
  },
  { timestamps: true }
);

const task = models.task || mongoose.model("task", taskSchema);
export default task;