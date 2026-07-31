import { A2AAgent } from '@strands-agents/sdk/a2a';
import { AgentCoreA2aClientStrands } from '../core/agentcore-a2a-client-strands.js';
import { getAgentCoreRuntimeConfig } from '../core/runtime-config.js';

/** Strands client for the A2aAgent A2A agent. */
export class A2aAgentClientStrands {
  static async create(): Promise<A2AAgent> {
    if (process.env.LOCAL_DEV === 'true') {
      return AgentCoreA2aClientStrands.withoutAuth({
        url: 'http://localhost:9000/',
      });
    }
    const config = await getAgentCoreRuntimeConfig();
    const agentRuntimeArn = config.agentRuntimes?.['A2aAgent'];
    if (!agentRuntimeArn) {
      throw new Error(
        `No connected agent runtime named 'A2aAgent' found in runtime configuration.`,
      );
    }
    return AgentCoreA2aClientStrands.withIamAuth({ agentRuntimeArn });
  }
}
