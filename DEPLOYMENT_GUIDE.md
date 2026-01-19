# Dellys Mini Market Deployment Guide

## Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and log in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name the repository "dellys-mini-market"
4. Choose "Public" visibility
5. Don't initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Connect Local Repository to GitHub
1. Copy the repository URL from the GitHub page (it will look like `https://github.com/yourusername/dellys-mini-market.git`)
2. Run the following commands in your terminal:
   ```
   cd c:/Users/admin/Desktop/dellys
   git remote set-url origin https://github.com/yourusername/dellys-mini-market.git
   git push -u origin master
   ```
   (Replace "yourusername" with your actual GitHub username)

## Step 3: Deploy to Render
1. Go to [Render](https://render.com) and sign up or log in
2. Click "New +" button and select "Web Service"
3. Connect your GitHub account and select the "dellys-mini-market" repository
4. Configure the service:
   - Name: dellys-mini-market
   - Region: Choose the nearest region to your users
   - Branch: master
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Instance Type: Free
5. Click "Create Web Service"

## Step 4: Verify Deployment
Once the deployment is complete, you can:
1. Visit the provided URL to check if the homepage loads
2. Check if products display correctly
3. Verify images load from /uploads
4. Test adding a new product

Your Dellys Mini Market should now be live online!
