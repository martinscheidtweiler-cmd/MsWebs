import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../../lib/supabase-server";

const BUCKET = "hippique";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const sb = supabaseServer();
  const folder = "properties/" + params.id;
  const { data } = await sb.storage.from(BUCKET).list(folder);

  const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
  const files = (data ?? []).filter((f) => {
    const ext = f.name.split(".").pop();
    return ext && IMAGE_EXTS.has("." + ext.toLowerCase());
  });

  const urls = files.map((f) => {
    const { data: urlData } = sb.storage
      .from(BUCKET)
      .getPublicUrl(folder + "/" + f.name);
    return urlData.publicUrl;
  });

  return NextResponse.json(urls);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { filename } = await req.json();
  if (!filename) return NextResponse.json({ error: "Missing filename" }, { status: 400 });

  const sb = supabaseServer();
  const safeFilename = (filename as string).split("/").pop() as string;
  const path = "properties/" + params.id + "/" + safeFilename;

  const { error } = await sb.storage.from(BUCKET).remove([path]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
