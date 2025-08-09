import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true } // e.g: backlog, todo, in_progress...
}, { timestamps: true });

export default mongoose.model("StatusProject", StatusSchema, "status_projects");
