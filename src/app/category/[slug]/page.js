import { Suspense } from "react";
import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import { formatBengaliNumber, getCategories, getProducts } from "../../../lib/products";
import CategoryProducts from "./CategoryProducts";

async function CategoryContent({ params }) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <SiteHeader activeCategory={category.slug} />
      <main className="page-content category-content">
        <section className="category-heading" aria-labelledby="category-title">
          <span className="category-heading-icon" aria-hidden="true">{category.icon}</span>
          <div>
            <h1 id="category-title">{category.nameBn}</h1>
            <p>{formatBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </section>
        <CategoryProducts products={products} />
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

function CategorySkeleton() {
  return (
    <>
      <SiteHeader />
      <main className="page-content category-content" aria-busy="true" aria-label="বিভাগের পণ্য লোড হচ্ছে">
        <div className="category-heading skeleton-category-heading">
          <span className="skeleton-line skeleton-category-icon" />
          <div>
            <span className="skeleton-line skeleton-category-title" />
            <span className="skeleton-line skeleton-category-subtitle" />
          </div>
        </div>
        <div className="category-toolbar skeleton-toolbar" />
        <p className="category-result-count">পণ্যের তথ্য লোড হচ্ছে...</p>
        <div className="price-grid category-product-grid">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="price-card skeleton-card" key={index}>
              <span className="skeleton-line skeleton-title" />
              <span className="skeleton-line skeleton-price" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default async function CategoryPage({ params }) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
