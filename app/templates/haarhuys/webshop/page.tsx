"use client";

import { useState } from "react";
import "../haarhuys.css";
import { HaarhyusFooter } from "../page";

type CartItem = {
  id: number;
  brand: string;
  name: string;
  vol: string;
  price: number;
  qty: number;
};

const PRODUCTS = [
  { id: 1, brand: "CurlSys", name: "Curl Cleanser", vol: "250ml · Sulfaatvrije reiniger", price: 24.90, cat: "krullen", badge: "new" },
  { id: 2, brand: "CurlSys", name: "Curl Activator", vol: "200ml · Krul-definiërende crème", price: 27.50, cat: "krullen", badge: "" },
  { id: 3, brand: "CurlSys", name: "Curl Conditioner", vol: "250ml · Hydraterende conditioner", price: 25.90, cat: "krullen", badge: "best" },
  { id: 4, brand: "Oright", name: "Camellia Oil Shampoo", vol: "400ml · Biologische shampoo", price: 22.00, cat: "shampoo", badge: "" },
  { id: 5, brand: "Oright", name: "Camellia Oil Conditioner", vol: "400ml · Voedende conditioner", price: 24.00, cat: "behandeling", badge: "" },
  { id: 6, brand: "Oright", name: "Grapefruit Hair Mask", vol: "200ml · Diep voedend masker", price: 21.00, cat: "behandeling", badge: "sale" },
  { id: 7, brand: "Joico", name: "K-PAK Reconstructor", vol: "150ml · Herstellend masker", price: 19.95, cat: "behandeling", badge: "sale" },
  { id: 8, brand: "Joico", name: "Curl Co-Wash", vol: "295ml · Conditioner-wassen", price: 21.50, cat: "krullen", badge: "new" },
  { id: 9, brand: "Jean Paul Myné", name: "Navitas Organic Mousse", vol: "300ml · Licht volumegevend schuim", price: 18.50, cat: "styling", badge: "" },
  { id: 10, brand: "Jean Paul Myné", name: "Serum Brilliant", vol: "100ml · Anti-frizz serum", price: 23.90, cat: "styling", badge: "" },
  { id: 11, brand: "Joico", name: "Curl Defining Crème", vol: "200ml · Definiërende crème", price: 22.50, cat: "krullen", badge: "best" },
  { id: 12, brand: "Oright", name: "Argan Oil Treatment", vol: "100ml · Herstellende argan olie", price: 32.00, cat: "behandeling", badge: "" },
];

const FILTERS = [
  { key: "all", label: "Alle producten" },
  { key: "krullen", label: "Krullen" },
  { key: "shampoo", label: "Shampoo" },
  { key: "behandeling", label: "Behandeling" },
  { key: "styling", label: "Styling" },
];

export default function WebshopPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);

  function showToast(msg: string) {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }

  function addToCart(product: typeof PRODUCTS[0]) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} toegevoegd`);
  }

  function updateQty(id: number, delta: number) {
    setCart(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0);
      return updated;
    });
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const freeShippingThreshold = 60;
  const toFreeShipping = Math.max(0, freeShippingThreshold - total);

  return (
    <div className="hh-root">
      <nav className="hh-nav">
        <div className="hh-nav-inner">
          <a href="/templates/haarhuys" className="hh-nav-logo">'t <span>Haarhuys</span></a>
          <ul className="hh-nav-links">
            <li><a href="/templates/haarhuys/over">Over ons</a></li>
            <li><a href="/templates/haarhuys/diensten">Diensten</a></li>
            <li><a href="/templates/haarhuys/webshop" className="hh-active">Webshop</a></li>
            <li><a href="/templates/haarhuys/headspa">Headspa</a></li>
            <li><a href="/templates/haarhuys/contact">Contact</a></li>
          </ul>
          <div className="hh-nav-right">
            <div
              style={{ position: "relative", cursor: "pointer", color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center" }}
              onClick={() => setCartOpen(true)}
            >
              <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: "currentColor", fill: "none", strokeWidth: 1.5 }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="hh-cart-badge" style={{
                  position: "absolute", top: -8, right: -10,
                  width: 18, height: 18, background: "var(--hh-gold)", color: "var(--hh-black)",
                  borderRadius: "50%", fontSize: 10, fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {cartCount}
                </span>
              )}
            </div>
            <a href="/templates/haarhuys/contact" className="hh-nav-cta">Afspraak</a>
            <button className="hh-hamburger" aria-label="Menu" onClick={() => setMobileOpen(v => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <nav className={`hh-mobile-menu${mobileOpen ? " open" : ""}`}>
        <a href="/templates/haarhuys/over" onClick={() => setMobileOpen(false)}>Over ons</a>
        <a href="/templates/haarhuys/diensten" onClick={() => setMobileOpen(false)}>Diensten</a>
        <a href="/templates/haarhuys/webshop" className="hh-active" onClick={() => setMobileOpen(false)}>Webshop</a>
        <a href="/templates/haarhuys/headspa" onClick={() => setMobileOpen(false)}>Headspa</a>
        <a href="/templates/haarhuys/contact" onClick={() => setMobileOpen(false)}>Contact & Afspraak</a>
      </nav>

      <header className="hh-page-header">
        <div className="hh-page-header-grid" />
        <div className="hh-page-header-line" />
        <div className="hh-container hh-page-header-content">
          <div className="hh-breadcrumb">
            <a href="/templates/haarhuys">Home</a>
            <span>›</span>
            <span>Webshop</span>
          </div>
          <h1>Web<em>shop</em></h1>
          <p className="hh-page-header-sub">
            Professionele haarverzorgingsproducten. Gratis verzending vanaf €60.
          </p>
        </div>
      </header>

      <section className="hh-shop">
        <div className="hh-container">
          <div className="hh-shop-toolbar">
            <div className="hh-shop-filters">
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  className={`hh-filter-btn${filter === f.key ? " active" : ""}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="hh-shop-count">{filtered.length} producten</span>
          </div>

          <div className="hh-product-grid">
            {filtered.map(product => (
              <div key={product.id} className="hh-product-card">
                <div className="hh-product-img-wrap">
                  <div className="hh-product-img-inner">
                    <div className="hh-product-brand-logo">{product.brand}</div>
                    <div className="hh-product-type-icon" />
                  </div>
                  {product.badge && (
                    <span className={`hh-product-badge hh-badge-${product.badge}`}>
                      {product.badge === "new" ? "Nieuw" : product.badge === "sale" ? "Sale" : "Bestseller"}
                    </span>
                  )}
                  <button
                    className="hh-product-add-btn"
                    onClick={() => addToCart(product)}
                  >
                    Toevoegen
                  </button>
                </div>
                <div className="hh-product-details">
                  <div className="hh-product-brand">{product.brand}</div>
                  <div className="hh-product-name">{product.name}</div>
                  <div className="hh-product-vol">{product.vol}</div>
                  <div className="hh-product-price-row">
                    <span className="hh-product-price">€{product.price.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking strip */}
      <div className="hh-booking-strip">
        <div className="hh-container">
          <div className="hh-booking-strip-inner">
            <div>
              <h3>Ook een afspraak inplannen?</h3>
              <p>Persoonlijk advies over uw ideale haarroutine.</p>
            </div>
            <a href="/templates/haarhuys/contact" className="hh-booking-strip-btn">
              Afspraak maken →
            </a>
          </div>
        </div>
      </div>

      <HaarhyusFooter activePage="webshop" />

      {/* Cart overlay + drawer */}
      <div
        className={`hh-cart-overlay${cartOpen ? " open" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <div className={`hh-cart-drawer${cartOpen ? " open" : ""}`}>
        <div className="hh-cart-header">
          <div>
            <div className="hh-cart-header-title">Winkelmandje</div>
            <div className="hh-cart-header-count">{cartCount} artikel{cartCount !== 1 ? "en" : ""}</div>
          </div>
          <button className="hh-cart-close-btn" onClick={() => setCartOpen(false)}>×</button>
        </div>
        <div className="hh-cart-body">
          {cart.length === 0 ? (
            <div className="hh-cart-empty">
              <div className="hh-cart-empty-line" />
              <div className="hh-cart-empty-title">Uw mandje is leeg</div>
              <p>Voeg producten toe vanuit de webshop.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="hh-cart-item">
                <div className="hh-cart-item-img">{item.brand.split(" ")[0]}</div>
                <div>
                  <div className="hh-cart-item-brand">{item.brand}</div>
                  <div className="hh-cart-item-name">{item.name}</div>
                  <div className="hh-cart-item-qty">
                    <button className="hh-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button className="hh-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <div className="hh-cart-item-price">€{(item.price * item.qty).toFixed(2).replace(".", ",")}</div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="hh-cart-footer">
            <div className="hh-cart-subtotal">
              <span>Subtotaal</span>
              <span>€{total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="hh-cart-total-row">
              <span>Totaal</span>
              <span>€{total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className={`hh-cart-shipping-msg${toFreeShipping === 0 ? " hh-free" : ""}`}>
              {toFreeShipping === 0
                ? "✓ Gratis verzending!"
                : `Voeg €${toFreeShipping.toFixed(2).replace(".", ",")} toe voor gratis verzending`}
            </div>
            <button className="hh-cart-checkout" onClick={() => alert("Kassa-functionaliteit te koppelen aan betalingsplatform.")}>
              Afrekenen →
            </button>
          </div>
        )}
      </div>

      {/* Toast */}
      <div className={`hh-toast${toastVisible ? " show" : ""}`}>
        <span className="hh-toast-dot" />
        <span>{toastMsg}</span>
      </div>
    </div>
  );
}
