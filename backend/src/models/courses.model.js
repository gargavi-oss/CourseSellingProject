import mongoose, {Schema} from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courseImage: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  author: {
    type: String,
    required: true
  }
},{
    timestamps: true
})

export const Course = mongoose.model("Course",courseSchema)