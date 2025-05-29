// utils/pdfWriter.ts
import { PDFDocument, rgb } from "pdf-lib";

// define the number and location
type NumberToWrite = {
	x: number;
	y: number;
	value: string;
};

// idea is take list of coordinates and text, then splatter them on the pdf
export async function generatePDFBytes(numbers: NumberToWrite[]) {
	const fs = await import("node:fs");
	const path = await import("node:path");

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
	return pdfBytes;
}
