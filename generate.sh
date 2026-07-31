
# TypeScript
pnpm exec nx generate @aws/nx-plugin:ts#project --name=agents --no-interactive

# A2A / HTTP / AGUI / MCP
pnpm exec nx generate @aws/nx-plugin:ts#agent --project=@my-agent-project/agents --name=HttpAgent --no-interactive
pnpm exec nx generate @aws/nx-plugin:ts#agent --project=@my-agent-project/agents --protocol=a2a --name=A2aAgent --no-interactive
pnpm exec nx generate @aws/nx-plugin:ts#agent --project=@my-agent-project/agents --protocol=ag-ui --name=AguiAgent --no-interactive
pnpm exec nx generate @aws/nx-plugin:ts#mcp-server --project=@my-agent-project/agents --no-interactive 

# AGUI -> A2A / HTTP -> A2A
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=@my-agent-project/agents --targetProject=@my-agent-project/agents --sourceComponent=agui-agent --targetComponent=a2a-agent --no-interactive
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=@my-agent-project/agents --targetProject=@my-agent-project/agents --sourceComponent=http-agent --targetComponent=a2a-agent --no-interactive

# Agents -> MCP
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=@my-agent-project/agents --targetProject=@my-agent-project/agents --sourceComponent=http-agent --targetComponent=mcp-server --no-interactive
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=@my-agent-project/agents --targetProject=@my-agent-project/agents --sourceComponent=a2a-agent --targetComponent=mcp-server --no-interactive
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=@my-agent-project/agents --targetProject=@my-agent-project/agents --sourceComponent=agui-agent --targetComponent=mcp-server --no-interactive

# Python
pnpm exec nx generate @aws/nx-plugin:py#project --name=py-agents --type=application --no-interactive

# A2A / HTTP / AGUI / MCP
pnpm exec nx generate @aws/nx-plugin:py#agent --project=my_agent_project.py_agents --name=PyHttpAgent --no-interactive
pnpm exec nx generate @aws/nx-plugin:py#agent --project=my_agent_project.py_agents --protocol=a2a --name=PyA2aAgent --no-interactive
pnpm exec nx generate @aws/nx-plugin:py#agent --project=my_agent_project.py_agents --protocol=ag-ui --name=PyAguiAgent --no-interactive
pnpm exec nx generate @aws/nx-plugin:py#mcp-server --project=my_agent_project.py_agents --no-interactive

# AGUI -> A2A / HTTP -> A2A
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=my_agent_project.py_agents --targetProject=my_agent_project.py_agents --sourceComponent=py-agui-agent --targetComponent=py-a2a-agent --no-interactive
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=my_agent_project.py_agents --targetProject=my_agent_project.py_agents --sourceComponent=py-http-agent --targetComponent=py-a2a-agent --no-interactive

# Agents -> MCP
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=my_agent_project.py_agents --targetProject=my_agent_project.py_agents --sourceComponent=py-http-agent --targetComponent=mcp-server --no-interactive
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=my_agent_project.py_agents --targetProject=my_agent_project.py_agents --sourceComponent=py-a2a-agent --targetComponent=mcp-server --no-interactive
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=my_agent_project.py_agents --targetProject=my_agent_project.py_agents --sourceComponent=py-agui-agent --targetComponent=mcp-server --no-interactive

# Website / Website Auth / Website -> AGUI / Website -> HTTP
pnpm exec nx generate @aws/nx-plugin:ts#website --name=website --no-interactive
pnpm exec nx generate @aws/nx-plugin:ts#website#auth --project=@my-agent-project/website --allowSignup=true --cognitoDomain=ts-session-manager --no-interactive
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=@my-agent-project/website --targetProject=@my-agent-project/agents --targetComponent=agui-agent --no-interactive
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=@my-agent-project/website --targetProject=@my-agent-project/agents --targetComponent=http-agent --no-interactive

# Website -> Python AGUI / Website -> Python HTTP
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=@my-agent-project/website --targetProject=my_agent_project.py_agents --targetComponent=py-agui-agent --no-interactive
pnpm exec nx generate @aws/nx-plugin:connection --sourceProject=@my-agent-project/website --targetProject=my_agent_project.py_agents --targetComponent=py-http-agent --no-interactive