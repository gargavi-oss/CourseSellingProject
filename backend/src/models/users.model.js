import mongoose , {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        reuired: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
},{
    timestamps: true
})

export const User = mongoose.model("User",userSchema)