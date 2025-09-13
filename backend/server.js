import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pdfRoutes from "./routes/pdfRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/api/pdf", pdfRoutes);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
