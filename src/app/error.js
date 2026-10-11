"use client";

export default function GlobalError({ reset }) {
  return (
    <main className="not-found-page" role="alert">
      <span aria-hidden="true">⚠️</span>
      <h1>তথ্য দেখানো যাচ্ছে না</h1>
      <p>পণ্যের তথ্য আনতে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।</p>
      <button className="auth-submit error-retry-button" onClick={reset} type="button">
        আবার চেষ্টা করুন
      </button>
    </main>
  );
}
