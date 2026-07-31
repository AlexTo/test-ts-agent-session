import json
import os
import sys

from my_agent_project_py_agents.py_http_agent.main import app

os.makedirs(os.path.dirname(sys.argv[1]), exist_ok=True)
with open(sys.argv[1], "w") as f:
    json.dump(app.openapi(), f)
