// utils/pdfWriter.ts
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "node:fs";
import path from "node:path";

// Convert score to modifier
function getModifier(score: number): string {
	const mod = Math.floor((score - 10) / 2);
	return mod >= 0 ? `+${mod}` : `${mod}`;
}

// Coordinates for primary stats
const statCoordinates = {
	STR: {
		value: {
			singleDigit: { x: 52, y: 617 },
			doubleDigit: { x: 47, y: 617 },
		},
		mod: {
			positive: { x: 50, y: 595 },
			negative: { x: 52, y: 595 },
		},
	},
	DEX: {
		value: {
			singleDigit: { x: 52, y: 545 },
			doubleDigit: { x: 47, y: 545 },
		},
		mod: {
			positive: { x: 50, y: 523 },
			negative: { x: 52, y: 523 },
		},
	},
	CON: {
		value: {
			singleDigit: { x: 52, y: 473 },
			doubleDigit: { x: 47, y: 473 },
		},
		mod: {
			positive: { x: 50, y: 451 },
			negative: { x: 52, y: 451 },
		},
	},
	INT: {
		value: {
			singleDigit: { x: 52, y: 401 },
			doubleDigit: { x: 47, y: 401 },
		},
		mod: {
			positive: { x: 50, y: 379 },
			negative: { x: 52, y: 379 },
		},
	},
	WIS: {
		value: {
			singleDigit: { x: 52, y: 329 },
			doubleDigit: { x: 47, y: 329 },
		},
		mod: {
			positive: { x: 50, y: 308 },
			negative: { x: 52, y: 308 },
		},
	},
	CHA: {
		value: {
			singleDigit: { x: 52, y: 259 },
			doubleDigit: { x: 47, y: 259 },
		},
		mod: {
			positive: { x: 50, y: 237 },
			negative: { x: 52, y: 237 },
		},
	},
};

// Coordinates for each skill and its associated stat
const skillCoordinates: Record<
	string,
	{ x: number; y: number; stat: keyof typeof statCoordinates }
> = {
	Acrobatics: { x: 113, y: 463, stat: "DEX" },
	"Animal Handling": { x: 113, y: 449, stat: "WIS" },
	Arcana: { x: 113, y: 436, stat: "INT" },
	Athletics: { x: 113, y: 422, stat: "STR" },
	Deception: { x: 113, y: 409, stat: "CHA" },
	History: { x: 113, y: 396, stat: "INT" },
	Insight: { x: 113, y: 382, stat: "WIS" },
	Intimidation: { x: 113, y: 368, stat: "CHA" },
	Investigation: { x: 113, y: 355, stat: "INT" },
	Medicine: { x: 113, y: 341, stat: "WIS" },
	Nature: { x: 113, y: 328, stat: "INT" },
	Perception: { x: 113, y: 315, stat: "WIS" },
	Performance: { x: 113, y: 302, stat: "CHA" },
	Persuasion: { x: 113, y: 288, stat: "CHA" },
	Religion: { x: 113, y: 274, stat: "INT" },
	"Sleight of Hand": { x: 113, y: 260.5, stat: "DEX" },
	Stealth: { x: 113, y: 247, stat: "DEX" },
	Survival: { x: 113, y: 233, stat: "WIS" },
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
	const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

	const page = pdfDoc.getPages()[0];

	// Fill in main stat values and modifiers
	// Fill in main stat values and modifiers
	for (const [stat, coords] of Object.entries(statCoordinates)) {
		const score = assignments[stat];
		const mod = getModifier(score);

		// Stat value
		const isSingleDigit = score < 10;
		const valuePos = isSingleDigit
			? coords.value.singleDigit
			: coords.value.doubleDigit;

		page.drawText(String(score), {
			x: valuePos.x,
			y: valuePos.y,
			size: 18,
			font,
			color: rgb(0, 0, 0),
		});

		// Modifier
		const isNegativeMod = Number.parseInt(mod) < 0;
		const modPos = isNegativeMod ? coords.mod.negative : coords.mod.positive;

		page.drawText(mod, {
			x: modPos.x,
			y: modPos.y,
			size: 12,
			font,
			color: rgb(0, 0, 0),
		});
	}

	// skills
	for (const [skill, { x, y, stat }] of Object.entries(skillCoordinates)) {
		const relatedScore = assignments[stat];
		const mod = getModifier(relatedScore);

		page.drawText(mod, {
			x,
			y,
			size: 10.5,
			font,
			color: rgb(0, 0, 0),
		});
	}

	// save modified pdf to byte array
	const pdfBytes = await pdfDoc.save();
	return pdfBytes;
}
