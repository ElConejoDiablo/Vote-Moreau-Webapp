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
   - This is the password users will need to access the site

4. **Deploy:**
   - If using GitHub, push to main branch (auto-deploys)
   - If using CLI: `vercel --prod`

## Password Protection

The site is protected by a password that is set via the `SITE_PASSWORD` environment variable in Vercel. Users will see a password prompt when accessing the site. The authentication cookie lasts 24 hours.

## File Structure

- `index.html` - Main application (self-contained)
- `password.html` - Password entry page
- `middleware.js` - Edge middleware for password protection
- `api/auth.js` - Authentication API endpoint
- `vercel.json` - Vercel configuration

## Notes

- The password protection only applies to `engage.votemoreau.com`
- The main site (`votemoreau.com`/`www.votemoreau.com`) is not affected
- All files are static except for the auth API route

