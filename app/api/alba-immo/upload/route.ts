import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase-server";

const BUCKET = "hippique";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const dest = formData.get("dest") as string | null;

    if (!file || !dest) {
      return NextResponse.json({ error: "Missing file or dest" }, { status: 400 });
    }

    const safeDest = dest.replace(/\.\./g, "").replace(/^\/+/, "");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const sb = supabaseServer();

    const { error } = await sb.storage
      .from(BUCKET)
      .upload(safeDest, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const { data } = sb.storage.from(BUCKET).getPublicUrl(safeDest);
    return NextResponse.json({ path: safeDest, url: data.publicUrl, ok: true });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
