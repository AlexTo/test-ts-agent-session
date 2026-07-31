from contextlib import contextmanager

from my_agent_project_agent_connection import PyA2aAgentClientStrands, PyAgentsMcpServerClientStrands, log_model_errors
from strands import Agent, tool
from strands_tools import current_time


@tool
def subtract(a: int, b: int) -> int:
    return a - b


@contextmanager
def get_agent():
    py_agents_mcp_server = PyAgentsMcpServerClientStrands.create()
    with (
        py_agents_mcp_server,
    ):
        py_a2a_agent = PyA2aAgentClientStrands.create()

        @tool
        def ask_py_a2a_agent(prompt: str) -> str:
            """Delegate a question to the remote PyA2aAgent A2A agent and return its reply."""
            return str(py_a2a_agent(prompt))

        yield Agent(
            name="PyHttpAgent",
            description="PyHttpAgent Strands Agent",
            system_prompt="""
You are a mathematical wizard.
Use your tools for mathematical tasks.
Refer to tools as your 'spellbook'.
""",
            tools=[subtract, current_time, ask_py_a2a_agent, *py_agents_mcp_server.list_tools_sync()],
            hooks=[log_model_errors],
        )
