"use client";

import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          border: "1px solid #e1e9e3",
          borderRadius: "10px",
          background: "#fbfdfb",
          color: "#25312b",
          fontFamily: '"Noto Sans Bengali", "Hind Siliguri", "Nirmala UI", Arial, sans-serif',
          fontSize: "13px",
        },
      }}
    />
  );
}
