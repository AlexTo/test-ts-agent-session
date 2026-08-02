import { S3A2aAgentClientStrands } from '@my-agent-project/agent-connection';
import { Agent, tool } from '@strands-agents/sdk';
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
  const s3A2aAgent = await S3A2aAgentClientStrands.create();
  const s3A2aAgentTool = tool({
    name: 'askS3A2aAgent',
    description:
      'Delegate a question to the remote S3A2aAgent A2A agent and return its reply.',
    inputSchema: z.object({ prompt: z.string() }),
    callback: async ({ prompt }) =>
      (await s3A2aAgent.invoke(prompt)).toString(),
  });
  const agent = new Agent({
    systemPrompt: `You are a mathematical wizard.
  Use your tools for mathematical tasks.
  Refer to tools as your 'spellbook'.`,
    tools: [multiply, s3A2aAgentTool],
  });
  return agent;
};
