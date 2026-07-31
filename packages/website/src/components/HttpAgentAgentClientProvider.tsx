import type { AppRouter } from '@my-agent-project/agents/src/http-agent/router.js';
import { useQueryClient } from '@tanstack/react-query';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { useRuntimeConfig } from '../hooks/useRuntimeConfig';
import {
  TRPCClient,
  createTRPCClient,
  createWSClient,
  wsLink,
} from '@trpc/client';
import { useSigV4 } from '../hooks/useSigV4';

/**
 * Build a WebSocket URL from a Bedrock AgentCore Runtime ARN
 */
function buildAgentCoreWsUrl(agentRuntimeArn: string): string {
  const region = agentRuntimeArn.split(':')[3];
  return `wss://bedrock-agentcore.${region}.amazonaws.com/runtimes/${encodeURIComponent(agentRuntimeArn)}/ws`;
}

export interface HttpAgentAgentTRPCContextValue {
  optionsProxy: ReturnType<typeof createTRPCOptionsProxy<AppRouter>>;
  client: TRPCClient<AppRouter>;
}

export const HttpAgentAgentTRPCContext =
  createContext<HttpAgentAgentTRPCContextValue | null>(null);

export const HttpAgentAgentClientProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const runtimeConfig = useRuntimeConfig();
  const agentRuntimeValue = runtimeConfig.agentRuntimes.HttpAgent;
  const sigv4Client = useSigV4();

  const container = useMemo<HttpAgentAgentTRPCContextValue>(() => {
    // If the value is an ARN, convert it to a WebSocket URL
    const wsUrl = agentRuntimeValue.startsWith('arn:')
      ? buildAgentCoreWsUrl(agentRuntimeValue)
      : agentRuntimeValue;

    const wsClient = createWSClient({
      url: async () => {
        const signedRequest = await sigv4Client.sign(wsUrl, {
          method: 'GET',
          aws: { signQuery: true },
        });
        return signedRequest.url;
      },
    });

    const client = createTRPCClient<AppRouter>({
      links: [wsLink({ client: wsClient })],
    });

    const optionsProxy = createTRPCOptionsProxy<AppRouter>({
      client,
      queryClient,
    });

    return { optionsProxy, client };
  }, [agentRuntimeValue, queryClient, sigv4Client]);

  return (
    <HttpAgentAgentTRPCContext.Provider value={container}>
      {children}
    </HttpAgentAgentTRPCContext.Provider>
  );
};

export default HttpAgentAgentClientProvider;
