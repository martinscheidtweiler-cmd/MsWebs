import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../../lib/supabase-server";

export async function GET(_req: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const sb = supabaseServer();
  const folder = "properties/" + id;
  const { data, error } = await sb.storage.from("hippique").list(folder);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const urls = (data ?? []).map((f) => {
    const { data: urlData } = sb.storage.from("hippique").getPublicUrl(folder + "/" + f.name);
    return { name: f.name, url: urlData.publicUrl };
  });
  return NextResponse.json(urls);
}

export async function DELETE(req: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const { filename } = await req.json();
  const safeFilename = String(filename).replace(/[^a-zA-Z0-9._-]/g, "");
  const sb = supabaseServer();
  const path = "properties/" + id + "/" + safeFilename;
  const { error } = await sb.storage.from("hippique").remove([path]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
