# Campaign Actions QR Code Web App

A mobile-first, single-page web application for displaying scannable QR codes for campaign actions.

## Features

- Mobile-first responsive design
- Language toggle (English/Español)
- Password protection
- Self-contained QR code generation
- Offline support
- WCAG AA accessible

## Deployment to Vercel

### Prerequisites

1. A Vercel account
2. The Vercel CLI installed (optional, can use GitHub integration)

### Steps

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository: `ElConejoDiablo/Vote-Moreau-Webapp`
   - Or use Vercel CLI: `vercel`

2. **Configure Domain:**
   - In Vercel project settings, go to "Domains"
   - Add `engage.votemoreau.com` as a custom domain
   - Follow DNS configuration instructions (add CNAME record pointing to Vercel)

3. **Set Environment Variable:**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `SITE_PASSWORD` = `your-secure-password-here`
   - **IMPORTANT**: Make sure to select "Production" environment (not just Preview)
   - This is the password users will need to access the site

4. **Deploy:**
   - If using GitHub, push to main branch (auto-deploys)
   - If using CLI: `vercel --prod`

## Password Protection

The site is protected by a password that is set via the `SITE_PASSWORD` environment variable in Vercel. Users will see a password prompt when accessing the site. The authentication cookie lasts 24 hours.

## File Structure

- `index.html` - Main application (self-contained)
- `password.html` - Password entry page
- `api/edge.js` - Node function that checks the auth cookie before serving `index.html`
- `api/auth.js` - Authentication API endpoint
- `vercel.json` - Vercel configuration

## Troubleshooting Password Protection

If password protection is not working:

1. **Check Environment Variable:**
   - Ensure `SITE_PASSWORD` is set for **Production** environment (not just Preview)
   - Go to Project Settings → Environment Variables
   - Verify it's set for "Production" environment

2. **Clear Browser Cookies:**
   - The site uses cookies for authentication
   - Clear cookies for `engage.votemoreau.com` and try again

3. **Redeploy:**
   - After setting/changing environment variables, trigger a new deployment
   - Environment variables are only available after a new deployment

4. **Check Auth Function:**
   - The `api/edge.js` function is invoked for every request and serves `index.html`
   - `vercel.json` routes all traffic (aside from `/password.html` and `/api/*`) through this function

5. **Client-side Fallback:**
   - A client-side check is included as a fallback
   - If Edge Middleware doesn't run, the client-side check will redirect to the password page

## Notes

- The password protection only applies to `engage.votemoreau.com`
- The main site (`votemoreau.com`/`www.votemoreau.com`) is not affected
- All files are static except for the auth API route

