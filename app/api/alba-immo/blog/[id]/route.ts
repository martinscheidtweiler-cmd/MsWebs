import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../../lib/supabase-server";
import { blogFromRow, blogToRow, BlogPost } from "../../_helpers";

export async function GET(_req: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("hippique_blog")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(blogFromRow(data));
}

export async function PUT(req: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const body: Partial<BlogPost> = await req.json();
  const sb = supabaseServer();
  const row = blogToRow({ ...body, id });
  const { data, error } = await sb
    .from("hippique_blog")
    .update(row)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(blogFromRow(data));
}

export async function DELETE(_req: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const sb = supabaseServer();
  const { error } = await sb
    .from("hippique_blog")
    .delete()
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
