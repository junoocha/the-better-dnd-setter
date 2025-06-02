// THIS IS WHEN I THOUGHT I COULD USE RICH TEXT FORMS> BUT I GUESS NOT BRUHHHHHHHHH


// // biome-ignore lint/style/useImportType: <explanation>
// import { PDFDocument, PDFForm } from "pdf-lib";
// import fs from "node:fs";
// import path from "node:path";

// // Convert score to modifier
// function getModifier(score: number): string {
// 	const mod = Math.floor((score - 10) / 2);
// 	return mod >= 0 ? `+${mod}` : `${mod}`;
// }

// // Skill-to-stat mapping
// const skillStatMap: Record<string, keyof typeof statNames> = {
// 	Acrobatics: "DEX",
// 	Animal: "WIS",
// 	Arcana: "INT",
// 	Athletics: "STR",
// 	Deception: "CHA",
// 	History: "INT",
// 	Insight: "WIS",
// 	Intimidation: "CHA",
// 	Investigation: "INT",
// 	Medicine: "WIS",
// 	Nature: "INT",
// 	Perception: "WIS",
// 	Performance: "CHA",
// 	Persuasion: "CHA",
// 	Religion: "INT",
// 	SleightofHand: "DEX",
// 	Stealth: "DEX",
// 	Survival: "WIS",
// };

// // Capitalized stat names as used in fields
// const statNames = {
// 	STR: "STR",
// 	DEX: "DEX",
// 	CON: "CON",
// 	INT: "INT",
// 	WIS: "WIS",
// 	CHA: "CHA",
// };

// function normalizeFieldName(name: string): string {
// 	return name.toLowerCase().trim().replace(/\s+/g, "");
// }

// function getTextFieldCaseInsensitive(form: PDFForm, targetName: string) {
// 	const normalizedTarget = normalizeFieldName(targetName);

// 	for (const field of form.getFields()) {
// 		const normalizedFieldName = normalizeFieldName(field.getName());
// 		if (normalizedFieldName === normalizedTarget) {
// 			return form.getTextField(field.getName());
// 		}
// 	}
// 	throw new Error(`Field not found (case-insensitive): ${targetName}`);
// }

// // biome-ignore lint/suspicious/noExplicitAny: <explanation>
// function isRichTextField(field: any): boolean {
// 	try {
// 		const dict = field.acroField?.dict;
// 		return dict?.has("RT") ?? false;
// 	} catch {
// 		return false;
// 	}
// }

// // biome-ignore lint/suspicious/noExplicitAny: <explanation>
// function disableRichText(field: any) {
// 	try {
// 		const dict = field.acroField?.dict;
// 		// biome-ignore lint/complexity/useOptionalChain: <explanation>
// 		if (dict && dict.has("RT")) {
// 			dict.delete("RT"); // Strip the Rich Text key
// 			console.log(`Disabled rich text for field: ${field.getName()}`);
// 		}
// 	} catch (e) {
// 		console.warn(
// 			`Failed to disable rich text for field: ${field.getName()}`,
// 			e,
// 		);
// 	}
// }

// export async function generatePDFBytes(assignments: Record<string, number>) {
// 	const filePath = path.join(
// 		process.cwd(),
// 		"public",
// 		"stat-sheet",
// 		"DnD-stat-sheet.pdf",
// 	);
// 	const existingPdfBytes = fs.readFileSync(filePath);

// 	const pdfDoc = await PDFDocument.load(existingPdfBytes);
// 	const form = pdfDoc.getForm();

// 	// Sanitize all fields (remove rich text flags)
// 	// biome-ignore lint/complexity/noForEach: <explanation>
// 	form.getFields().forEach((field) => {
// 		if (isRichTextField(field)) {
// 			disableRichText(field);
// 		}
// 	});

// 	// === Primary Stats and Modifiers ===
// 	for (const stat of Object.keys(statNames)) {
// 		const score = assignments[stat];
// 		const mod = getModifier(score);
// 		const scoreField = getTextFieldCaseInsensitive(form, stat);
// 		const modField = getTextFieldCaseInsensitive(form, `${stat}mod`);

// 		scoreField.setText(String(score));
// 		modField.setText(mod);
// 	}

// 	// === Skills ===
// 	for (const [skillFieldName, baseStat] of Object.entries(skillStatMap)) {
// 		const mod = getModifier(assignments[baseStat]);
// 		const skillField = getTextFieldCaseInsensitive(form, skillFieldName);
// 		skillField.setText(mod);
// 	}

// 	// Save to bytes
// 	const pdfBytes = await pdfDoc.save();
// 	return pdfBytes;
// }
