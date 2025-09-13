import { Router } from "express";
import { fillPdf } from "../controllers/pdfController.js";

const router = Router();

router.post("/fill", fillPdf);

export default router;
