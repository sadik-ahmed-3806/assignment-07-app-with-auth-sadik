import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import { auth } from "../../../lib/auth";
import { formatBengaliNumber, getProductBySlug, getProductUnit } from "../../../lib/products";

async function ProductDetailsContent({ params }) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const minimum = Math.min(...product.markets.map((market) => market.min));
  const maximum = Math.max(...product.markets.map((market) => market.max));
  const average = product.markets.reduce(
    (total, market) => total + (market.min + market.max) / 2,
    0
  ) / product.markets.length;
  const { dir, pct } = product.change;
  const priceChange = dir === "flat"
    ? "— ০.০%"
    : `${dir === "up" ? "▲" : "▼"} ${formatBengaliNumber(Math.abs(pct), {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}%`;

  return (
    <>
      <SiteHeader activeCategory={product.category} />
      <main className="page-content product-details-page">
        <nav className="breadcrumbs" aria-label="breadcrumb">
          <Link href="/">হোম</Link>
          <span aria-hidden="true">›</span>
          <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{product.nameBn}</span>
        </nav>

        <section className="product-detail-summary">
          <span className="product-detail-icon" aria-hidden="true">{product.image}</span>
          <div className="product-detail-copy">
            <h1>{product.nameBn}</h1>
            <p>{product.categoryNameBn} বিভাগের {getProductUnit(product.unit)} আজকের বাজারদর</p>
            <div className="product-tags">
              <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link>
              <span>{getProductUnit(product.unit)}</span>
            </div>
          </div>
          <div className="product-current-price">
            <span>আজকের বাজারদর</span>
            <strong>{formatBengaliNumber(product.today)}</strong>
            <small>টাকা / {product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit === "dozen" ? "ডজন" : "পিস"}</small>
            <span className={`price-change change-${dir}`}>{priceChange}</span>
          </div>
        </section>

        <section className="market-details-panel" aria-labelledby="price-summary-title">
          <h2 id="price-summary-title">দামের সারসংক্ষেপ</h2>
          <div className="market-summary-grid">
            <article>
              <span>সর্বনিম্ন দাম</span>
              <strong className="summary-min">{formatBengaliNumber(minimum)} টাকা</strong>
              <small>বাজারভিত্তিক সর্বনিম্ন দর</small>
            </article>
            <article>
              <span>সর্বোচ্চ দাম</span>
              <strong className="summary-max">{formatBengaliNumber(maximum)} টাকা</strong>
              <small>বাজারভিত্তিক সর্বোচ্চ দর</small>
            </article>
            <article>
              <span>গড় দাম</span>
              <strong className="summary-average">{formatBengaliNumber(Math.round(average))} টাকা</strong>
              <small>বাজারদরের গড় হিসাব</small>
            </article>
          </div>

          <h2 className="market-table-title">বাজারভিত্তিক আজকের দাম</h2>
          <div className="market-table-scroll">
            <table className="market-table">
              <thead>
                <tr>
                  <th scope="col">বাজার</th>
                  <th scope="col">বিভাগ</th>
                  <th scope="col">সর্বনিম্ন</th>
                  <th scope="col">সর্বোচ্চ</th>
                  <th scope="col">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market) => (
                  <tr key={`${market.market}-${market.division}`}>
                    <td>{market.market}</td>
                    <td>{market.division}</td>
                    <td>{formatBengaliNumber(market.min)} টাকা</td>
                    <td>{formatBengaliNumber(market.max)} টাকা</td>
                    <td>{formatBengaliNumber(Math.round((market.min + market.max) / 2))} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
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

function ProductDetailsSkeleton() {
  return (
    <>
      <SiteHeader />
      <main className="page-content product-details-page" aria-busy="true" aria-label="পণ্যের তথ্য লোড হচ্ছে">
        <div className="skeleton-line skeleton-product-heading" />
        <div className="skeleton-line skeleton-product-panel" />
        <div className="skeleton-line skeleton-product-panel" />
      </main>
    </>
  );
}

export default function ProductDetailsPage({ params }) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}
