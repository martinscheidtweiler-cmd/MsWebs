"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import "../saas.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError || !data.session) {
      setError("Ongeldig e-mailadres of wachtwoord. Probeer opnieuw.");
      setLoading(false);
      return;
    }

    // Cache name/business in localStorage for sidebar display
    const { data: profile } = await supabase
      .from("profiles")
      .select("business_name, contact_person")
      .eq("id", data.user.id)
      .single();

    if (profile) {
      localStorage.setItem("ms_user_business", profile.business_name);
      localStorage.setItem("ms_user_name", profile.contact_person);
    }

    router.push("/dashboard");
  }

  return (
    <div className="saas-root">
      <div className="sl-page">
        <div className="sl-left">
          <div className="sl-brand">
            <div className="sl-brand-logo">MS <span>Webdesign</span></div>
          </div>
          <div className="sl-left-content">
            <h2>Welkom terug bij je klantenportaal</h2>
            <p>Beheer je website, volg wijzigingen op, bekijk facturen en beheer je add-ons — alles op één plek.</p>
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
            <div className="sl-form-title">Inloggen</div>
            <p className="sl-form-sub">Log in op je klantenportaal om je website te beheren.</p>
            {error && <div className="sl-error">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="sl-field">
                <label>E-mailadres</label>
                <input
                  type="email"
                  placeholder="jouw@email.be"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="sl-field">
                <div className="sl-field-row">
                  <label>Wachtwoord</label>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <button className="sl-btn-primary" type="submit" disabled={loading}>
                {loading ? "Even wachten..." : "Inloggen →"}
              </button>
            </form>
            <p style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 20, lineHeight: 1.5 }}>
              Demo: demo@mswebs.be / demo123
            </p>
            <a href="/" className="sl-back">← Terug naar website</a>
          </div>
        </div>
      </div>
    </div>
  );
}
