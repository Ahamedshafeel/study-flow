import express from "express";
import multer from "multer";
import { uploadPDFSchedule } from "./customScheduleController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  uploadPDFSchedule
);

export default router;