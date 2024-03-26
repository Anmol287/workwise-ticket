import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = global.Promise


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

const Ticket = mongoose.models.tickets || mongoose.model("tickets", ticketSchema)


const users = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }

})

export const Formlogin=mongoose.models.allUsers || mongoose.model("allUsers",users)

export default Ticket;