const PRODUCTS_API_URL = "https://openapi.programming-hero.com/api/bazardor/products";
const CATEGORIES_API_URL = "https://openapi.programming-hero.com/api/bazardor/categories";
const PRODUCT_UNITS = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

function isProduct(product) {
  return (
    product !== null &&
    typeof product === "object" &&
    typeof product.id === "number" &&
    typeof product.slug === "string" &&
    typeof product.nameBn === "string" &&
    typeof product.categoryNameBn === "string" &&
    typeof product.image === "string" &&
    typeof product.unit === "string" &&
    typeof product.today === "number" &&
    product.change !== null &&
    typeof product.change === "object" &&
    ["up", "down", "flat"].includes(product.change.dir) &&
    typeof product.change.pct === "number"
  );
}

export async function getProducts(category) {
  const url = new URL(PRODUCTS_API_URL);
  if (category) {
    url.searchParams.set("category", category);
  }
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`পণ্যের তথ্য আনতে ব্যর্থ হয়েছে (HTTP ${response.status})`);
  }

  const products = await response.json();
  if (!Array.isArray(products) || !products.every(isProduct)) {
    throw new Error("পণ্যের API থেকে পাওয়া তথ্য সঠিক ফরম্যাটে নেই");
  }

  return products;
}

export async function getCategories() {
  const response = await fetch(CATEGORIES_API_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`বিভাগের তথ্য আনতে ব্যর্থ হয়েছে (HTTP ${response.status})`);
  }

  const categories = await response.json();
  if (
    !Array.isArray(categories) ||
    !categories.every((category) =>
      category !== null &&
      typeof category === "object" &&
      typeof category.slug === "string" &&
      typeof category.nameBn === "string" &&
      typeof category.icon === "string"
    )
  ) {
    throw new Error("বিভাগের API থেকে পাওয়া তথ্য সঠিক ফরম্যাটে নেই");
  }

  return categories;
}

export function formatBengaliNumber(value, options = {}) {
  return new Intl.NumberFormat("bn-BD", options).format(value);
}

export function getProductUnit(unit) {
  const label = PRODUCT_UNITS[unit];
  if (!label) {
    throw new Error(`অজানা পণ্যের একক: ${unit}`);
  }
  return label;
}
