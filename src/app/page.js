import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import marketBasket from "../../assets/bazar-hero.png";
import { formatBengaliNumber, getProductUnit, getProducts } from "../lib/products";

const categories = [
  { icon: "🌾", name: "চাল", price: "৬৮ টাকা/কেজি" },
  { icon: "🫘", name: "ডাল", price: "১২০ টাকা/কেজি" },
  { icon: "🫒", name: "তেল", price: "১৮৫ টাকা/লিটার" },
  { icon: "🥬", name: "সবজি", price: "বাজারদর দেখুন" },
  { icon: "🐟", name: "মাছ", price: "২৮০ টাকা/কেজি" },
  { icon: "🍗", name: "মাংস", price: "৭৫০ টাকা/কেজি" },
  { icon: "🥚", name: "ডিম", price: "৫৫ টাকা/ডজন" },
  { icon: "🌶️", name: "মসলা", price: "বাজারদর দেখুন" },
];

const marketUpdates = [
  { name: "সর্বনিম্ন চাল", price: "৪৮ টাকা/কেজি", change: "১.২%" },
  { name: "মিনিকেট চাল", price: "৯৯ টাকা/কেজি", change: "২.৯%" },
  { name: "বাসমতি চাল", price: "১৬৮ টাকা/কেজি", change: "৩.৬%" },
  { name: "সরু চাল", price: "৮৯ টাকা/কেজি", change: "০.৮%" },
  { name: "আমন চাল", price: "৭৯ টাকা/কেজি", change: "১.৫%" },
];

function UserMenu() {
  return (
    <details className="account-menu" open>
      <summary className="account-trigger" aria-label="ব্যবহারকারীর মেনু">
        <span className="account-avatar" aria-hidden="true">👨🏽‍💼</span>
        <span>Rezwan</span>
        <span className="account-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div className="account-dropdown">
        <strong>Rezwan Ahmed</strong>
        <span className="account-email">rezwanahmed@gmail.com</span>
        <a href="#profile"><span aria-hidden="true">👤</span> আমার প্রোফাইল</a>
        <a className="sign-out" href="#sign-out"><span aria-hidden="true">↪</span> সাইন আউট</a>
      </div>
    </details>
  );
}

function PriceCard({ product }) {
  const { dir, pct } = product.change;
  const changeLabel = dir === "flat"
    ? "— ০.০%"
    : `${dir === "up" ? "▲" : "▼"} ${formatBengaliNumber(Math.abs(pct), {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}%`;

  return (
    <Link
      className="price-card"
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn}, ${formatBengaliNumber(product.today)} টাকা`}
    >
      <div className="product-info">
        <span className="product-icon" aria-hidden="true">{product.image}</span>
        <div>
          <h3>{product.nameBn}</h3>
          <span className="product-unit">{getProductUnit(product.unit)}</span>
        </div>
      </div>
      <span className="card-caption">আজকের দাম</span>
      <div className="price-row">
        <strong>{formatBengaliNumber(product.today)} টাকা</strong>
        <span className={`price-change change-${dir}`}>{changeLabel}</span>
      </div>
    </Link>
  );
}

async function HomeProductSections() {
  const products = await getProducts();
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <>
      <section className="prices-section" aria-labelledby="risers-title">
        <h2 id="risers-title"><span className="section-arrow" aria-hidden="true">▲</span> আজ দাম বেড়েছে</h2>
        <div className="price-grid">
          {risers.map((product) => <PriceCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="prices-section falling-section" aria-labelledby="fallers-title">
        <h2 id="fallers-title"><span className="section-arrow" aria-hidden="true">▼</span> আজ দাম কমেছে</h2>
        <div className="price-grid">
          {fallers.map((product) => <PriceCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="prices-section all-products-section" id="সব-পণ্য" aria-labelledby="all-products-title">
        <h2 id="all-products-title">সব পণ্য</h2>
        <p className="section-subtitle">আজকের বাজারদর ও দামের পরিবর্তন দেখুন</p>
        <div className="price-grid">
          {products.map((product) => <PriceCard key={product.id} product={product} />)}
        </div>
      </section>
    </>
  );
}

function ProductSectionsSkeleton() {
  return (
    <div className="product-sections-skeleton" aria-busy="true" aria-label="পণ্যের তথ্য লোড হচ্ছে">
      {["আজ দাম বেড়েছে", "আজ দাম কমেছে", "সব পণ্য"].map((title) => (
        <section className="prices-section" key={title}>
          <h2>{title}</h2>
          <div className="price-grid">
            {Array.from({ length: 6 }, (_, index) => (
              <div className="price-card skeleton-card" key={index}>
                <span className="skeleton-line skeleton-title" />
                <span className="skeleton-line skeleton-price" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="topbar">
          <a className="brand" href="#" aria-label="বাজার দর হোম">
            <span className="brand-mark" aria-hidden="true">🛒</span>
            <span className="brand-copy">
              <strong>বাজার দর</strong>
              <small>সর্বশেষ, ১১ অক্টোবর, ২০২৬</small>
            </span>
          </a>
          <UserMenu />
        </div>
        <nav className="category-nav" aria-label="পণ্যের বিভাগ">
          <div className="nav-inner">
            {categories.map((category) => (
              <a href="#সব-পণ্য" key={category.name}>
                <span aria-hidden="true">{category.icon}</span>
                {category.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <div className="market-ticker" aria-label="আজকের বাজারদর">
        <div className="ticker-track">
          {marketUpdates.map((update) => (
            <div className="ticker-item" key={update.name}>
              <span className="ticker-icon" aria-hidden="true">🔖</span>
              <span>{update.name} {update.price}</span>
              <span className="price-up">▲ {update.change}</span>
            </div>
          ))}
        </div>
      </div>

      <main className="page-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="date-badge">সোমবার, ৫ অক্টোবর, ২০২৬</span>
            <h1 id="hero-title">আজকের বাজারের সব এক জায়গায়</h1>
            <p>
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, ট্রেন্ড, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a className="hero-button" href="#সব-পণ্য">সব পণ্য দেখুন</a>
          </div>
          <Image
            className="hero-image"
            src={marketBasket}
            alt="তাজা সবজি ও পণ্যে ভরা বাজারের ঝুড়ি"
            priority
          />
        </section>

        <Suspense fallback={<ProductSectionsSkeleton />}>
          <HomeProductSections />
        </Suspense>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <span>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
          <span>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</span>
        </div>
      </footer>
    </>
  );
}
