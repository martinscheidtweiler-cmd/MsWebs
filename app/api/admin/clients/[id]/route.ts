import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase-server";

export async function GET(req: Request, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const db = supabaseServer();
  const [profile, timeLogs, requests, uploads] = await Promise.all([
    db.from("profiles").select("*").eq("id", id).single(),
    db.from("time_logs").select("*").eq("client_id", id).order("date", { ascending: false }),
    db.from("requests").select("*").eq("client_id", id).order("created_at", { ascending: false }),
    db.from("uploads").select("*").eq("client_id", id).order("created_at", { ascending: false }),
  ]);
  if (profile.error) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ profile: profile.data, timeLogs: timeLogs.data ?? [], requests: requests.data ?? [], uploads: uploads.data ?? [] });
}

export async function PUT(req: Request, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise;
  const body = await req.json();
  const db = supabaseServer();
  const { error } = await db.from("profiles").update(body).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
