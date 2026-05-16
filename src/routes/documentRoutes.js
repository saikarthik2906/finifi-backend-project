const Document = require("../models/Document");
const express = require("express");
const multer = require("multer");

const extractTextFromPDF = require("../services/pdfService");
const parseDocumentWithGemini = require("../services/geminiService");

const router = express.Router();

const upload = multer({
  dest: "src/uploads/"
});

router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {

    const extractedText = await extractTextFromPDF(req.file.path);

    const parsedJSON = await parseDocumentWithGemini(
      extractedText,
      req.body.documentType
    );

    const savedDocument = await Document.create({

  documentType: req.body.documentType || "po",

  poNumber: "TEMP_PO_NUMBER",

  rawText: extractedText,

  parsedData: parsedJSON

});

res.json({
  message: "Document saved successfully",
  document: savedDocument
});
  }
);

module.exports = router;