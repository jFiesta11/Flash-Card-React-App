const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

async function extractTextfromDoc(fileBuffer, mimetype) {
  if (mimetype === "application/pdf") {
    const pdfParser = await new PDFParse({ data: fileBuffer });
    const result = await pdfParser.getText();
    await pdfParser.destroy();
    return result.text;
  } else if (mimetype ==="application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  }
  throw new Error("Unsupported File Type");
}
module.exports = { extractTextfromDoc };
