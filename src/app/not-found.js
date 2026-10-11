import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <span aria-hidden="true">🧺</span>
      <p className="not-found-code">৪০৪</p>
      <h1>এই বিভাগটি খুঁজে পাওয়া যায়নি</h1>
      <p>ঠিকানা পরিবর্তিত হয়েছে অথবা এই বিভাগটি আর নেই।</p>
      <Link className="hero-button" href="/">হোম পেজে ফিরে যান</Link>
    </main>
  );
}
