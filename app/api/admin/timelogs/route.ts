import { NextResponse } from "next/server";
import { createAdminClient, verifyAdminToken } from "../../../lib/supabase-admin";

export async function POST(req: Request) {
  if (!verifyAdminToken(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createAdminClient();
  const body = await req.json();
  const { data, error } = await db.from("time_logs").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Recalculate minutes_used this month for the client
  const thisMonth = new Date().toISOString().slice(0, 7);
  const { data: logs } = await db.from("time_logs")
    .select("minutes")
    .eq("client_id", body.client_id)
    .gte("date", `${thisMonth}-01`)
    .eq("billable", false);
  const minutesUsed = (logs ?? []).reduce((s: number, l: { minutes: number }) => s + l.minutes, 0);
  await db.from("profiles").update({ last_update: new Date().toISOString().slice(0,10) }).eq("id", body.client_id);

  return NextResponse.json({ ...data, minutesUsed });
}
