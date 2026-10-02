import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.REVALIDATION_SECRET || "focusfix-secret-token-change-in-prod";

    if (!authHeader || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { paths = [], tags = [] } = body;

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
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
