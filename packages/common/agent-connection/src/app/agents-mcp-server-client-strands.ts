import { McpClient } from '@strands-agents/sdk';
import { AgentCoreMcpClientStrands } from '../core/agentcore-mcp-client-strands.js';
import { getAgentCoreRuntimeConfig } from '../core/runtime-config.js';

/** Strands client for the AgentsMcpServer MCP server. */
export class AgentsMcpServerClientStrands {
  static async create(): Promise<McpClient> {
    if (process.env.LOCAL_DEV === 'true') {
      return AgentCoreMcpClientStrands.withoutAuth({
        url: 'http://localhost:8000/mcp',
      });
    }
    const config = await getAgentCoreRuntimeConfig();
    const agentRuntimeArn = config.agentRuntimes?.['AgentsMcpServer'];
    if (!agentRuntimeArn) {
      throw new Error(
        `No connected MCP server runtime named 'AgentsMcpServer' found in runtime configuration.`,
      );
    }
    return AgentCoreMcpClientStrands.withIamAuth({ agentRuntimeArn });
  }
}
