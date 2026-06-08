import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase-server";
import { propFromRow, propToRow, toSlug, Property } from "../_helpers";

export async function GET() {
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("hippique_properties")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json((data ?? []).map(propFromRow));
}

export async function POST(req: NextRequest) {
  const body: Partial<Property> = await req.json();
  const sb = supabaseServer();

  if (!body.id && body.title) {
    let slug = toSlug(body.title);
    const { data: existing } = await sb
      .from("hippique_properties")
      .select("id")
      .like("id", slug + "%");
    if (existing && existing.length > 0) slug = slug + "-" + (existing.length + 1);
    body.id = slug;
  }

  const { count } = await sb
    .from("hippique_properties")
    .select("*", { count: "exact", head: true });

  const row = { ...propToRow(body as Property), sort_order: (count ?? 0) + 1 };

  const { data, error } = await sb
    .from("hippique_properties")
    .insert(row)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(propFromRow(data), { status: 201 });
}
