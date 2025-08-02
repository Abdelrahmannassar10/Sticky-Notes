import { model, Schema } from "mongoose"
const schema = new Schema({
name :{
    type: String,
    required: true,
},
email :{
    type: String,
    required: true,
    unique: true,
},
password :{
    type: String,
    required: true,
},
age:{
    type: Number,
    required: true,
    min: 18,
    max: 60
}
});
export const User = model("User", schema);