ARG BASE_IMAGE
FROM ${BASE_IMAGE}

ARG BRAND_HASH

USER root

# Replace static visible branding in the compiled CLI.
RUN find /app/dist \
        -type f \
        -name '*.js' \
        -exec sed -i \
            's/Decepticon/Shizbendo/g' \
            {} +

# Install a runtime filter for names returned dynamically
# by assistant metadata or the LangGraph backend.
COPY patch-index.mjs /tmp/patch-index.mjs

RUN node /tmp/patch-index.mjs && \
    rm -f /tmp/patch-index.mjs

COPY Banner.js /app/dist/components/Banner.js

LABEL org.mscript.brand="Shizbendo"
LABEL org.mscript.brand_revision="picker-display-v3"
LABEL org.mscript.brand_hash="${BRAND_HASH}"

WORKDIR /app

ENTRYPOINT ["node", "dist/index.js"]
