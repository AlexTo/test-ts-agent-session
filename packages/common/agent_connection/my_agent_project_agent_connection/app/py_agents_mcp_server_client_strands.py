import os

from strands.tools.mcp.mcp_client import MCPClient

from my_agent_project_agent_connection.core.agentcore_mcp_client_strands import (
    AgentCoreMCPClientStrands,
)
from my_agent_project_agent_connection.core.runtime_config import (
    get_agentcore_runtime_config,
)


class PyAgentsMcpServerClientStrands:
    """Strands client for the PyAgentsMcpServer MCP server."""

    @staticmethod
    def create() -> MCPClient:
        if os.environ.get("LOCAL_DEV") == "true":
            return AgentCoreMCPClientStrands.without_auth("http://localhost:8001/mcp")
        config = get_agentcore_runtime_config()
        agent_runtime_arn = config.get("agentRuntimes", {}).get("PyAgentsMcpServer")
        if not agent_runtime_arn:
            raise RuntimeError(
                "No connected MCP server runtime named 'PyAgentsMcpServer' found in runtime configuration."
            )
        return AgentCoreMCPClientStrands.with_iam_auth(agent_runtime_arn)
