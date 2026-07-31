FROM public.ecr.aws/docker/library/node:lts-slim

# Upgrade npm to a version free of known HIGH/CRITICAL vulnerabilities
RUN npm install -g npm@12.0.1

WORKDIR /app

# Add AWS Distro for OpenTelemetry for observability
# https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability-configure.html
# The overrides pin transitive dependencies with known HIGH/CRITICAL
# vulnerabilities to fixed versions. npm is removed once the install is done —
# the runtime only needs node, and npm's own bundled dependencies would
# otherwise carry vulnerabilities into the image.
RUN npm init -y \
  && npm pkg set "overrides.@opentelemetry/propagator-jaeger=2.9.0" \
  && npm pkg set "overrides.minimatch=10.2.5" \
  && npm install @aws/aws-distro-opentelemetry-node-autoinstrumentation@0.12.0 \
  && npm uninstall -g npm

# Copy bundled agent
COPY index.js /app

EXPOSE 8080

# Auto-instrument with AWS Distro for OpenTelemetry
# https://aws-otel.github.io/docs/getting-started/js-sdk/trace-metric-auto-instr
CMD [ "node", "--require", "@aws/aws-distro-opentelemetry-node-autoinstrumentation/register", "index.js" ]
