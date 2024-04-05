import mongoose, { Schema ,models} from "mongoose";

// mongoose.connect(process.env.MONGODB_URL);
// mongoose.Promise = global.Promise

const ticketSchema = new Schema(
    {
        title: String,
        description: String,
        category: String,
        priority: Number,
        progress: Number,
        status: String,
        active: Boolean,
    },
    {
        timestamps: true,
    }
);

export const Ticket = mongoose.models.tickets || mongoose.model("tickets", ticketSchema)


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

export const User = models.allUsers || mongoose.model("allUsers", userSchema);
