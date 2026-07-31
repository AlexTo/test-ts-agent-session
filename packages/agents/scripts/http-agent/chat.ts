// Chat CLI for HttpAgent (HTTP / tRPC WebSocket). Connects to the local
// `dev` server, or the deployed agent when `RUNTIME_CONFIG_APP_ID` is set.
import { chatLoop, type ChatAdapter } from 'agent-chat-cli';
import { HttpAgentClient } from '../../src/http-agent/client.js';
import { resolveRemoteAgent, SESSION_ID } from './agentcore.js';

const remote = await resolveRemoteAgent();

class TrpcWebSocketAdapter implements ChatAdapter {
  private client!: ReturnType<typeof HttpAgentClient.local>;

  async connect(url: string) {
    this.client = remote
      ? HttpAgentClient.withIamAuth({
          agentRuntimeArn: remote.arn,
          sessionId: SESSION_ID,
        })
      : HttpAgentClient.local({ url, sessionId: SESSION_ID });
    return { agentName: 'HttpAgent' };
  }

  async *sendMessage(text: string): AsyncIterable<string> {
    const stream = new ReadableStream<string>({
      start: (controller) => {
        this.client.invoke.subscribe(
          { prompt: text },
          {
            onData: (chunk: string) => controller.enqueue(chunk),
            onComplete: () => controller.close(),
            onError: (err: unknown) => controller.error(err),
          },
        );
      },
    });

    yield* stream as unknown as AsyncIterable<string>;
  }
}

await chatLoop(new TrpcWebSocketAdapter(), process.env.URL ?? '');
