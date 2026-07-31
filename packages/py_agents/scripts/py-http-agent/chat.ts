// Chat CLI for PyHttpAgent (Python FastAPI / JSONL streaming), using the
// generated client. Connects to the local `dev` server, or the deployed
// agent when `RUNTIME_CONFIG_APP_ID` is set.
import { chatLoop, type ChatAdapter } from 'agent-chat-cli';
import { PyHttpAgent } from './generated/client.gen.js';
import {
  createAgentCoreFetch,
  resolveRemoteAgent,
  SESSION_ID,
} from './agentcore.js';

const SESSION_ID_HEADER = 'X-Amzn-Bedrock-AgentCore-Runtime-Session-Id';

const remote = await resolveRemoteAgent();

class PyHttpAgentAdapter implements ChatAdapter {
  private client!: PyHttpAgent;

  async connect(url: string) {
    this.client = remote
      ? new PyHttpAgent({
          url: `https://bedrock-agentcore.${remote.region}.amazonaws.com/runtimes/${encodeURIComponent(remote.arn)}`,
          fetch: createAgentCoreFetch(remote.region),
        })
      : new PyHttpAgent({
          url,
          fetch: (input, init) => {
            const headers = new Headers(init?.headers);
            headers.set(SESSION_ID_HEADER, SESSION_ID);
            return fetch(input, { ...init, headers });
          },
        });
    return { agentName: 'PyHttpAgent' };
  }

  async *sendMessage(text: string): AsyncIterable<string> {
    for await (const chunk of this.client.invoke({ prompt: text })) {
      if (typeof chunk.content === 'string') yield chunk.content;
    }
  }
}

await chatLoop(new PyHttpAgentAdapter(), process.env.URL ?? '');
