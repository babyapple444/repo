Deploy to Netlify (public-only, HTTP polling)
=============================================

This package uses a Netlify Function as an HTTP CORS proxy to a public Solana RPC.
WebSockets are not supported on Netlify Functions, so this is HTTP-only.
For real-time WS you need an external WS proxy (Cloudflare Worker, VPS, etc.).

Steps
-----
1) Create a new Git repo with these files or drag-drop the folder to https://app.netlify.com/drop
2) In Netlify, set build = none (no build command). Publish directory = the repo root.
3) Ensure the files exist:
   - whale-finder.html
   - netlify/functions/rpc-proxy.js
   - netlify.toml
4) Deploy. Netlify will create the function at /.netlify/functions/rpc-proxy and route /rpc to it.
5) Open your site URL: https://<your-site>.netlify.app/whale-finder.html
   The app will call POST /rpc for JSON-RPC and should display data via HTTP polling.

Local test (optional)
---------------------
Use Netlify CLI with Node >= 20:
  npm i -g netlify-cli
  netlify dev

If you cannot install Node 20, just deploy from the dashboard and test in production.

Notes
-----
- Tailwind CDN warning is informational.
- You can tune polling in the app by editing pollDelay and memeDelay in the script.
