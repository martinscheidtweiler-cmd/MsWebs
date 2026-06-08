import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase-server";
import { blogFromRow, blogToRow, toSlug, BlogPost } from "../_helpers";

export async function GET() {
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("hippique_blog")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json((data ?? []).map(blogFromRow));
}

export async function POST(req: NextRequest) {
  const body: Partial<BlogPost> = await req.json();
  const sb = supabaseServer();

  if (!body.id && body.title) {
    let slug = toSlug(body.title).slice(0, 60);
    const { data: existing } = await sb
      .from("hippique_blog")
      .select("id")
      .like("id", slug + "%");
    if (existing && existing.length > 0) slug = slug + "-" + (existing.length + 1);
    body.id = slug;
  }

  const row = blogToRow(body as BlogPost);

  const { data, error } = await sb
    .from("hippique_blog")
    .insert(row)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(blogFromRow(data), { status: 201 });
}
