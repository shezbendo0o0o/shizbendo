import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from "ink";

const LOGO_LINES = Object.freeze([
    "███████╗██╗  ██╗██╗███████╗██████╗ ███████╗███╗   ██╗██████╗  ██████╗",
    "██╔════╝██║  ██║██║╚══███╔╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔═══██╗",
    "███████╗███████║██║  ███╔╝ ██████╔╝█████╗  ██╔██╗ ██║██║  ██║██║   ██║",
    "╚════██║██╔══██║██║ ███╔╝  ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██║   ██║",
    "███████║██║  ██║██║███████╗██████╔╝███████╗██║ ╚████║██████╔╝╚██████╔╝",
    "╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝",
]);

export function Banner() {
    const logoRows = LOGO_LINES.map((line, index) =>
        _jsx(
            Text,
            {
                bold: true,
                color: "red",
                wrap: "truncate",
                children: line,
            },
            `shizbendo-logo-${index}`,
        ),
    );

    return _jsxs(Box, {
        flexDirection: "column",
        alignItems: "center",
        children: [
            ...logoRows,
            _jsx(Text, { children: " " }, "shizbendo-spacer"),
            _jsx(
                Text,
                {
                    bold: true,
                    children: "SECURITY ORCHESTRATION",
                },
                "shizbendo-subtitle",
            ),
        ],
    });
}

export default Banner;
