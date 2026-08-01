import { SessionManager } from '@strands-agents/sdk';
import { InMemoryStorage, LocalFileStorage } from '@strands-agents/sdk/storage';
import { getCurrentSessionId } from '@my-agent-project/agent-connection';

/**
 * Returns a SessionManager for persisting conversation state across
 * invocations. Local development always uses local file storage for
 * convenience, regardless of the configured session option. Without a
 * configured session option, conversation state is kept in memory only and
 * does not survive process restarts.
 */
export const getSessionManager = async (): Promise<SessionManager> => {
  const sessionId = getCurrentSessionId();
  if (!sessionId) {
    throw new Error(
      'No current session id — cannot resolve a SessionManager outside of a request scope.',
    );
  }
  if (process.env.LOCAL_DEV === 'true') {
    return new SessionManager({
      sessionId,
      storage: new LocalFileStorage('../../tmp/agents/strands/agui-agent'),
    });
  }
  return new SessionManager({ sessionId, storage: new InMemoryStorage() });
};
