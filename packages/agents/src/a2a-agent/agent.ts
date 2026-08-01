import { Agent, tool } from '@strands-agents/sdk';
import {
  logModelErrors,
  logToolErrors,
  AgentsMcpServerClientStrands,
} from '@my-agent-project/agent-connection';
import { getSessionManager } from './session.js';
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
  const agent = new Agent({
    sessionManager: await getSessionManager(),
    systemPrompt: `You are a mathematical wizard.
  Use your tools for mathematical tasks.
  Refer to tools as your 'spellbook'.`,
    tools: [agentsMcpServer, multiply],
  });
  logModelErrors(agent);
  logToolErrors(agent);
  return agent;
};
