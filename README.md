This is a Google Sheer reader project made with Next.JS and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It is styled with TailwindCSS and Framer Motion. 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## To use
1. Install necessary components for Framer Motion, TailwindCSS, and Next.js (ver13)
2. Add Google private key and service account email under .env.local in the root directory [`https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=service-account`]
3. In sheetapi.js, update the Google Sheet ID with your own
4. **MAKE SURE GOOGLE SHEET ONLY HAS 'TODO' IN CELL A1**
5. Run the dev server

## API endpoints
- GET: /api/all
- POST: /api/data?inputValue
- POST: /api/update?updateValue=&key=
- DELETE: /api/update
