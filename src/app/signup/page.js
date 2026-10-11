import Link from "next/link";
import AuthForm from "../../components/AuthForm";
import SiteHeader from "../../components/SiteHeader";
import { getSocialProviderAvailability } from "../../lib/auth-providers";

export default function SignUpPage() {
  return (
    <>
      <SiteHeader />
      <main className="auth-page">
        <div className="auth-page-heading">
          <h1>অ্যাকাউন্ট তৈরি করুন</h1>
          <p>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
        </div>
        <AuthForm availability={getSocialProviderAvailability()} mode="signup" />
        <Link className="auth-back-link" href="/">← হোম পেজে ফিরে যান</Link>
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
