# Khanya Love Letter App

A personalized romantic web app built with React, Vite, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment to Railway

This app is configured for Railway deployment:

1. Push to GitHub
2. Connect your Railway account to the GitHub repository
3. Railway will automatically detect the build configuration
4. The app will be deployed and available at your Railway URL

### Railway Configuration

- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: Automatically handled by Railway via `$PORT` environment variable

The app will be served from the `dist` folder after building.
