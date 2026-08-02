import fs from "node:fs";

const filename = "/app/dist/index.js";
const marker = "SHIZBENDO_RUNTIME_DISPLAY_FILTER";

let text = fs.readFileSync(filename, "utf8");

if (text.includes(marker)) {
    console.log("Runtime display filter already exists.");
    process.exit(0);
}

const anchor = "const args = process.argv.slice(2);";

if (!text.includes(anchor)) {
    throw new Error(
        "Could not locate the CLI initialization point in index.js.",
    );
}

const filter = `
// SHIZBENDO_RUNTIME_DISPLAY_FILTER
const __shizbendoBrand = (value) =>
    value.replaceAll("Decepticon", "Shizbendo");

for (const __stream of [process.stdout, process.stderr]) {
    const __originalWrite = __stream.write.bind(__stream);

    __stream.write = function (chunk, ...args) {
        if (typeof chunk === "string") {
            chunk = __shizbendoBrand(chunk);
        } else if (
            Buffer.isBuffer(chunk) ||
            chunk instanceof Uint8Array
        ) {
            chunk = Buffer.from(
                __shizbendoBrand(
                    Buffer.from(chunk).toString("utf8"),
                ),
                "utf8",
            );
        }

        return __originalWrite(chunk, ...args);
    };
}

if (process.env.SHIZBENDO_FILTER_SELFTEST === "1") {
    process.stdout.write(
        "Shizbendo — pick an engagement\\\\n",
    );

    process.exit(0);
}

`;

text = text.replace(
    anchor,
    filter + anchor,
);

fs.writeFileSync(filename, text, "utf8");

console.log("Direct runtime display filter installed.");

// SHIZBENDO_MOU_LAYOUT_PATCH_START

function __shizbendoUiFiles(directory) {
    const files = [];

    for (const entry of fs.readdirSync(
        directory,
        { withFileTypes: true },
    )) {
        const filename =
            `${directory}/${entry.name}`;

        if (entry.isDirectory()) {
            files.push(
                ...__shizbendoUiFiles(filename),
            );
        } else if (
            entry.isFile() &&
            filename.endsWith(".js")
        ) {
            files.push(filename);
        }
    }

    return files;
}


for (
    const uiFilename of
    __shizbendoUiFiles("/app/dist")
) {
    let uiText = fs.readFileSync(
        uiFilename,
        "utf8",
    );

    const originalUiText = uiText;

    uiText = uiText
        .replaceAll(
            "ctrl+o: expand  ctrl+c: exit",
            "Enter: send  ·  /: commands  ·  Ctrl+O: expand  ·  Ctrl+C: exit",
        )
        .replaceAll(
            "ctrl+o: expand ctrl+c: exit",
            "Enter: send  ·  /: commands  ·  Ctrl+O: expand  ·  Ctrl+C: exit",
        )
        .replaceAll(
            "ctrl+o: expand",
            "Ctrl+O: expand",
        )
        .replaceAll(
            "ctrl+c: exit",
            "Ctrl+C: exit",
        );

    if (uiText !== originalUiText) {
        fs.writeFileSync(
            uiFilename,
            uiText,
            "utf8",
        );
    }
}

console.log(
    "MOU-style Shizbendo console patch installed.",
);

// SHIZBENDO_MOU_LAYOUT_PATCH_END
