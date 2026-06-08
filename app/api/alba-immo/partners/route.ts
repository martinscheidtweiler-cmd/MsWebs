import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase-server";
import { toSlug, Partner } from "../_helpers";

export async function GET() {
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("hippique_partners")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const body: Partial<Partner> = await req.json();
  const sb = supabaseServer();

  if (!body.id && body.name) body.id = toSlug(body.name);

  const { count } = await sb
    .from("hippique_partners")
    .select("*", { count: "exact", head: true });

  const { data, error } = await sb
    .from("hippique_partners")
    .insert({ ...body, sort_order: (count ?? 0) + 1 })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const partners: Partner[] = await req.json();
  const sb = supabaseServer();
  const rows = partners.map((p, i) => ({ ...p, sort_order: i + 1 }));
  const { error } = await sb.from("hippique_partners").upsert(rows);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
