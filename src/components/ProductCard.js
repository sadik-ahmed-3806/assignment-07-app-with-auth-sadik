import Link from "next/link";
import { formatBengaliNumber, getProductUnit } from "../lib/products";

export default function ProductCard({ product }) {
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
