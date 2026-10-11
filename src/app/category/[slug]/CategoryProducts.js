"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "../../../components/ProductCard";
import { formatBengaliNumber } from "../../../lib/products";

export default function CategoryProducts({ products }) {
  const [sortOrder, setSortOrder] = useState("default");
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sortOrder === "price-ascending") {
      sorted.sort((a, b) => a.today - b.today);
    } else if (sortOrder === "price-descending") {
      sorted.sort((a, b) => b.today - a.today);
    }
    return sorted;
  }, [products, sortOrder]);

  if (products.length === 0) {
    return (
      <section className="category-empty">
        <span aria-hidden="true">🧺</span>
        <h2>এই বিভাগে কোনো পণ্য পাওয়া যায়নি</h2>
        <Link className="hero-button" href="/">হোম পেজে ফিরে যান</Link>
      </section>
    );
  }

  return (
    <>
      <div className="category-toolbar">
        <label htmlFor="category-sort">সাজান</label>
        <select
          id="category-sort"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-ascending">দাম: কম থেকে বেশি</option>
          <option value="price-descending">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <p className="category-result-count">মোট {formatBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে</p>
      <div className="price-grid category-product-grid">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
