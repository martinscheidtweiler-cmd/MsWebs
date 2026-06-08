import { NextResponse } from "next/server";
import { createAdminClient, verifyAdminToken } from "../../../../lib/supabase-admin";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!verifyAdminToken(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createAdminClient();
  const [{ data: profile }, { data: timeLogs }, { data: requests }, { data: uploads }] = await Promise.all([
    db.from("profiles").select("*").eq("id", params.id).single(),
    db.from("time_logs").select("*").eq("client_id", params.id).order("date", { ascending: false }),
    db.from("requests").select("*").eq("client_id", params.id).order("created_at", { ascending: false }),
    db.from("uploads").select("*").eq("client_id", params.id).order("created_at", { ascending: false }),
  ]);
  return NextResponse.json({ profile, timeLogs: timeLogs ?? [], requests: requests ?? [], uploads: uploads ?? [] });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!verifyAdminToken(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createAdminClient();
  const body = await req.json();
  const { error } = await db.from("profiles").update(body).eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
