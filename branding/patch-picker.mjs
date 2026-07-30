import fs from "node:fs";
import path from "node:path";

const root = "/app/dist";
const changedFiles = [];
const pickerFiles = [];

function walk(directory) {
    for (const entry of fs.readdirSync(directory, {
        withFileTypes: true,
    })) {
        const filename = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            walk(filename);
            continue;
        }

        if (!entry.isFile() || !filename.endsWith(".js")) {
            continue;
        }

        let text = fs.readFileSync(filename, "utf8");

        const isPickerFile =
            filename.endsWith("/SessionPicker.js") ||
            text.includes("pick an engagement") ||
            text.includes("New engagement workspace");

        if (!isPickerFile) {
            continue;
        }

        pickerFiles.push(filename);

        const original = text;

        /*
         * Change only visible branding inside engagement-picker files.
         * Internal lowercase identifiers such as "decepticon" remain intact.
         */
        text = text.replaceAll("Shizbendo", "Shizbendo");
        text = text.replaceAll("DECEPTICON", "SHIZBENDO");

        if (text !== original) {
            fs.writeFileSync(filename, text, "utf8");
            changedFiles.push(filename);
        }
    }
}

walk(root);

if (pickerFiles.length === 0) {
    throw new Error(
        "No engagement-picker files were located.",
    );
}

console.log("Engagement-picker files:");

for (const filename of pickerFiles) {
    console.log(`  ${filename}`);
}

console.log("Modified files:");

for (const filename of changedFiles) {
    console.log(`  ${filename}`);
}
