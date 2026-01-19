# Dellys Mini Market - Troubleshooting Guide

## Issue: "Not Found" Error on Render

If you're encountering a "Not Found" error when accessing the deployed application on Render, follow these steps:

### 1. Check Render Deployment Logs
1. Go to your Render dashboard
2. Click on the "dellys-mini-market" service
3. Click on the "Logs" tab
4. Look for any error messages during deployment or runtime

### 2. Verify Route Configuration
The application should have the following route configuration in server.js:
- Root route (/): Serves index.html
- Products routes (/products/*): Handle product operations
- Static files: Served from the "public" directory
- Uploads: Served from the "uploads" directory

### 3. Check Environment Variables
Ensure the following environment variables are set in Render:
- NODE_ENV: production

### 4. Verify Build and Start Commands
Make sure the following commands are correctly configured in Render:
- Build Command: npm install
- Start Command: npm start

### 5. Check Health Check Path
The health check path should be set to "/" in the Render configuration.

### 6. Verify Database Path
The database should be using an absolute path:
```javascript
const dbPath = path.join(__dirname, 'database.db');
```

### 7. Check Static File Paths
Static files should be served using absolute paths:
```javascript
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

### 8. Manual Redeploy
If all else fails, try a manual redeploy:
1. Go to your Render dashboard
2. Click on the "dellys-mini-market" service
3. Click on "Manual Deploy"
4. Select the "main" branch
5. Click "Deploy Changes"

### 9. Contact Render Support
If the issue persists, contact Render support with:
- Your service name: dellys-mini-market
- A description of the issue
- Relevant logs from the "Logs" tab

## Common Solutions

### Issue 1: Database Not Found
If you see database-related errors, ensure the database.db file is committed to your repository.

### Issue 2: Static Files Not Loading
If CSS, JS, or images aren't loading, verify the static file paths are using absolute paths.

### Issue 3: Uploads Directory Not Found
If image uploads aren't working, ensure the uploads directory is properly created and configured.

### Issue 4: Port Configuration
Ensure the server is listening on the correct port:
```javascript
const PORT = process.env.PORT || 3000;
```

## Expected URL
After successful deployment, the application should be available at:
https://dellys-mini-market.onrender.com
