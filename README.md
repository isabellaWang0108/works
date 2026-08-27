## Hello there, this is my portfolio

## Run locally
```
npm install
npm start
```

## Build
```
npm run build
```

## Deploy
- Platform: Vercel
- Build command: `yarn build`
- Publish directory: `dist`
- SPA routing fallback: `vercel.json`

## Auto Deploy (on push to main)
1. In Vercel, add a new project from this GitHub repository.
2. Set production branch to `main`.
3. Vercel will automatically build and deploy every push to `main`.

Optional custom domain:
- Add your domain in Vercel Domain settings.
- Update DNS records to point to Vercel.
