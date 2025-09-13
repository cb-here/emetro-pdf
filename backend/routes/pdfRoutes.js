import express from 'express';
import {
  generatePDF
} from '../controllers/pdfController.js';

const router = express.Router();

// POST /api/pdf/generate - Generate and download PDF
router.post('/generate', generatePDF);

export default router;