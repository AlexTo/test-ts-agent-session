import { defineConfig } from 'rolldown';

export default defineConfig([
  {
    tsconfig: 'tsconfig.lib.json',
    input: 'src/http-agent/index.ts',
    output: {
      file: '../../dist/packages/agents/bundle/agent/http-agent/index.js',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    platform: 'node',
  },
  {
    tsconfig: 'tsconfig.lib.json',
    input: 'src/a2a-agent/index.ts',
    output: {
      file: '../../dist/packages/agents/bundle/agent/a2a-agent/index.js',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    platform: 'node',
  },
  {
    tsconfig: 'tsconfig.lib.json',
    input: 'src/agui-agent/index.ts',
    output: {
      file: '../../dist/packages/agents/bundle/agent/agui-agent/index.js',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    platform: 'node',
  },
  {
    tsconfig: 'tsconfig.lib.json',
    input: 'src/mcp-server/http.ts',
    output: {
      file: '../../dist/packages/agents/bundle/mcp/agents-mcp-server/index.js',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    platform: 'node',
  },
  {
    tsconfig: 'tsconfig.lib.json',
    input: 'src/s3-http-agent/index.ts',
    output: {
      file: '../../dist/packages/agents/bundle/agent/s3-http-agent/index.js',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    platform: 'node',
  },
  {
    tsconfig: 'tsconfig.lib.json',
    input: 'src/s3-a2a-agent/index.ts',
    output: {
      file: '../../dist/packages/agents/bundle/agent/s3-a2a-agent/index.js',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    platform: 'node',
  },
  {
    tsconfig: 'tsconfig.lib.json',
    input: 'src/s3-agui-agent/index.ts',
    output: {
      file: '../../dist/packages/agents/bundle/agent/s3-agui-agent/index.js',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    platform: 'node',
  },
]);
