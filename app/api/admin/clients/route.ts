import { NextResponse } from "next/server";
import { createAdminClient, verifyAdminToken } from "../../../lib/supabase-admin";

export async function GET(req: Request) {
  if (!verifyAdminToken(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createAdminClient();
  const { data, error } = await db.from("profiles").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
