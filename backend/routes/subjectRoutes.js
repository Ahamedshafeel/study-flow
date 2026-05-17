import express from "express";
import Subject from "../models/Subject.js";

const router = express.Router();

/* GET ALL SUBJECTS */
router.get("/", async (req,res)=>{
  try{
    const subjects = await Subject.find();
    res.json(subjects);
  }catch(err){
    res.status(500).json(err);
  }
});

/* CREATE SUBJECT */
router.post("/", async (req,res)=>{
  try{
    const subject = new Subject(req.body);
    await subject.save();
    res.json(subject);
  }catch(err){
    res.status(500).json(err);
  }
});

export default router;