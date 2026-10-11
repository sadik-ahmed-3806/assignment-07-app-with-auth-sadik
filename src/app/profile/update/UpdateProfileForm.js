"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";

export default function UpdateProfileForm({ currentName }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();

    if (!name) {
      const message = "আপনার নাম লিখুন";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const result = await authClient.updateUser({ name });
      if (result.error) {
        setErrorMessage(result.error.message || "তথ্য আপডেট করা যায়নি");
        toast.error(result.error.message || "তথ্য আপডেট করা যায়নি");
        return;
      }
      toast.success("প্রোফাইলের তথ্য আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      const message = "সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="profile-details">
      <h2>তথ্য</h2>
      <form className="auth-form profile-update-form" onSubmit={handleSubmit}>
        <label className="auth-field">
          <span>নাম</span>
          <input autoComplete="name" defaultValue={currentName} maxLength={100} name="name" required />
        </label>
        {errorMessage && <p className="auth-form-error" role="alert">{errorMessage}</p>}
        <button className="auth-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "অপেক্ষা করুন..." : "আপডেট"}
        </button>
      </form>
    </section>
  );
}
