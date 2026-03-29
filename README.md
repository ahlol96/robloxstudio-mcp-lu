# robloxstudio-mcp-lu

**Roblox Studio MCP — optimized fork with reduced token usage**

Connect Claude to Roblox Studio so it can read/edit scripts, modify instances, and make bulk changes directly in your open project.

---

## Setup

### Requirements
- [Node.js](https://nodejs.org) v18+
- Roblox Studio
- Claude Code (VS Code extension)

---

### 1 — Clone & build

```bash
git clone https://github.com/ahlol96/robloxstudio-mcp-lu.git
cd robloxstudio-mcp-lu
npm install
npm run build
```

---

### 2 — Install the Studio plugin

```bash
npm run build:plugin
```

This automatically copies `MCPPlugin.rbxmx` to your Roblox Plugins folder.

If it doesn't copy automatically, do it manually:

- Find: `studio-plugin/MCPPlugin.rbxmx`
- Copy to: `%LOCALAPPDATA%\Roblox\Plugins\`

Then **restart Roblox Studio** — the MCPPlugin button will appear in the toolbar.

> Also make sure **Allow HTTP Requests** is enabled:
> Experience Settings → Security → Allow HTTP Requests ✓

---

### 3 — Register the MCP server with Claude

Run this command — update the path to wherever you cloned the repo:

```bash
claude mcp add robloxstudio-mcp -s user -- node "C:\YOUR\PATH\robloxstudio-mcp-lu\packages\robloxstudio-mcp\dist\index.js"
```

Example if you cloned to your Desktop:

```bash
claude mcp add robloxstudio-mcp -s user -- node "C:\Users\YOURNAME\Desktop\robloxstudio-mcp-lu\packages\robloxstudio-mcp\dist\index.js"
```

---

### 4 — Verify

```bash
claude mcp list
```

You should see:

```
robloxstudio-mcp: node ... - ✓ Connected
```

---

### 5 — Connect in Studio

Open Roblox Studio with your place, click the **MCPPlugin** button in the toolbar. It will show **Connected** when ready.

---

## What's different from the original?

- **38 tools instead of 55** — removed redundant/rarely-used tools so Claude uses fewer tokens per request
- **Trimmed descriptions** — all tool schemas are as compact as possible
- Plugin built and included in the repo (`studio-plugin/MCPPlugin.rbxmx`)
