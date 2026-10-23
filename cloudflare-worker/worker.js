export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const publicPath = String(env.PUBLIC_PATH || "");
    const originHost = String(env.FIXED_ORIGIN_HOST || "");
    const originPath = String(env.FIXED_ORIGIN_PATH || "");

    if (url.pathname === "/health") {
      return new Response("ok", {
        status: 200,
        headers: {"cache-control":"no-store"}
      });
    }

    if (!publicPath || !originHost || !originPath) {
      return new Response("unconfigured",{status:503});
    }

    if (url.pathname !== publicPath) {
      return new Response("not found",{status:404});
    }

    if ((request.headers.get("upgrade") || "").toLowerCase() !== "websocket") {
      return new Response("upgrade required",{status:426});
    }

    const upstream = new URL(request.url);
    upstream.protocol = "https:";
    upstream.hostname = originHost;
    upstream.port = "443";
    upstream.pathname = originPath;
    upstream.search = "";

    const headers = new Headers(request.headers);
    headers.delete("cf-connecting-ip");
    headers.delete("x-forwarded-for");

    return fetch(new Request(upstream.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual",
    }));
  }
};
