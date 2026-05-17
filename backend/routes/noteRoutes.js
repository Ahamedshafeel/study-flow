import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

/* GET NOTES */

router.get("/", async (req,res)=>{

const notes = await Note.find().sort({createdAt:-1});

res.json(notes);

});

/* CREATE NOTE */

router.post("/", async (req,res)=>{

const note = new Note(req.body);

await note.save();

res.json(note);

});

/* DELETE NOTE */

router.delete("/:id", async (req,res)=>{

await Note.findByIdAndDelete(req.params.id);

res.json({message:"Note deleted"});

});

export default router;