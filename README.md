# বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, বাজারভিত্তিক দর এবং দামের ওঠানামা এক জায়গায় দেখুন। বাংলা ভাষায় তৈরি এই অ্যাপ Programming Hero Bazar Dor API ব্যবহার করে পণ্য ও বিভাগের তথ্য দেখায়।

## প্রযুক্তি

- Next.js App Router
- React
- JavaScript
- Tailwind CSS 4 ও custom CSS
- Better Auth
- MongoDB
- Programming Hero Bazar Dor API
- React Hot Toast

## সুবিধাসমূহ

1. সর্বোচ্চ দাম-বৃদ্ধি ও দাম-হ্রাস অনুযায়ী সাজানো পণ্যের তালিকা।
2. বাংলা সংখ্যা, দাম ও পরিবর্তনের ব্যাজসহ সব পণ্যের responsive grid।
3. বিভাগভিত্তিক পণ্য দেখা এবং দামের ঊর্ধ্বক্রম/নিম্নক্রমে সাজানো।
4. সুরক্ষিত পণ্যের বিস্তারিত পৃষ্ঠা এবং বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ ও গড় দরের সারসংক্ষেপ।
5. ইমেইল ও পাসওয়ার্ড দিয়ে নিবন্ধন এবং সাইন ইন।
6. Google ও GitHub OAuth সাইন ইন—provider credentials যোগ করলে চালু হবে।
7. সুরক্ষিত প্রোফাইল দেখা, নাম পরিবর্তন, সাইন আউট এবং বাংলা toast বার্তা।
8. loading skeleton, অনুপস্থিত পণ্যের জন্য 404 পৃষ্ঠা, এবং mobile/tablet/desktop responsive layout।

## স্থানীয়ভাবে চালানো

1. Node.js ইনস্টল করে dependency স্থাপন করুন:

   ```bash
   npm install
   ```

2. `.env.example` অনুলিপি করে `.env` তৈরি করুন এবং MongoDB Atlas connection তথ্যসহ প্রয়োজনীয় মান বসান:

   ```dotenv
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=<কমপক্ষে-৩২-অক্ষরের-এলোমেলো-secret>
   BETTER_AUTH_DB_URL=<MongoDB-connection-string>
   BETTER_AUTH_DB_NAME=bazardor
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   ```

   `.env` ফাইলটি Git-এ উপেক্ষিত। Secret বা database credential commit করবেন না।

3. উন্নয়ন সার্ভার চালান:

   ```bash
   npm run dev
   ```

4. `http://localhost:3000` খুলুন।

## Authentication callback URL

OAuth provider setup করার সময় Better Auth-এর callback path ব্যবহার করুন:

- Google local redirect URI: `http://localhost:3000/api/auth/callback/google`
- GitHub local callback URL: `http://localhost:3000/api/auth/callback/github`
- Google production redirect URI: `https://<আপনার-ডোমেইন>/api/auth/callback/google`
- GitHub production callback URL: `https://<আপনার-ডোমেইন>/api/auth/callback/github`

Google OAuth client-এ local ও production origin/redirect URI দুটিই যোগ করা যায়। GitHub OAuth App-এ একটি callback URL থাকে, তাই local ও production-এর জন্য আলাদা app তৈরি করুন। OAuth credentials সংশ্লিষ্ট environment-এর `.env` বা hosting provider-এর environment settings-এ রাখুন।

## Netlify-তে deploy

1. GitHub repository Netlify-তে import করুন। Netlify-এর Next.js runtime adapter দিয়ে Next.js App Router deploy করুন; static export ব্যবহার করবেন না, কারণ Better Auth এবং server-side API fetching server runtime চায়।
2. Netlify site-এর environment variables-এ `BETTER_AUTH_URL` হিসেবে production origin দিন, যেমন `https://<আপনার-সাইট>.netlify.app`।
3. `BETTER_AUTH_SECRET`, `BETTER_AUTH_DB_URL`, `BETTER_AUTH_DB_NAME`, এবং চালু করতে চাইলে Google/GitHub client ID ও secret যোগ করুন।
4. Google ও GitHub OAuth app-এ production callback URL যোগ করুন, তারপর Netlify-তে deploy করুন বা নতুন deploy চালান।
5. MongoDB Atlas-এ Netlify-এর server runtime থেকে database access অনুমোদিত আছে কিনা নিশ্চিত করুন।

## যাচাইকরণ

```bash
npm run lint
npm run build
```
