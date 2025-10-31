import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToString } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  statusCode: number,
  headers: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  const userAgent = request.headers.get("user-agent");
  const html = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  headers.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + html, { status: statusCode, headers });
}


