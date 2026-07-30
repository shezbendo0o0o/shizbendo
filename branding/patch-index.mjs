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
