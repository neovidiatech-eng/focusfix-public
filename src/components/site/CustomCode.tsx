import { parseDocument } from "htmlparser2";
import render from "dom-serializer";
import type { ChildNode, Element } from "domhandler";

/**
 * Renders tracking code the admin pasted in the dashboard (GTM, Meta Pixel, TikTok, Google Ads…).
 * Server-rendered, so inline scripts run on page load like a hand-written <script>.
 *
 * - "head": only tags valid in <head> (script, noscript, meta, link, style); anything else is dropped
 * - "body": everything; non-script markup (noscript iframes, pixels, widget containers) is kept as-is
 */

const REACT_ATTR: Record<string, string> = {
  class: "className",
  crossorigin: "crossOrigin",
  referrerpolicy: "referrerPolicy",
  nomodule: "noModule",
  nonce: "nonce",
  "http-equiv": "httpEquiv",
  charset: "charSet",
  fetchpriority: "fetchPriority",
};

const BOOLEAN_ATTR = new Set(["async", "defer", "nomodule"]);

function toProps(attribs: Record<string, string>) {
  const props: Record<string, string | boolean> = {};
  for (const [name, value] of Object.entries(attribs)) {
    const key = name.toLowerCase();
    if (key.startsWith("on")) continue; // inline handlers can't be passed as strings to React
    if (BOOLEAN_ATTR.has(key)) props[REACT_ATTR[key] || key] = true;
    else props[REACT_ATTR[key] || key] = value;
  }
  return props;
}

const inner = (el: Element) => render(el.children as ChildNode[], { decodeEntities: false });

function renderNode(node: ChildNode, i: number, place: "head" | "body") {
  if (node.type === "comment" || (node.type === "text" && !node.data.trim())) return null;

  if (node.type === "script" || node.type === "style" || node.type === "tag") {
    const el = node as Element;
    const name = el.name.toLowerCase();
    const props = toProps(el.attribs);
    if (name === "script") return <script key={i} {...props} dangerouslySetInnerHTML={{ __html: inner(el) }} />;
    if (name === "style") return <style key={i} {...props} dangerouslySetInnerHTML={{ __html: inner(el) }} />;
    if (name === "noscript") return <noscript key={i} dangerouslySetInnerHTML={{ __html: inner(el) }} />;
    if (name === "meta") return <meta key={i} {...props} />;
    if (name === "link") return <link key={i} {...props} />;
  }

  if (place === "head") return null;
  // Any other markup in the body (e.g. a pixel <img>, a chat widget <div>) is passed through untouched
  const html = render(node, { decodeEntities: false });
  return <div key={i} style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function CustomCode({ html, place }: { html?: string; place: "head" | "body" }) {
  if (!html?.trim()) return null;
  const doc = parseDocument(html, { decodeEntities: false, lowerCaseAttributeNames: true });
  return <>{doc.children.map((n, i) => renderNode(n, i, place))}</>;
}
