import { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { PyHttpAgent } from '../generated/py-http-agent/client.gen';
import { PyHttpAgentOptionsProxy } from '../generated/py-http-agent/options-proxy.gen';
import { useRuntimeConfig } from '../hooks/useRuntimeConfig';
import { useSigV4 } from '../hooks/useSigV4';

/**
 * Build an HTTP URL from a Bedrock AgentCore Runtime ARN
 */
function buildAgentCoreHttpUrl(agentRuntimeArn: string): string {
  const region = agentRuntimeArn.split(':')[3];
  return `https://bedrock-agentcore.${region}.amazonaws.com/runtimes/${encodeURIComponent(agentRuntimeArn)}`;
}

export const PyHttpAgentContext = createContext<
  PyHttpAgentOptionsProxy | undefined
>(undefined);

export const PyHttpAgentClientContext = createContext<PyHttpAgent | undefined>(
  undefined,
);

const useCreatePyHttpAgentClient = (): PyHttpAgent => {
  const runtimeConfig = useRuntimeConfig();
  const agentRuntimeValue = runtimeConfig.agentRuntimes.PyHttpAgent;
  const apiUrl = agentRuntimeValue.startsWith('arn:')
    ? buildAgentCoreHttpUrl(agentRuntimeValue)
    : agentRuntimeValue;
  const sigv4Client = useSigV4();
  return useMemo(
    () =>
      new PyHttpAgent({
        url: apiUrl,
        fetch: sigv4Client.fetch,
      }),
    [apiUrl, sigv4Client],
  );
};

export const PyHttpAgentProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = useCreatePyHttpAgentClient();
  const optionsProxy = useMemo(
    () => new PyHttpAgentOptionsProxy({ client }),
    [client],
  );

  return (
    <PyHttpAgentClientContext.Provider value={client}>
      <PyHttpAgentContext.Provider value={optionsProxy}>
        {children}
      </PyHttpAgentContext.Provider>
    </PyHttpAgentClientContext.Provider>
  );
};

export default PyHttpAgentProvider;
