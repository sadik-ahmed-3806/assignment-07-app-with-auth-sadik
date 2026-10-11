import Link from "next/link";
import AuthNavigation from "./AuthNavigation";

const categories = [
  { slug: "chal", icon: "🍚", name: "চাল" },
  { slug: "dal", icon: "🫘", name: "ডাল" },
  { slug: "tel", icon: "🛢️", name: "তেল" },
  { slug: "sobji", icon: "🥬", name: "সবজি" },
  { slug: "mach", icon: "🐟", name: "মাছ" },
  { slug: "mangsho", icon: "🍗", name: "মাংস" },
  { slug: "dim-dui", icon: "🥛", name: "ডিম-দুধ" },
  { slug: "mosla", icon: "🌶️", name: "মসলা" },
];

const marketUpdates = [
  { icon: "🍚", name: "স্বর্ণমাছি চাল", price: "১৪৮ টাকা/কেজি", direction: "up", change: "২.১%" },
  { icon: "🍚", name: "মিনিকেট চাল", price: "৯৯ টাকা/কেজি", direction: "down", change: "২.৯%" },
  { icon: "🍚", name: "বাটাম সাইজ চাল", price: "৬৬ টাকা/কেজি", direction: "up", change: "০.৬%" },
  { icon: "🫘", name: "মসুর ডাল", price: "১৪২ টাকা/কেজি", direction: "up", change: "২.৯%" },
  { icon: "🫘", name: "ছোলা", price: "১২০ টাকা/কেজি", direction: "down", change: "১.৮%" },
  { icon: "🫘", name: "আমন ডাল", price: "১৫৬ টাকা/কেজি", direction: "down", change: "২.৫%" },
];

export default function SiteHeader({ activeCategory }) {
  return (
    <>
      <header className="site-header">
        <div className="topbar">
          <Link className="brand" href="/" aria-label="বাজার দর হোম">
            <span className="brand-mark" aria-hidden="true">🛒</span>
            <span className="brand-copy">
              <strong>বাজার দর</strong>
              <small>সর্বশেষ, ১১ অক্টোবর, ২০২৬</small>
            </span>
          </Link>
          <AuthNavigation />
        </div>
        <nav className="category-nav" aria-label="পণ্যের বিভাগ">
          <div className="nav-inner">
            {categories.map((category) => (
              <Link
                className={activeCategory === category.slug ? "active" : ""}
                href={`/category/${category.slug}`}
                key={category.slug}
                aria-current={activeCategory === category.slug ? "page" : undefined}
              >
                <span aria-hidden="true">{category.icon}</span>
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <div className="market-ticker" aria-label="আজকের বাজারদর">
        <div className="ticker-track">
          {marketUpdates.map((update) => (
            <div className="ticker-item" key={update.name}>
              <span className="ticker-icon" aria-hidden="true">{update.icon}</span>
              <span>{update.name} {update.price}</span>
              <span className={`price-${update.direction}`}>
                {update.direction === "up" ? "▲" : "▼"} {update.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
