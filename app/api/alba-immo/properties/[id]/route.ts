// Next.js 16: params is a Promise
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../../lib/supabase-server";
import { propFromRow, propToRow, Property } from "../../_helpers";

export async function GET(_req: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("hippique_properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(propFromRow(data));
}

export async function PUT(req: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const body: Partial<Property> = await req.json();
  const sb = supabaseServer();
  const row = propToRow({ ...body, id });

  const { data, error } = await sb
    .from("hippique_properties")
    .update(row)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(propFromRow(data));
}

export async function DELETE(_req: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const sb = supabaseServer();

  const { data: files } = await sb.storage
    .from("hippique")
    .list("properties/" + id);

  if (files && files.length > 0) {
    const paths = files.map((f) => "properties/" + id + "/" + f.name);
    await sb.storage.from("hippique").remove(paths);
  }

  const { error } = await sb
    .from("hippique_properties")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
