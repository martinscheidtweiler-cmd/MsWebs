import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase-server";

export async function GET() {
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("hippique_content")
    .select("data")
    .eq("id", 1)
    .single();

  if (error) return NextResponse.json({}, { status: 200 });
  return NextResponse.json(data?.data ?? {});
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const sb = supabaseServer();

  const { data: existing } = await sb
    .from("hippique_content")
    .select("data")
    .eq("id", 1)
    .single();

  const merged = deepMerge(
    (existing?.data ?? {}) as Record<string, unknown>,
    body as Record<string, unknown>
  );

  const { data, error } = await sb
    .from("hippique_content")
    .upsert({ id: 1, data: merged })
    .select("data")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data?.data ?? {});
}

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      typeof target[key] === "object" &&
      target[key] !== null &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(
        target[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>
      );
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
