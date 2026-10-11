import Image from "next/image";
import marketBasket from "../../assets/bazar-hero.png";

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

const popularPrices = [
  { icon: "🥔", name: "আলু", unit: "প্রতি কেজি", price: "৪৮", change: "১.২%" },
  { icon: "🧅", name: "পেঁয়াজ", unit: "প্রতি কেজি", price: "৮৫", change: "২.০%" },
  { icon: "🍆", name: "বেগুন", unit: "প্রতি কেজি", price: "৮৮", change: "৪.৮%" },
  { icon: "🐟", name: "রুই মাছ", unit: "প্রতি কেজি", price: "৩৬০", change: "৪.৫%" },
  { icon: "🥚", name: "ডিম", unit: "প্রতি ডজন", price: "১৫৮", change: "১.৯%" },
  { icon: "🧈", name: "সয়াবিন (৫০০ গ্রাম)", unit: "প্রতি পিস", price: "১০৮", change: "০.৬%" },
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
              <a href="#popular-prices" key={category.name}>
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
            <a className="hero-button" href="#popular-prices">সব পণ্য দেখুন</a>
          </div>
          <Image
            className="hero-image"
            src={marketBasket}
            alt="তাজা সবজি ও পণ্যে ভরা বাজারের ঝুড়ি"
            priority
          />
        </section>

        <section className="prices-section" id="popular-prices" aria-labelledby="popular-title">
          <h2 id="popular-title"><span aria-hidden="true">🔺</span> আজ দাম বেড়েছে</h2>
          <div className="price-grid">
            {popularPrices.map((item) => (
              <article className="price-card" key={item.name}>
                <div className="product-info">
                  <span className="product-icon" aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{item.name}</h3>
                    <span className="product-unit">{item.unit}</span>
                  </div>
                </div>
                <span className="card-caption">আজকের দাম</span>
                <div className="price-row">
                  <strong>{item.price} টাকা</strong>
                  <span className="price-change">▲ {item.change}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="prices-section falling-section" aria-labelledby="falling-title">
          <h2 id="falling-title"><span aria-hidden="true">▼</span> আজ দাম কমেছে</h2>
        </section>
      </main>
    </>
  );
}
