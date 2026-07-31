import { useContext } from 'react';
import { PyHttpAgentContext } from '../components/PyHttpAgentProvider';
import { PyHttpAgentOptionsProxy } from '../generated/py-http-agent/options-proxy.gen';

export const usePyHttpAgent = (): PyHttpAgentOptionsProxy => {
  const optionsProxy = useContext(PyHttpAgentContext);

  if (!optionsProxy) {
    throw new Error('usePyHttpAgent must be used within a PyHttpAgentProvider');
  }

  return optionsProxy;
};
