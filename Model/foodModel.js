import mongoose from "mongoose";

const mealfoodSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  shortSummary: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
  },image: { type: String, required: true }
}, { timestamps: true });


export const Mealfood = mongoose.models.Mealfood || mongoose.model("Mealfood", mealfoodSchema);
