import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({

title:String,

content:String,

subject:String,

createdAt:{
type:Date,
default:Date.now
}

});

export default mongoose.model("Note",NoteSchema);
