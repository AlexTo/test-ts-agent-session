import { PyHttpAgent } from '../generated/py-http-agent/client.gen';
import { PyHttpAgentClientContext } from '../components/PyHttpAgentProvider';
import { useContext } from 'react';

export const usePyHttpAgentClient = (): PyHttpAgent => {
  const client = useContext(PyHttpAgentClientContext);

  if (!client) {
    throw new Error(
      'usePyHttpAgentClient must be used within a PyHttpAgentProvider',
    );
  }

  return client;
};
