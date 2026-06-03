import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── helpers ────────────────────────────────────────────────────────────────

function colorSwatch(hex: string) {
  return `<span style="display:inline-block;width:14px;height:14px;border-radius:4px;background:${hex};border:1px solid rgba(0,0,0,.15);vertical-align:middle;margin-right:6px;"></span><code style="font-size:12px;color:#555;">${hex}</code>`;
}

function row(label: string, value: string) {
  if (!value || value === "null" || value.trim() === "") return "";
  return `
    <tr>
      <td style="padding:10px 16px;color:#888;font-size:13px;white-space:nowrap;vertical-align:top;width:140px;">${label}</td>
      <td style="padding:10px 16px;color:#111;font-size:14px;vertical-align:top;">${value}</td>
    </tr>`;
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  appointment_date: string;
  appointment_time: string;
  package?: string;
  description?: string;
  colors?: string;
  inspiration_links?: string;
  discuss_in_call?: boolean;
}) {
  const dateLabel = new Date(data.appointment_date).toLocaleDateString(
    "nl-BE",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  // Parse colors string (e.g. "Hoofdkleur: #7c3cff\nTweede kleur: #ff48d4\nAccentkleur: #ffffff")
  let colorsHtml = "";
  if (data.colors) {
    const lines = data.colors.split("\n");
    colorsHtml = lines
      .map((line) => {
        const [label, hex] = line.split(": ");
        return hex
          ? `<div style="margin-bottom:6px;">${label}: ${colorSwatch(hex.trim())}</div>`
          : "";
      })
      .join("");
  }

  const linksHtml = data.inspiration_links
    ? data.inspiration_links
        .split("\n")
        .filter(Boolean)
        .map(
          (url) =>
            `<a href="${url}" style="color:#7c3cff;font-size:13px;display:block;margin-bottom:4px;" target="_blank">${url}</a>`
        )
        .join("")
    : "";

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a0936,#2d0f5e);border-radius:16px 16px 0 0;padding:36px 36px 28px;text-align:center;">
            <div style="font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#b98cff;margin-bottom:12px;">MS Webdesign</div>
            <div style="font-size:28px;font-weight:800;color:white;letter-spacing:-.03em;">📅 Nieuwe afspraak</div>
            <div style="margin-top:16px;display:inline-block;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:10px 24px;">
              <span style="color:white;font-size:16px;font-weight:700;">${dateLabel}</span>
              <span style="color:rgba(255,255,255,.6);margin:0 10px;">·</span>
              <span style="color:#c5a0ff;font-size:16px;font-weight:700;">${data.appointment_time}</span>
            </div>
          </td>
        </tr>

        <!-- Client info -->
        <tr>
          <td style="background:white;padding:0 0 0 0;">
            <div style="padding:28px 36px 8px;">
              <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:#b98cff;margin-bottom:14px;">Klantgegevens</div>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:12px;overflow:hidden;">
                ${row("Naam", data.name)}
                ${row("E-mail", `<a href="mailto:${data.email}" style="color:#7c3cff;">${data.email}</a>`)}
                ${row("Telefoon", data.phone || "")}
                ${row("Bedrijf", data.company || "")}
              </table>
            </div>
          </td>
        </tr>

        <!-- Package & details -->
        <tr>
          <td style="background:white;padding:0;">
            <div style="padding:20px 36px 8px;">
              <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:#b98cff;margin-bottom:14px;">Aanvraagdetails</div>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:12px;overflow:hidden;">
                ${row(
                  "Pakket",
                  data.package
                    ? `<span style="background:#f0e8ff;color:#7c3cff;font-weight:700;padding:3px 10px;border-radius:999px;font-size:13px;">${data.package}</span>`
                    : '<span style="color:#aaa;font-size:13px;">Nog niet gekozen</span>'
                )}
                ${
                  data.description
                    ? row(
                        "Omschrijving",
                        `<span style="line-height:1.6;">${data.description.replace(/\n/g, "<br>")}</span>`
                      )
                    : ""
                }
                ${
                  data.discuss_in_call
                    ? row(
                        "Opmerking",
                        '<span style="color:#888;">Bespreekt details liever tijdens de call</span>'
                      )
                    : ""
                }
              </table>
            </div>
          </td>
        </tr>

        ${
          colorsHtml
            ? `
        <!-- Colors -->
        <tr>
          <td style="background:white;padding:0;">
            <div style="padding:20px 36px 8px;">
              <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:#b98cff;margin-bottom:14px;">Kleurvoorkeur</div>
              <div style="border:1px solid #eee;border-radius:12px;padding:16px 16px 10px;">
                ${colorsHtml}
              </div>
            </div>
          </td>
        </tr>`
            : ""
        }

        ${
          linksHtml
            ? `
        <!-- Inspiration -->
        <tr>
          <td style="background:white;padding:0;">
            <div style="padding:20px 36px 8px;">
              <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:#b98cff;margin-bottom:14px;">Inspiratie websites</div>
              <div style="border:1px solid #eee;border-radius:12px;padding:16px;">
                ${linksHtml}
              </div>
            </div>
          </td>
        </tr>`
            : ""
        }

        <!-- CTA / reply instructions -->
        <tr>
          <td style="background:white;padding:0;border-radius:0 0 0 0;">
            <div style="padding:20px 36px 36px;">
              <div style="background:linear-gradient(135deg,rgba(124,60,255,.08),rgba(255,72,212,.06));border:1px solid rgba(124,60,255,.18);border-radius:14px;padding:22px 24px;">
                <div style="font-size:15px;font-weight:700;color:#1a0936;margin-bottom:8px;">💬 Antwoord op deze mail</div>
                <div style="font-size:14px;color:#555;line-height:1.6;">
                  Stuur <strong>${data.name}</strong> een Google Meet uitnodiging via
                  <a href="mailto:${data.email}" style="color:#7c3cff;">${data.email}</a>
                  voor <strong>${dateLabel} om ${data.appointment_time}</strong>.
                  <br><br>
                  <a href="https://meet.google.com/new" target="_blank"
                     style="display:inline-block;background:linear-gradient(135deg,#7c3cff,#a855f7);color:white;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px;text-decoration:none;">
                    📹 Nieuw Google Meet aanmaken
                  </a>
                </div>
              </div>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a0936;border-radius:0 0 16px 16px;padding:22px 36px;text-align:center;">
            <div style="color:rgba(255,255,255,.45);font-size:12px;">
              MS Webdesign · Automatisch gegenereerd via de website
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── API handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      appointment_date,
      appointment_time,
      name,
      email,
      phone,
      company,
      description,
      package: pkg,
      primary_color,
      secondary_color,
      accent_color,
      inspiration_links,
      discuss_in_call,
    } = body;

    // 1. Validate required fields
    if (!name || !email || !appointment_date || !appointment_time) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    // 2. Check if slot is already taken
    const { data: existing } = await supabase
      .from("appointments")
      .select("id")
      .eq("appointment_date", appointment_date)
      .eq("appointment_time", appointment_time)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "slot_taken" }, { status: 409 });
    }

    // 3. Save to Supabase
    const colors = [
      primary_color ? `Hoofdkleur: ${primary_color}` : null,
      secondary_color ? `Tweede kleur: ${secondary_color}` : null,
      accent_color ? `Accentkleur: ${accent_color}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const links = Array.isArray(inspiration_links)
      ? inspiration_links.filter(Boolean).join("\n")
      : "";

    const { error: dbError } = await supabase.from("appointments").insert({
      appointment_date,
      appointment_time,
      package: pkg || null,
      name,
      email,
      phone: phone || null,
      company: company || null,
      description: description || null,
      colors: colors || null,
      inspiration_links: links || null,
      discuss_in_call: !!discuss_in_call,
    });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "db_error" }, { status: 500 });
    }

    // 4. Send e-mail via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const receiverEmail =
      process.env.APPOINTMENT_RECEIVER_EMAIL || "martinscheidtweiler@gmail.com";

    if (resendKey) {
      const dateLabel = new Date(appointment_date).toLocaleDateString("nl-BE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const emailPayload = {
        from: "MS Webdesign <onboarding@resend.dev>",
        to: [receiverEmail],
        reply_to: email,
        subject: `📅 Nieuwe afspraak — ${name} | ${dateLabel} om ${appointment_time}`,
        html: buildEmailHtml({
          name,
          email,
          phone,
          company,
          appointment_date,
          appointment_time,
          package: pkg,
          description,
          colors,
          inspiration_links: links,
          discuss_in_call,
        }),
      };

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });

      if (!resendRes.ok) {
        const err = await resendRes.text();
        console.error("Resend error:", err);
        // Don't fail the request — appointment is already saved
      }
    } else {
      console.warn("RESEND_API_KEY not set — e-mail not sent.");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Appointment API error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
