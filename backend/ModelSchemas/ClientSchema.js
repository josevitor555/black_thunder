import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

export default mongoose.model("Client", ClientSchema, "clients");
