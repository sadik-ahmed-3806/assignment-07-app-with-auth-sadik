"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

function SocialButtons({ availability, callbackURL }) {
  async function signInWith(provider) {
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL,
      });
      if (result.error) {
        toast.error(result.error.message || `${provider} দিয়ে সাইন ইন করা যায়নি`);
      }
    } catch {
      toast.error("সামাজিক মাধ্যমে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  return (
    <>
      <div className="auth-divider"><span>অথবা</span></div>
      <div className="social-auth-buttons">
        <button
          className="social-auth-button"
          disabled={!availability.google}
          onClick={() => signInWith("google")}
          type="button"
        >
          <span className="google-mark" aria-hidden="true">G</span>
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          className="social-auth-button"
          disabled={!availability.github}
          onClick={() => signInWith("github")}
          type="button"
        >
          <span aria-hidden="true">◉</span>
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
      {(!availability.google || !availability.github) && (
        <p className="provider-setup-note">
          {!availability.google && !availability.github
            ? "Google ও GitHub চালু করতে OAuth credentials যোগ করুন।"
            : `OAuth credentials না থাকায় ${!availability.google ? "Google" : "GitHub"} সাইন ইন সাময়িকভাবে বন্ধ আছে।`}
        </p>
      )}
    </>
  );
}

export default function AuthForm({ mode, availability, callbackURL = "/" }) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (isSignup && password !== confirmPassword) {
      const message = "পাসওয়ার্ড দুটি মিলছে না";
      setFormError(message);
      toast.error(message);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = isSignup
        ? await authClient.signUp.email({
          name: String(formData.get("name") || "").trim(),
          email,
          password,
        })
        : await authClient.signIn.email({
          email,
          password,
          callbackURL,
        });

      if (result.error) {
        const message = result.error.message || "অনুরোধটি সম্পন্ন করা যায়নি";
        setFormError(message);
        toast.error(message);
        return;
      }

      if (isSignup) {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
        router.push("/signin");
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে");
        router.push(callbackURL);
      }
    } catch {
      const message = "সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={`auth-panel ${isSignup ? "signup-panel" : ""}`}>
      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignup && (
          <label className="auth-field">
            <span>নাম</span>
            <input
              autoComplete="name"
              maxLength={100}
              name="name"
              placeholder="যেমন: রহিম উদ্দিন"
              required
            />
          </label>
        )}
        <label className="auth-field">
          <span>ইমেইল</span>
          <input
            autoComplete="email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>
        <label className="auth-field">
          <span>পাসওয়ার্ড</span>
          <input
            autoComplete={isSignup ? "new-password" : "current-password"}
            minLength={8}
            name="password"
            placeholder={isSignup ? "কমপক্ষে ৮ অক্ষর" : "আপনার পাসওয়ার্ড"}
            required
            type="password"
          />
        </label>
        {isSignup && (
          <label className="auth-field">
            <span>পাসওয়ার্ড নিশ্চিত করুন</span>
            <input
              autoComplete="new-password"
              minLength={8}
              name="confirmPassword"
              placeholder="আবার লিখুন"
              required
              type="password"
            />
          </label>
        )}
        {formError && <p className="auth-form-error" role="alert">{formError}</p>}
        <button className="auth-submit" disabled={isSubmitting} type="submit">
          {isSubmitting
            ? "অপেক্ষা করুন..."
            : isSignup
              ? "অ্যাকাউন্ট তৈরি করুন"
              : "সাইন ইন"}
        </button>
      </form>
      <SocialButtons availability={availability} callbackURL={callbackURL} />
      <p className="auth-switch">
        {isSignup ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
        <Link href={isSignup ? "/signin" : "/signup"}>
          {isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
        </Link>
      </p>
    </section>
  );
}
