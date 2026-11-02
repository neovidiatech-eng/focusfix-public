import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    // Accept the secret via x-revalidate-secret header (sent by backend)
    // OR via Authorization: Bearer header (legacy support)
    // REVALIDATE_SECRET must match the API's value; REVALIDATION_SECRET kept for older deployments
    const secret = process.env.REVALIDATE_SECRET || process.env.REVALIDATION_SECRET;
    if (!secret) {
      return NextResponse.json({ success: false, message: "Revalidation is not configured" }, { status: 503 });
    }
    const xSecret = req.headers.get("x-revalidate-secret");
    const authHeader = req.headers.get("authorization");

    const isAuthorized =
      xSecret === secret || authHeader === `Bearer ${secret}`;

    if (!isAuthorized) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const paths: string[] = Array.isArray(body?.paths) ? body.paths.filter((p: unknown) => typeof p === "string" && p.startsWith("/")) : [];
    const tags: string[] = Array.isArray(body?.tags) ? body.tags.filter((t: unknown) => typeof t === "string") : [];

    for (const p of paths) {
      revalidatePath(p);
    }

    for (const t of tags) {
      revalidateTag(t);
    }

    return NextResponse.json({
      success: true,
      revalidatedPaths: paths,
      revalidatedTags: tags,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid revalidation request" }, { status: 400 });
  }
}
