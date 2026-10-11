"use client";

import Link from "next/link";
import { authClient } from "../lib/auth-client";
import SignOutButton from "./SignOutButton";

export default function AuthNavigation() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="auth-nav-placeholder" aria-label="অ্যাকাউন্ট লোড হচ্ছে" />;
  }

  if (!session) {
    return (
      <nav className="auth-nav" aria-label="অ্যাকাউন্ট">
        <Link className="auth-nav-signin" href="/signin">সাইন ইন</Link>
        <Link className="auth-nav-signup" href="/signup">সাইন আপ</Link>
      </nav>
    );
  }

  const userName = session.user.name || session.user.email;
  const initial = userName.trim().charAt(0).toLocaleUpperCase("bn-BD");

  return (
    <details className="account-menu">
      <summary className="account-trigger" aria-label="ব্যবহারকারীর মেনু">
        <span className="account-avatar" aria-hidden="true">{initial}</span>
        <span className="account-name">{userName}</span>
        <span className="account-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div className="account-dropdown">
        <strong>{session.user.name || "ব্যবহারকারী"}</strong>
        <span className="account-email">{session.user.email}</span>
        <Link href="/profile"><span aria-hidden="true">👤</span> আমার প্রোফাইল</Link>
        <SignOutButton />
      </div>
    </details>
  );
}
