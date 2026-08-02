// Chat CLI for S3HttpAgent (HTTP / tRPC WebSocket). Connects to the local
// `dev` server, or the deployed agent when `RUNTIME_CONFIG_APP_ID` is set.
import { chatLoop, type ChatAdapter } from 'agent-chat-cli';
import { S3HttpAgentClient } from '../../src/s3-http-agent/client.js';
import { resolveRemoteAgent, SESSION_ID } from './agentcore.js';

const remote = await resolveRemoteAgent();

class TrpcWebSocketAdapter implements ChatAdapter {
  private client!: ReturnType<typeof S3HttpAgentClient.local>;

  async connect(url: string) {
    this.client = remote
      ? S3HttpAgentClient.withIamAuth({
          agentRuntimeArn: remote.arn,
          sessionId: SESSION_ID,
        })
      : S3HttpAgentClient.local({ url, sessionId: SESSION_ID });
    return { agentName: 'S3HttpAgent' };
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
