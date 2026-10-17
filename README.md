# বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, বাজারভিত্তিক মূল্য এবং দামের ওঠানামা এক জায়গায় দেখার জন্য তৈরি একটি Next.js অ্যাপ।

এই অ্যাপটি পণ্য, বিভাগ ও বাজার-ভিত্তিক মূল্য তথ্যকে সহজে খুঁজে বের করতে সাহায্য করে। বাংলা ভাষায় ডিজাইন করা হয়েছে, যাতে ব্যবহারকারীরা দ্রুত মূল্য তুলনা করতে পারে।

## পোর্টফোলিও ও বৈশিষ্ট্য

- বাজারভিত্তিক পণ্যের তালিকা দেখানো
- পণ্যের বর্তমান দাম, ওঠানামা ও সংক্ষিপ্ত তুলনা
- বিভাগ অনুযায়ী পণ্য অনুসন্ধান ও ফিল্টার
- পণ্যের বিস্তারিত স্ট্যাটাস ও বাজারের সর্বনিম্ন/সর্বোচ্চ/গড় মূল্য
- রেসপন্সিভ ডিজাইন: mobile, tablet ও desktop
- সাশ্রয়ী UI, লোডিং স্টেট, 404 রিসোর্স ফেলা
- ব্যবহারকারী অ্যাকাউন্ট ও ব্যক্তিগত প্রোফাইল সাপোর্ট
- বাংলা toast নোটিফিকেশন ও সুন্দর UX

## প্রযুক্তি

- Next.js App Router
- React
- JavaScript
- Tailwind CSS
- Better Auth
- MongoDB
- Programming Hero Bazar Dor API
- React Hot Toast

## দ্রুত শুরু

প্রজেক্টটি রান করার জন্য প্রয়োজনীয় package install করুন:

```bash
npm install
```

### Authentication কনফিগারেশন

Better Auth-এর session MongoDB-তে সংরক্ষিত হয়। `.env.example` কপি করে `.env` তৈরি করুন, তারপর আপনার নিজের values বসান:

```bash
cp .env.example .env
```

PowerShell-এ:

```powershell
Copy-Item .env.example .env
```

`.env`-এ `BETTER_AUTH_SECRET`, MongoDB connection string (`BETTER_AUTH_DB_URL`) এবং database name (`BETTER_AUTH_DB_NAME`) সেট করুন। `BETTER_AUTH_SECRET`-এর জন্য অন্তত ৩২ অক্ষরের একটি নিরাপদ random value ব্যবহার করুন। OAuth credentials-ও একই `.env` ফাইলে দিন—source code-এ secret রাখবেন না। `.env` Git-এ ignored থাকে।

Google sign-in চালু করতে Google OAuth client তৈরি করে `GOOGLE_CLIENT_ID` ও `GOOGLE_CLIENT_SECRET` দিন। Google-এর authorized redirect URI হবে:

```text
http://localhost:3000/api/auth/callback/google
```

GitHub sign-in চালু করতে GitHub OAuth App তৈরি করে `GITHUB_CLIENT_ID` ও `GITHUB_CLIENT_SECRET` দিন। GitHub-এর authorization callback URL হবে:

```text
http://localhost:3000/api/auth/callback/github
```

Production deploy-এ `BETTER_AUTH_URL` এবং provider callback URL-গুলো আপনার deployed site-এর origin দিয়ে সেট করুন। Provider-এর client ID ও secret—দুটিই দিতে হবে; credentials না থাকলে সংশ্লিষ্ট social sign-in button নিষ্ক্রিয় থাকবে। `.env` পরিবর্তনের পর dev server আবার চালু করুন।

তারপর ডেভেলপমেন্ট সার্ভার চালু করুন:

```bash
npm run dev
```

শেষে ব্রাউজারে এই URL খুলুন:

```text
http://localhost:3000
```

সেটআপ যাচাই করতে `/signup` থেকে email/password দিয়ে account তৈরি করুন, তারপর `/signin` থেকে sign in করে `/profile` দেখুন এবং sign out করুন। OAuth credentials যোগ করার পর `/signin` ও `/signup`-এ Google এবং GitHub button সক্রিয় হবে; provider callback সফল হলে configured callback page-এ ফিরে আসবে।

## প্রজেক্ট স্ক্রিপ্ট

```bash
npm run dev
npm run build
npm run lint
```

## ডিরেক্টরি ও ফাইল কাঠামো

```text
.
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── models/
│   └── utils/
├── public/
├── package.json
├── eslint.config.mjs
├── next.config.mjs
├── jsconfig.json
├── README.md
└── .gitignore
```

## অ্যাপের উদ্দেশ্য

এই অ্যাপটি বাজারের পণ্য মূল্য দ্রুত ও সহজভাবে পর্যবেক্ষণ করার জন্য তৈরি। ব্যবহারকারীরা প্রতিদিনের দামের ওঠানামা, দরের পার্থক্য, ও পণ্যের বর্ণনা দেখতে পারে। এতে বাংলা ভাষার ব্যবহার নিশ্চিত করা হয়েছে, যাতে স্থানীয় বাজারের প্রেক্ষাপটে ব্যবহার সহজ হয়।

## অবদান

এই প্রজেক্টে অবদান রাখতে চাইলে, প্রথমে repository fork করুন, আপনার branch তৈরি করুন, পরিবর্তন দিন, তারপর pull request পাঠান।

## লাইসেন্স

এই প্রজেক্টের লাইসেন্স সংক্রান্ত তথ্য project configuration-এ উল্লেখ থাকতে পারে। ব্যবহার করার আগে প্রয়োজন অনুযায়ী লাইসেন্স যাচাই করুন।
