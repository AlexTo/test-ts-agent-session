import { useContext } from 'react';
import {
  HttpAgentAgentTRPCContext,
  type HttpAgentAgentTRPCContextValue,
} from '../components/HttpAgentAgentClientProvider';

export const useHttpAgentAgent =
  (): HttpAgentAgentTRPCContextValue['optionsProxy'] => {
    const container = useContext(HttpAgentAgentTRPCContext);
    if (!container) {
      throw new Error(
        'useHttpAgentAgent must be used within HttpAgentAgentClientProvider',
      );
    }
    return container.optionsProxy;
  };

export const useHttpAgentAgentClient =
  (): HttpAgentAgentTRPCContextValue['client'] => {
    const container = useContext(HttpAgentAgentTRPCContext);
    if (!container) {
      throw new Error(
        'useHttpAgentAgentClient must be used within HttpAgentAgentClientProvider',
      );
    }
    return container.client;
  };
