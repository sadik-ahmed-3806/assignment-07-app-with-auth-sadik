"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

export default function SignOutButton({ className = "sign-out" }) {
  const router = useRouter();

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();
      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি");
        return;
      }
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  return (
    <button className={className} onClick={handleSignOut} type="button">
      <span aria-hidden="true">↪</span> সাইন আউট
    </button>
  );
}
