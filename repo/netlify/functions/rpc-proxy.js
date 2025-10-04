/**
 * Netlify Function: rpc-proxy
 * Proxies JSON-RPC POST to public Solana RPC (Ankr) and adds permissive CORS.
 * HTTP only. WebSockets must be handled by an external proxy.
 */
export async function handler(event) {
  const cors = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-max-age': '86400',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors };
  }

  try {
    const upstream = 'https://rpc.ankr.com/solana';
    const resp = await fetch(upstream, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: event.body || '{}',
    });
    const body = await resp.text();
    return {
      statusCode: resp.status,
      headers: { ...cors, 'content-type': 'application/json' },
      body,
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { ...cors, 'content-type': 'application/json' },
      body: JSON.stringify({ error: String(e) }),
    };
  }
}
