# Dellys Mini Market Deployment Guide

## Step 1: Connect Local Repository to GitHub
1. Make sure you're in the project directory:
   ```
   cd c:/Users/admin/Desktop/dellys
   ```
2. Add all files to Git:
   ```
   git add .
   ```
3. Commit your changes:
   ```
   git commit -m "Prepare for Render deployment"
   ```
4. Push to the main branch:
   ```
   git push origin main
   ```

## Step 2: Deploy to Render
1. Go to [Render](https://render.com) (you should already be logged in)
2. Click the "+" button in the top navigation bar
3. Select "Web Service" from the dropdown
4. Find and select the "dellys-mini-market" repository
5. Configure the service:
   - Name: dellys-mini-market
   - Region: Frankfurt
   - Branch: main
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free
   - Auto-Deploy: Yes
6. Add Environment Variables:
   - NODE_ENV: production
7. Click "Create Web Service"

## Step 3: Verify Deployment
Once the deployment is complete, you can:
1. Visit the provided URL to check if the homepage loads
2. Check if products display correctly
3. Verify images load from /uploads
4. Test adding a new product

Your Dellys Mini Market should now be live online at: https://dellys-mini-market.onrender.com
