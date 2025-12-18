# Cloudinary Setup Instructions

## ✅ Step 1: Create Upload Preset (REQUIRED)

1. Go to https://console.cloudinary.com/settings/upload
2. Scroll down to **Upload presets** section
3. Click **Add upload preset** button
4. Configure the preset:
   - **Preset name**: `acm_uploads`
   - **Signing Mode**: Select **Unsigned**
   - **Folder**: Leave empty or use `acm-website` (optional)
   - **Unique filename**: Enable this (recommended)
   - **Overwrite**: Your choice
5. Click **Save**

## ✅ Step 2: Verify Configuration

Your current setup:
- Cloud Name: `dixiqvxju`
- Upload Preset: `acm_uploads`

## ✅ Step 3: Test Upload

1. Restart your dev server: `npm run dev`
2. Navigate to the Townhall admin page
3. Try uploading an image
4. Check your Cloudinary Media Library: https://console.cloudinary.com/console/media_library

## 🎉 Benefits

- **25GB Free Storage** (vs Firebase's limited free tier)
- **25GB Free Bandwidth/month**
- **Automatic Image Optimization**
- **CDN Delivery** - Fast loading worldwide
- **No credit card required**

## 📁 File Organization

Images will be organized in folders:
- `sponsors/` - Sponsor logos
- `images/events/` - Event images
- `images/stories/` - Moment/story images
- `images/news/` - News article images

## 🔐 Security Note

The unsigned upload preset is safe because:
- ✅ Only allows image uploads (not code execution)
- ✅ Rate-limited by Cloudinary
- ✅ No API keys exposed in frontend
- ✅ You can set file size/type restrictions in preset settings

## Need Help?

If uploads fail:
1. Check browser console for errors
2. Verify upload preset name is exactly `acm_uploads`
3. Ensure "Unsigned" mode is enabled
4. Check Cloudinary dashboard for upload logs
