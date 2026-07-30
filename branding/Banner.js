import React from "react";
import { Box, Text, useStdout } from "ink";

const WIDE = String.raw`
 ███████╗██╗  ██╗██╗███████╗██████╗ ███████╗███╗   ██╗██████╗  ██████╗
 ██╔════╝██║  ██║██║╚══███╔╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔═══██╗
 ███████╗███████║██║  ███╔╝ ██████╔╝█████╗  ██╔██╗ ██║██║  ██║██║   ██║
 ╚════██║██╔══██║██║ ███╔╝  ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██║   ██║
 ███████║██║  ██║██║███████╗██████╔╝███████╗██║ ╚████║██████╔╝╚██████╔╝
 ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝

                    SECURITY ORCHESTRATION
`;

const MEDIUM = String.raw`
  ███████╗██╗  ██╗██╗███████╗██████╗ ███████╗███╗   ██╗██████╗  ██████╗
  ███████╗███████║██║  ███╔╝ ██████╔╝█████╗  ██╔██╗ ██║██║  ██║██║   ██║
  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝
`;

const COMPACT = "S H I Z B E N D O";

export const Banner = React.memo(function Banner() {
    const { stdout } = useStdout();
    const columns = stdout?.columns ?? 80;

    const banner =
        columns >= 105
            ? WIDE
            : columns >= 75
                ? MEDIUM
                : COMPACT;

    return React.createElement(
        Box,
        {
            flexDirection: "column",
            marginBottom: 1,
        },
        React.createElement(
            Text,
            {
                color: "red",
                bold: true,
            },
            banner,
        ),
    );
});
