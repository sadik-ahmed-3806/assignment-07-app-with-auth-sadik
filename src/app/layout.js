import "./globals.css";

export const metadata = {
  title: "বাজার দর | আজকের বাজারের সব এক জায়গায়",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর এক জায়গায় দেখুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
