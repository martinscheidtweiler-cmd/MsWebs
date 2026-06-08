import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../../lib/supabase-server";
import { Partner } from "../../_helpers";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body: Partial<Partner> = await req.json();
  const sb = supabaseServer();

  const { data, error } = await sb
    .from("hippique_partners")
    .update({ ...body, id: params.id })
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const sb = supabaseServer();

  // Fetch partner to get its file path, then delete from storage
  const { data: partner } = await sb
    .from("hippique_partners")
    .select("file")
    .eq("id", params.id)
    .single();

  if (partner?.file) {
    await sb.storage.from("hippique").remove([partner.file]);
  }

  const { error } = await sb
    .from("hippique_partners")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
