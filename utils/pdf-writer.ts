// utils/pdfWriter.ts
import { PDFDocument, rgb } from "pdf-lib";
import fs from "node:fs";
import path from "node:path";

// define the number and location
type NumberToWrite = {
	x: number;
	y: number;
	value: string;
};

// idea is take list of coordinates and text, then splatter them on the pdf
export async function writeToPDF(numbers: NumberToWrite[]) {
	// grab oriignal pdf and load it as byte array
	const pdfPath = path.join(
		process.cwd(),
		"public",
		"stat-sheet",
		"DnD-stat-sheet.pdf",
	);
	const existingPdfBytes = fs.readFileSync(pdfPath);

	// parse pdf into something modifiable. Grab first page of pdf
	const pdfDoc = await PDFDocument.load(existingPdfBytes);
	const page = pdfDoc.getPages()[0];

	// loop through each given coordinate
	for (const { x, y, value } of numbers) {
		page.drawText(value, {
			x,
			y,
			size: 12,
			color: rgb(0, 0, 0),
		});
	}

	// save modified pdf to byte array
	const pdfBytes = await pdfDoc.save();

	// define path to save new filled pdf
	const outputPath = path.join(process.cwd(), "public", "filled.pdf");
	fs.writeFileSync(outputPath, pdfBytes);

	return "/filled.pdf";
}
