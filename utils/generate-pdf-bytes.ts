// utils/pdfWriter.ts
import { PDFDocument, rgb } from "pdf-lib";
import fs from "node:fs";
import path from "node:path";

// Convert score to modifier
function getModifier(score: number): string {
	const mod = Math.floor((score - 10) / 2);
	return mod >= 0 ? `+${mod}` : `${mod}`;
}

// Coordinates for primary stats
const statCoordinates = {
	STR: { value: { x: 75, y: 665 }, mod: { x: 75, y: 640 } },
	DEX: { value: { x: 75, y: 575 }, mod: { x: 75, y: 550 } },
	CON: { value: { x: 75, y: 485 }, mod: { x: 75, y: 460 } },
	INT: { value: { x: 75, y: 395 }, mod: { x: 75, y: 370 } },
	WIS: { value: { x: 75, y: 305 }, mod: { x: 75, y: 280 } },
	CHA: { value: { x: 75, y: 215 }, mod: { x: 75, y: 190 } },
};

// Coordinates for each skill and its associated stat
const skillCoordinates: Record<
	string,
	{ x: number; y: number; stat: keyof typeof statCoordinates }
> = {
	Acrobatics: { x: 150, y: 665, stat: "DEX" },
	"Animal Handling": { x: 150, y: 650, stat: "WIS" },
	Arcana: { x: 150, y: 635, stat: "INT" },
	Athletics: { x: 150, y: 620, stat: "STR" },
	Deception: { x: 150, y: 605, stat: "CHA" },
	History: { x: 150, y: 590, stat: "INT" },
	Insight: { x: 150, y: 575, stat: "WIS" },
	Intimidation: { x: 150, y: 560, stat: "CHA" },
	Investigation: { x: 150, y: 545, stat: "INT" },
	Medicine: { x: 150, y: 530, stat: "WIS" },
	Nature: { x: 150, y: 515, stat: "INT" },
	Perception: { x: 150, y: 500, stat: "WIS" },
	Performance: { x: 150, y: 485, stat: "CHA" },
	Persuasion: { x: 150, y: 470, stat: "CHA" },
	Religion: { x: 150, y: 455, stat: "INT" },
	"Sleight of Hand": { x: 150, y: 440, stat: "DEX" },
	Stealth: { x: 150, y: 425, stat: "DEX" },
	Survival: { x: 150, y: 410, stat: "WIS" },
};

// idea is take list of coordinates and text, then splatter them on the pdf
export async function generatePDFBytes(assignments: Record<string, number>) {
	// grab oriignal pdf and load it as byte array
	const filePath = path.join(
		process.cwd(),
		"public",
		"stat-sheet",
		"DnD-stat-sheet.pdf",
	);
	const existingPdfBytes = fs.readFileSync(filePath);

	// parse pdf into something modifiable. Grab first page of pdf
	const pdfDoc = await PDFDocument.load(existingPdfBytes);
	const page = pdfDoc.getPages()[0];

	// Fill in main stat values and modifiers
	for (const [stat, coords] of Object.entries(statCoordinates)) {
		const score = assignments[stat];
		const mod = getModifier(score);

		// Stat value
		page.drawText(String(score), {
			x: coords.value.x,
			y: coords.value.y,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Modifier
		page.drawText(mod, {
			x: coords.mod.x,
			y: coords.mod.y,
			size: 12,
			color: rgb(0, 0, 0),
		});
	}

	// Fill in skills with correct modifier
	for (const [skill, { x, y, stat }] of Object.entries(skillCoordinates)) {
		const relatedScore = assignments[stat];
		const mod = getModifier(relatedScore);

		page.drawText(mod, {
			x,
			y,
			size: 10,
			color: rgb(0, 0, 0),
		});
	}

	// save modified pdf to byte array
	const pdfBytes = await pdfDoc.save();
	return pdfBytes;
}
