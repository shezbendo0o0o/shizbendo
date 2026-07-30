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
    const detected = Number(
        process.stdout.columns ||
        process.env.COLUMNS ||
        120
    );

    if (!Number.isFinite(detected)) {
        return 120;
    }

    return Math.max(60, detected);
}


export function Banner() {
    const columns = terminalColumns();
    const useLargeLogo = columns >= 82;

    const dividerWidth = Math.max(
        56,
        Math.min(columns - 8, 170),
    );

    const divider = "─".repeat(dividerWidth);

    const logo = useLargeLogo
        ? LOGO_LINES.map((line, index) =>
              _jsx(
                  Text,
                  {
                      bold: true,
                      color:
                          index % 2 === 0
                              ? "redBright"
                              : "red",
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
                      color: "redBright",
                      children: "SHIZBENDO",
                  },
                  "shizbendo-compact-logo",
              ),
          ];

    return _jsxs(Box, {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 1,
        children: [
            ...logo,

            _jsx(
                Text,
                {
                    children: " ",
                },
                "space-one",
            ),

            _jsx(
                Text,
                {
                    bold: true,
                    color: "whiteBright",
                    children:
                        "SECURITY ORCHESTRATION",
                },
                "subtitle",
            ),

            _jsx(
                Text,
                {
                    dimColor: true,
                    children:
                        "Authorized testing • Human-controlled operations",
                },
                "tagline",
            ),

            _jsx(
                Text,
                {
                    children: " ",
                },
                "space-two",
            ),

            _jsx(
                Text,
                {
                    color: "red",
                    dimColor: true,
                    children: divider,
                },
                "divider",
            ),
        ],
    });
}


export default Banner;
