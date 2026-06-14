"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import "../saas.css";

export default function SetPasswordPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [validSession, setValidSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase stuurt foutmeldingen (verlopen/ongeldige link) mee als hash-parameters
    const hash = window.location.hash;
    if (hash.includes("error=")) {
      const params = new URLSearchParams(hash.slice(1));
      setError(params.get("error_description")?.replace(/\+/g, " ") || "Deze link is ongeldig of verlopen.");
      setChecking(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setValidSession(!!session);
      setChecking(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setValidSession(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Wachtwoord moet minstens 8 tekens lang zijn.");
      return;
    }
    if (password !== confirm) {
      setError("Wachtwoorden komen niet overeen.");
      return;
    }
    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    // Cache naam/bedrijf voor sidebar
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("business_name, contact_person")
        .eq("id", userData.user.id)
        .single();
      if (profile) {
        localStorage.setItem("ms_user_business", profile.business_name);
        localStorage.setItem("ms_user_name", profile.contact_person);
      }
    }

    setDone(true);
    setSaving(false);
    setTimeout(() => router.push("/dashboard"), 1800);
  }

  return (
    <div className="saas-root">
      <div className="sl-page">
        <div className="sl-left">
          <div className="sl-brand">
            <div className="sl-brand-logo">MS <span>Webdesign</span></div>
          </div>
          <div className="sl-left-content">
            <h2>Welkom bij je klantenportaal</h2>
            <p>Kies hieronder je wachtwoord om je account te activeren. Daarna kan je inloggen op je klantenportaal.</p>
            <div className="sl-features">
              {["Website status opvolgen", "Wijzigingen aanvragen", "Facturen downloaden", "Add-ons beheren"].map(f => (
                <div className="sl-feature" key={f}>
                  <div className="sl-feature-dot" />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="sl-left-footer">© {new Date().getFullYear()} MS Webdesign</div>
        </div>
        <div className="sl-right">
          <div className="sl-form-wrap">
            <div className="sl-form-title">Wachtwoord instellen</div>

            {checking && <p className="sl-form-sub">Even bezig met controleren…</p>}

            {!checking && !validSession && !done && (
              <>
                <div className="sl-error">{error || "Deze link is ongeldig of verlopen."}</div>
                <p style={{ fontSize: 13, color: "var(--s-muted)", marginTop: 16, lineHeight: 1.6 }}>
                  Vraag je accountbeheerder om een nieuwe uitnodiging te versturen, of log in als je al een wachtwoord hebt ingesteld.
                </p>
                <a href="/login" className="sl-back">← Naar inloggen</a>
              </>
            )}

            {!checking && validSession && !done && (
              <>
                <p className="sl-form-sub">Kies een wachtwoord van minstens 8 tekens om je account te activeren.</p>
                {error && <div className="sl-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="sl-field">
                    <label>Nieuw wachtwoord</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="sl-field">
                    <label>Bevestig wachtwoord</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <button className="sl-btn-primary" type="submit" disabled={saving}>
                    {saving ? "Even wachten..." : "Wachtwoord instellen →"}
                  </button>
                </form>
              </>
            )}

            {done && (
              <div className="sd-alert sd-alert-success">
                ✓ Wachtwoord ingesteld! Je wordt doorgestuurd naar je dashboard…
              </div>
            )}

            <a href="/" className="sl-back">← Terug naar website</a>
          </div>
        </div>
      </div>
    </div>
  );
}
