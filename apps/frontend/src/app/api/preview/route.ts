import { createHmac, timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const sign = (path: string, expires: string, secret: string) =>
  createHmac("sha256", secret).update(`${path}:${expires}`).digest("hex");

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const path = params.get("path") ?? "";
  const expires = params.get("expires") ?? "";
  const token = params.get("token") ?? "";
  const secret = process.env.PREVIEW_SECRET;
  const expected = secret ? sign(path, expires, secret) : "";
  const valid =
    path.startsWith("/") &&
    Number(expires) > Date.now() &&
    token.length === expected.length &&
    expected.length > 0 &&
    timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  if (!valid) return new Response("Preview link is invalid or expired. Open Preview again from the CMS.", { status: 401 });
  (await draftMode()).enable();
  redirect(path);
}
