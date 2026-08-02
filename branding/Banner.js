import {
    jsx as _jsx,
    jsxs as _jsxs,
} from "react/jsx-runtime";

import {
    Box,
    Text,
} from "ink";


const LOGO_LINES = Object.freeze([
    "███████╗██╗  ██╗██╗███████╗██████╗ ███████╗███╗   ██╗██████╗  ██████╗",
    "██╔════╝██║  ██║██║╚══███╔╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔═══██╗",
    "███████╗███████║██║  ███╔╝ ██████╔╝█████╗  ██╔██╗ ██║██║  ██║██║   ██║",
    "╚════██║██╔══██║██║ ███╔╝  ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██║   ██║",
    "███████║██║  ██║██║███████╗██████╔╝███████╗██║ ╚████║██████╔╝╚██████╔╝",
    "╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝",
]);


function terminalColumns() {
    const columns = Number(
        process.stdout.columns ||
        process.env.COLUMNS ||
        160
    );

    if (!Number.isFinite(columns)) {
        return 160;
    }

    return Math.max(80, columns);
}


function providerName(rawProvider) {
    const providers = {
        minimax_api: "MiniMax",
        openai_api: "OpenAI",
        anthropic_api: "Anthropic",
        deepseek_api: "DeepSeek",
        google_api: "Google Gemini",
        grok_api: "xAI Grok",
        nvidia_api: "NVIDIA",
        vertex_api: "Vertex AI",
        cohere_api: "Cohere",
    };

    return (
        providers[rawProvider] ||
        rawProvider ||
        "Configured provider"
    );
}


function InfoRow({
    label,
    value,
    valueColor = "white",
    wide,
}) {
    return _jsxs(Box, {
        width: "100%",
        justifyContent:
            wide
                ? "flex-end"
                : "flex-start",
        children: [
            _jsx(Text, {
                bold: true,
                color: "yellow",
                children: `${label}:`,
            }),

            _jsx(Text, {
                color: valueColor,
                children: ` ${value}`,
            }),
        ],
    });
}


export function Banner() {
    const columns = terminalColumns();
    const wide = columns >= 145;

    const rawProvider =
        process.env.DECePTICON_AUTH_PRIORITY ||
        process.env.DECEPTICON_AUTH_PRIORITY ||
        "minimax_api";

    const profile =
        process.env.DECEPTICON_MODEL_PROFILE ||
        "max";

    const runtimeVersion =
        process.env.SHIZBENDO_RUNTIME_VERSION ||
        "1.1.40";

    const endpoint =
        process.env.SHIZBENDO_ENDPOINT ||
        "http://localhost:3000";

    const workspace =
        process.env.SHIZBENDO_WORKSPACE ||
        "~/Shizbendo";

    const session = process.pid
        .toString(16)
        .padStart(8, "0");

    const logoChildren = wide
        ? LOGO_LINES.map((line, index) =>
              _jsx(
                  Text,
                  {
                      bold: true,
                      color:
                          index % 2 === 0
                              ? "magentaBright"
                              : "blueBright",
                      wrap: "truncate",
                      children: line,
                  },
                  `shizbendo-logo-${index}`,
              ),
          )
        : [
              _jsx(
                  Text,
                  {
                      bold: true,
                      color: "magentaBright",
                      children: "SHIZBENDO",
                  },
                  "compact-logo",
              ),

              _jsx(
                  Text,
                  {
                      color: "blueBright",
                      children:
                          "SECURITY ORCHESTRATION",
                  },
                  "compact-subtitle",
              ),
          ];

    const information = _jsxs(Box, {
        flexDirection: "column",
        flexGrow: 1,
        paddingLeft: wide ? 2 : 0,
        paddingTop: wide ? 0 : 1,
        alignItems:
            wide
                ? "flex-end"
                : "flex-start",
        children: [
            _jsx(Text, {
                bold: true,
                color: "magentaBright",
                children:
                    "Welcome to Shizbendo by @moamen alsayed",
            }),

            _jsx(InfoRow, {
                label: "Provider",
                value: providerName(rawProvider),
                valueColor: "cyan",
                wide,
            }),

            _jsx(InfoRow, {
                label: "Profile",
                value: profile,
                valueColor: "cyan",
                wide,
            }),

            _jsx(InfoRow, {
                label: "Runtime",
                value:
                    `Shizbendo ${runtimeVersion}`,
                valueColor: "white",
                wide,
            }),

            _jsx(InfoRow, {
                label: "Endpoint",
                value: endpoint,
                valueColor: "magenta",
                wide,
            }),

            _jsx(InfoRow, {
                label: "Path",
                value: workspace,
                valueColor: "blueBright",
                wide,
            }),

            _jsx(InfoRow, {
                label: "Status",
                value:
                    `Session ${session} — type /help to begin`,
                valueColor: "greenBright",
                wide,
            }),
        ],
    });

    return _jsxs(Box, {
        width: "100%",
        flexDirection: "column",
        children: [
            _jsxs(Box, {
                width: "100%",
                borderStyle: "single",
                borderColor: "magenta",
                paddingX: 1,
                flexDirection:
                    wide
                        ? "row"
                        : "column",
                justifyContent:
                    "space-between",
                children: [
                    _jsxs(Box, {
                        width:
                            wide
                                ? 82
                                : "100%",
                        flexShrink: 0,
                        flexDirection: "column",
                        justifyContent: "center",
                        children: logoChildren,
                    }),

                    information,
                ],
            }),

            _jsx(Text, {
                color: "magenta",
                dimColor: true,
                children: "─".repeat(
                    Math.max(
                        76,
                        columns - 2,
                    ),
                ),
            }),
        ],
    });
}


export default Banner;
