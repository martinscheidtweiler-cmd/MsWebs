"use client";

import { useState } from "react";
import Link from "next/link";
import MHiNav from "../MHiNav";
import MHiFooter from "../MHiFooter";
import "../mhi.css";

const BASE = "/templates/alba-modern";

function Foto({ label }: { label?: string }) {
  return <div className="mFoto">{label ?? "foto"}</div>;
}

const ALL_PANDEN = [
  { id: "4450", type: "Villa",        city: "Tervuren",   price: "€ 895.000",  horses: 5, status: "koop",  badge: "new" },
  { id: "4567", type: "Appartement",  city: "Leuven",     price: "€ 545.000",  horses: 4, status: "koop",  badge: "" },
  { id: "4545", type: "Woning",       city: "Heverlee",   price: "€ 395.000",  horses: 3, status: "koop",  badge: "reduced" },
  { id: "4566", type: "Woning",       city: "Kessel-Lo",  price: "€ 319.000",  horses: 3, status: "koop",  badge: "" },
  { id: "4512", type: "Appartement",  city: "Leuven",     price: "€ 980/mnd",  horses: 2, status: "huur",  badge: "new" },
  { id: "4533", type: "Studio",       city: "Leuven",     price: "€ 650/mnd",  horses: 1, status: "huur",  badge: "" },
  { id: "4488", type: "Villa",        city: "Overijse",   price: "€ 1.250.000",horses: 6, status: "koop",  badge: "" },
  { id: "4499", type: "Bungalow",     city: "Bierbeek",   price: "€ 445.000",  horses: 3, status: "koop",  badge: "" },
  { id: "4501", type: "Appartement",  city: "Heverlee",   price: "€ 1.200/mnd",horses: 2, status: "huur",  badge: "" },
];

const PER_PAGE = 9;

const PRIJS_OPTIES = [
  { label: "Alle prijzen", horses: 0 },
  { label: "Tot € 200.000", horses: 1 },
  { label: "€ 200.000 – € 350.000", horses: 2 },
  { label: "€ 350.000 – € 500.000", horses: 3 },
  { label: "€ 500.000 – € 750.000", horses: 4 },
  { label: "€ 750.000 – € 1.000.000", horses: 5 },
  { label: "Meer dan € 1.000.000", horses: 6 },
];

export default function AanbodPage() {
  const [mode, setMode]         = useState<"koop"|"huur">("koop");
  const [stad, setStad]         = useState("");
  const [prijsIdx, setPrijsIdx] = useState(0);
  const [dropOpen, setDropOpen] = useState(false);
  const [page, setPage]         = useState(1);

  const filtered = ALL_PANDEN.filter((p) => {
    if (p.status !== mode) return false;
    if (stad && p.city !== stad) return false;
    if (prijsIdx > 0 && p.horses !== PRIJS_OPTIES[prijsIdx].horses) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const steden = Array.from(new Set(ALL_PANDEN.map((p) => p.city))).sort();

  return (
    <>
      <MHiNav />

      {/* Filter bar */}
      <div className="mFilterBar">
        <div className="mFilterInner">
          <div className="mFilterToggle">
            <button className={`mFilterToggleBtn${mode === "koop" ? " on" : ""}`} onClick={() => { setMode("koop"); setPage(1); }}>
              Te koop
            </button>
            <button className={`mFilterToggleBtn${mode === "huur" ? " on" : ""}`} onClick={() => { setMode("huur"); setPage(1); }}>
              Te huur
            </button>
          </div>

          <select className="mFilterSel" value={stad} onChange={(e) => { setStad(e.target.value); setPage(1); }}>
            <option value="">Alle gemeenten</option>
            {steden.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Prijs dropdown */}
          <div className="mFilterPrijsWrap">
            <button
              className={`mFilterPrijsBtn${dropOpen ? " open" : ""}`}
              onClick={() => setDropOpen((o) => !o)}
            >
              <span>
                {prijsIdx === 0
                  ? "Prijs"
                  : <span className="mHorses">{"🐴".repeat(PRIJS_OPTIES[prijsIdx].horses)}</span>
                }
              </span>
              <span style={{ fontSize: 10 }}>▾</span>
            </button>
            {dropOpen && (
              <div className="mFilterPrijsDrop">
                {PRIJS_OPTIES.map((o, i) => (
                  <button
                    key={i}
                    className={`mFilterPrijsOpt${prijsIdx === i ? " on" : ""}`}
                    onClick={() => { setPrijsIdx(i); setDropOpen(false); setPage(1); }}
                  >
                    {i > 0 && <span className="mHorses">{"🐴".repeat(o.horses)}</span>}
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="mFilterZoekBtn" onClick={() => setPage(1)}>Zoeken</button>
          <span className="mFilterCount">{filtered.length} pand{filtered.length !== 1 ? "en" : ""}</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="mWrap">
        <div className="mBreadcrumb">
          <Link href={BASE}>Home</Link>
          <span>/</span>
          <span>Aanbod</span>
        </div>

        <div className="mAanbodLayout">
          {/* Sidebar */}
          <aside className="mSidebar">
            <div className="mSidebarBox">
              <div className="mSidebarTitle">Discrete portefeuille</div>
              <p className="mSidebarText">
                Sommige eigendommen worden discreet aangeboden. Neem contact op voor meer informatie.
              </p>
              <Link href={`${BASE}/contact`} className="mSidebarBtn">Contacteer ons</Link>
            </div>

            <div className="mSidebarBox">
              <div className="mSidebarTitle">Extra zoeken</div>
              <p className="mSidebarText">Op zoek naar iets specifieks? Wij zoeken voor u.</p>
              <div className="mSidebarLinks">
                <a href="#">→ Zoekopdracht instellen</a>
                <a href="#">→ Nieuwe panden per mail</a>
                <a href={`${BASE}/contact`}>→ Persoonlijk advies</a>
              </div>
            </div>

            <div className="mSidebarBox">
              <div className="mSidebarTitle">Gratis schatting</div>
              <p className="mSidebarText">Wat is uw eigendom waard? Vraag een gratis en vrijblijvende schatting aan.</p>
              <Link href={`${BASE}/contact`} className="mSidebarBtn">Schatting aanvragen</Link>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="mGridMeta">
              <span><strong>{filtered.length}</strong> pand{filtered.length !== 1 ? "en" : ""} gevonden</span>
              <span>Pagina {page} / {totalPages}</span>
            </div>

            {visible.length === 0 ? (
              <p style={{ color: "var(--muted)", fontSize: 14 }}>Geen panden gevonden voor de geselecteerde filters.</p>
            ) : (
              <div className="mGrid">
                {visible.map((p) => (
                  <div className="mCard" key={p.id}>
                    <div className="mCardImg">
                      <Foto />
                      {p.badge === "new"     && <div className="mCardBadge mb-new">Nieuw</div>}
                      {p.badge === "reduced" && <div className="mCardBadge mb-reduced">Prijs verlaagd</div>}
                    </div>
                    <div className="mCardBody">
                      <div className="mCardType">{p.type} · te {mode}</div>
                      <div className="mCardRow">
                        <span className="mCardPrice">{p.price}</span>
                        <span className="mCardCity">{p.city}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span className="mCardHorses">{"🐴".repeat(p.horses)}</span>
                      </div>
                      <div className="mCardFoot">
                        <Link href={`${BASE}/aanbod/${p.id}`} className="mMeerInfo">Meer info</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <>
                <div className="mPager">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`mPageBtn${page === i + 1 ? " on" : ""}`}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="mPagerMeta">
                  {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} van {filtered.length} panden
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <MHiFooter />
    </>
  );
}
