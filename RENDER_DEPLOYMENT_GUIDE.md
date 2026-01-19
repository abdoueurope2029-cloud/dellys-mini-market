# Dellys Mini Market - Render Deployment Guide

## Prerequisites
- GitHub account: abdoueurope2029-cloud
- Repository: https://github.com/abdoueurope2029-cloud/dellys-mini-market.git
- Render account (free tier is sufficient)

## Step-by-Step Deployment Instructions

### 1. Log in to Render
1. Go to [https://render.com](https://render.com)
2. Click "Sign Up" or "Log In"
3. Choose "Sign up with GitHub" and authenticate with your GitHub account (abdoueurope2029-cloud)

### 2. Create a New Web Service
1. After logging in, click the "+" button in the top navigation bar
2. Select "Web Service" from the dropdown menu

### 3. Connect to GitHub Repository
1. Under "Connect a repository", search for "dellys-mini-market"
2. Select the repository from the list
3. Click "Connect"

### 4. Configure the Web Service
1. **Name**: dellys-mini-market (already filled)
2. **Region**: Frankfurt (select from dropdown)
3. **Branch**: main (already selected)
4. **Runtime**: Node (already selected)
5. **Build Command**: npm install (already filled)
6. **Start Command**: npm start (already filled)
7. **Instance Type**: Free (select from dropdown)
8. **Auto-Deploy**: Yes (make sure this is enabled)

### 5. Advanced Settings (Optional)
1. Click "Advanced" to expand additional settings
2. Add the following environment variable:
   - Key: NODE_ENV
   - Value: production

### 6. Deploy the Application
1. Click "Create Web Service" at the bottom of the page
2. Wait for the deployment to complete (this may take a few minutes)

### 7. Verify the Deployment
Once the deployment is complete:
1. Click on the provided URL to visit your application
2. Verify that:
   - The homepage loads correctly
   - Products display properly
   - Images load from /uploads
   - Adding products works correctly

## Troubleshooting

If the deployment fails:
1. Check the "Logs" tab in your Render dashboard for error messages
2. Verify that all dependencies are listed in package.json
3. Ensure the start command is correct (npm start)
4. Make sure the PORT environment variable is properly configured in server.js

## Live URL
After successful deployment, your Dellys Mini Market will be available at:
https://dellys-mini-market.onrender.com

(Replace with the actual URL provided by Render)
