import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
    );

    const { data, error } = await supabase
      .from("appointments")
      .select("appointment_date, appointment_time");

    if (error) throw error;

    const slots = (data || []).map(
      (item: { appointment_date: string; appointment_time: string }) =>
        `${item.appointment_date}_${item.appointment_time}`
    );

    return NextResponse.json({ slots });
  } catch {
    return NextResponse.json({ slots: [] });
  }
}
