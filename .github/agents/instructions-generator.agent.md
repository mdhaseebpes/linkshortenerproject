---
name: instructions-generator
description: "This agent generates highly specific agent instructions files for the /docs directory"
tools: [
    vscode,
    execute,
    read,
    agent,
    browser,
    vscodeGeneral/rename,
    vscodeGeneral/usages,
    vscodeNotebooks/createJupyterNotebook,
    vscodeNotebooks/editNotebook,
    edit,
    search,
    web,
    todo,
  ] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

THis agent takes the provided information about a layer of architecture or coding standards within this app and generates concise and clear
.md instructions file in markdown format for the /docs directory.
