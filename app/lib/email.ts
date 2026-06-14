// ─────────────────────────────────────────────────────────────
// MS Webdesign — Resend e-mail helper
// ─────────────────────────────────────────────────────────────

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("RESEND_API_KEY ontbreekt — e-mail niet verstuurd.");
    return { ok: false, error: "RESEND_API_KEY ontbreekt" };
  }

  const from = process.env.RESEND_FROM_EMAIL || "MS Webdesign <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(opts.to) ? opts.to : [opts.to],
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return { ok: false, error: err };
  }
  return { ok: true };
}

// ── Branded e-mail templates ────────────────────────────────

export function welcomeEmailHtml(opts: {
  businessName: string;
  contactPerson: string;
  setPasswordUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr>
          <td style="background:linear-gradient(135deg,#1a0936,#2d0f5e);border-radius:16px 16px 0 0;padding:36px 36px 28px;text-align:center;">
            <div style="font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#b98cff;margin-bottom:12px;">MS Webdesign</div>
            <div style="font-size:28px;font-weight:800;color:white;letter-spacing:-.03em;">👋 Welkom, ${opts.businessName}!</div>
          </td>
        </tr>

        <tr>
          <td style="background:white;padding:0;">
            <div style="padding:32px 36px;">
              <p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px;">
                Hoi ${opts.contactPerson},
              </p>
              <p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px;">
                Er is een klantenaccount voor je aangemaakt op het MS Webdesign klantenportaal.
                Daar kan je straks de voortgang van je website opvolgen, wijzigingen aanvragen
                en je facturen bekijken.
              </p>
              <p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 24px;">
                Klik op de knop hieronder om je wachtwoord te kiezen en je account te activeren.
              </p>
              <div style="text-align:center;margin-bottom:8px;">
                <a href="${opts.setPasswordUrl}" target="_blank"
                   style="display:inline-block;background:linear-gradient(135deg,#7c3cff,#a855f7);color:white;font-weight:700;font-size:15px;padding:14px 32px;border-radius:999px;text-decoration:none;">
                  🔑 Wachtwoord instellen
                </a>
              </div>
              <p style="font-size:12px;color:#999;line-height:1.6;margin:24px 0 0;text-align:center;">
                Werkt de knop niet? Kopieer en plak deze link in je browser:<br>
                <a href="${opts.setPasswordUrl}" style="color:#7c3cff;word-break:break-all;">${opts.setPasswordUrl}</a>
              </p>
            </div>
          </td>
        </tr>

        <tr>
          <td style="background:#1a0936;border-radius:0 0 16px 16px;padding:22px 36px;text-align:center;">
            <div style="color:rgba(255,255,255,.45);font-size:12px;">
              MS Webdesign · Vragen? Antwoord gewoon op deze mail.
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
