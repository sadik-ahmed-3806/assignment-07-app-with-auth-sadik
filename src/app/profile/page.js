import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import { auth } from "../../lib/auth";

async function ProfileContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/signin?next=%2Fprofile");
  }

  return (
    <>
      <SiteHeader />
      <main className="profile-page">
        <div className="profile-page-heading">
          <h1>আমার প্রোফাইল</h1>
          <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>
        <section className="profile-summary">
          <span className="profile-avatar" aria-hidden="true">
            {session.user.name?.trim().charAt(0).toLocaleUpperCase("bn-BD") || "👤"}
          </span>
          <div className="profile-identity">
            <h2>{session.user.name || "ব্যবহারকারী"}</h2>
            <p>{session.user.email}</p>
          </div>
          <Link className="profile-action-link" href="/profile/update">তথ্য আপডেট</Link>
        </section>
        <section className="profile-details">
          <h2>তথ্য</h2>
          <dl>
            <div>
              <dt>নাম</dt>
              <dd>{session.user.name || "নাম যোগ করা হয়নি"}</dd>
            </div>
            <div>
              <dt>ইমেইল</dt>
              <dd>{session.user.email}</dd>
            </div>
          </dl>
          <Link className="auth-submit profile-update-button" href="/profile/update">
            তথ্য আপডেট করুন
          </Link>
        </section>
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

function ProfileSkeleton() {
  return (
    <>
      <SiteHeader />
      <main className="profile-page" aria-busy="true" aria-label="প্রোফাইল লোড হচ্ছে">
        <div className="skeleton-line skeleton-profile-heading" />
        <div className="skeleton-line skeleton-profile-panel" />
        <div className="skeleton-line skeleton-profile-panel" />
      </main>
    </>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
