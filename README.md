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

## Deploy (Netlify)
- Config file: `netlify.toml`
- Build command: `npm run build`
- Publish directory: `build`
- SPA routing fallback: `public/_redirects`

## Auto Deploy (on push to main)
1. In Netlify, add a new site from this GitHub repository.
2. Set production branch to `main`.
3. Netlify will automatically build and deploy every push to `main`.

Optional custom domain:
- Add your domain in Netlify Domain settings.
- Update DNS records to point to Netlify.