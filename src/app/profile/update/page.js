import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import { auth } from "../../../lib/auth";
import UpdateProfileForm from "./UpdateProfileForm";

async function UpdateProfileContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/signin?next=%2Fprofile%2Fupdate");
  }

  return (
    <>
      <SiteHeader />
      <main className="profile-page profile-edit-page">
        <div className="profile-page-heading">
          <h1>তথ্য আপডেট করুন</h1>
          <p>আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করুন।</p>
        </div>
        <UpdateProfileForm currentName={session.user.name || ""} />
        <Link className="auth-back-link" href="/profile">← প্রোফাইলে ফিরে যান</Link>
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

function UpdateProfileSkeleton() {
  return (
    <>
      <SiteHeader />
      <main className="profile-page" aria-busy="true" aria-label="তথ্য লোড হচ্ছে">
        <div className="skeleton-line skeleton-profile-heading" />
        <div className="skeleton-line skeleton-profile-panel" />
      </main>
    </>
  );
}

export default function UpdateProfilePage() {
  return (
    <Suspense fallback={<UpdateProfileSkeleton />}>
      <UpdateProfileContent />
    </Suspense>
  );
}
