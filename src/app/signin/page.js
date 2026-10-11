import { Suspense } from "react";
import Link from "next/link";
import AuthForm from "../../components/AuthForm";
import SiteHeader from "../../components/SiteHeader";
import { getSocialProviderAvailability } from "../../lib/auth-providers";

function getSafeCallbackURL(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/";
  }
  return value;
}

async function SignInContent({ searchParams }) {
  const query = await searchParams;
  const callbackURL = getSafeCallbackURL(query.next);
  const availability = getSocialProviderAvailability();

  return (
    <>
      <SiteHeader />
      <main className="auth-page">
        <div className="auth-page-heading">
          <h1>সাইন ইন</h1>
          <p>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
        </div>
        <AuthForm availability={availability} callbackURL={callbackURL} mode="signin" />
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

export default function SignInPage(props) {
  return (
    <Suspense fallback={<main className="auth-page"><p>লোড হচ্ছে...</p></main>}>
      <SignInContent searchParams={props.searchParams} />
    </Suspense>
  );
}
