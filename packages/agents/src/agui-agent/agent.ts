import { Agent, tool } from '@strands-agents/sdk';
import {
  logModelErrors,
  logToolErrors,
  A2aAgentClientStrands,
  AgentsMcpServerClientStrands,
} from '@my-agent-project/agent-connection';
import { z } from 'zod';

const multiply = tool({
  name: 'Multiply',
  description: 'Multiply two numbers',
  inputSchema: z.object({
    a: z.number(),
    b: z.number(),
  }),
  callback: ({ a, b }) => a * b,
});

export const getAgent = async () => {
  const agentsMcpServer = await AgentsMcpServerClientStrands.create();
  const a2aAgent = await A2aAgentClientStrands.create();
  const a2aAgentTool = tool({
    name: 'askA2aAgent',
    description:
      'Delegate a question to the remote A2aAgent A2A agent and return its reply.',
    inputSchema: z.object({ prompt: z.string() }),
    callback: async ({ prompt }) => (await a2aAgent.invoke(prompt)).toString(),
  });
  const agent = new Agent({
    systemPrompt: `You are a mathematical wizard.
  Use your tools for mathematical tasks.
  Refer to tools as your 'spellbook'.`,
    tools: [agentsMcpServer, multiply, a2aAgentTool],
  });
  logModelErrors(agent);
  logToolErrors(agent);
  return agent;
};
