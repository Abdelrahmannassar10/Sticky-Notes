import { Schema ,model } from "mongoose";
const schema = new Schema({
title: {
  type: String,
  required: true,
  validate: {
    validator: function(value) {
      return value !== value.toUpperCase();
    },
    message: "Title should not be all uppercase"
  }
},
content: {
    type: String,
    required: true
},
userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
}
},{timestamps: true});
export const Note = model("Note", schema);