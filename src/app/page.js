import Image from "next/image";
import { Suspense } from "react";
import marketBasket from "../../assets/bazar-hero.png";
import ProductCard from "../components/ProductCard";
import SiteHeader from "../components/SiteHeader";
import { getProducts } from "../lib/products";

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
          {risers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="prices-section falling-section" aria-labelledby="fallers-title">
        <h2 id="fallers-title"><span className="section-arrow" aria-hidden="true">▼</span> আজ দাম কমেছে</h2>
        <div className="price-grid">
          {fallers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="prices-section all-products-section" id="সব-পণ্য" aria-labelledby="all-products-title">
        <h2 id="all-products-title">সব পণ্য</h2>
        <p className="section-subtitle">আজকের বাজারদর ও দামের পরিবর্তন দেখুন</p>
        <div className="price-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
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
      <SiteHeader />
      <main className="page-content home-content">
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
