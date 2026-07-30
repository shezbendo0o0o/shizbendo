function replaceVisibleBranding(value) {
    return value.replaceAll(
        "Decepticon",
        "Shizbendo",
    );
}

function patchOutputStream(stream) {
    const originalWrite = stream.write.bind(stream);

    stream.write = function patchedWrite(
        chunk,
        encoding,
        callback,
    ) {
        if (typeof encoding === "function") {
            callback = encoding;
            encoding = undefined;
        }

        let output = chunk;
        let outputEncoding = encoding;

        if (typeof chunk === "string") {
            output = replaceVisibleBranding(chunk);
        } else if (
            Buffer.isBuffer(chunk) ||
            chunk instanceof Uint8Array
        ) {
            const text = Buffer
                .from(chunk)
                .toString("utf8");

            output = Buffer.from(
                replaceVisibleBranding(text),
                "utf8",
            );

            outputEncoding = undefined;
        }

        if (typeof callback === "function") {
            if (outputEncoding) {
                return originalWrite(
                    output,
                    outputEncoding,
                    callback,
                );
            }

            return originalWrite(output, callback);
        }

        if (outputEncoding) {
            return originalWrite(
                output,
                outputEncoding,
            );
        }

        return originalWrite(output);
    };
}

patchOutputStream(process.stdout);
patchOutputStream(process.stderr);

/*
 * Used only by the installation script to verify that
 * the terminal display filter is functioning.
 */
if (process.env.SHIZBENDO_FILTER_SELFTEST === "1") {
    console.log(
        "Shizbendo — pick an engagement",
    );

    process.exit(0);
}

await import("./dist/index.js");
