# Townhall Admin Access Setup Guide

## What is Townhall?
Townhall is the admin dashboard for managing website content including sponsors, events, stories, news, and carousel items.

## How to Access Townhall

### Step 1: Login to the Website
1. Visit your ACM website homepage
2. Click the **AuthButton** (login button) in the navigation bar
3. Sign in with your Google account

### Step 2: Grant Admin Access (For Existing Admins)

An existing admin needs to add you to the system:

1. **Go to Firebase Console**: https://console.firebase.google.com
2. Navigate to your project: `acm-web-a6457`
3. Go to **Firestore Database**
4. Click on the **users** collection
5. Find the user document (search by email address used to login)
6. **Important**: Add a new field with EXACTLY this format:
   - **Field name**: `townhall` (all lowercase, no spaces)
   - **Field type**: `boolean` (NOT string)
   - **Value**: `true` (boolean true, not the string "true")
7. Click **Save** or **Update**

### Step 3: User Must Refresh/Re-login
After access is granted:
1. **Log out completely** from the website
2. **Clear browser cache** (Ctrl+Shift+Delete)
3. **Log back in** with the same Google account
4. Navigate to: `/townhall.html`

### Step 4: Verify Access
1. Navigate to: `https://yourdomain.com/townhall.html`
2. Open Browser Console (F12) to see access verification logs
3. You should see: ✅ TOWNHALL ACCESS GRANTED
4. If successful, the admin dashboard will load!

## Troubleshooting

### "Access Denied" After Setting townhall=true

**Common Issues:**

1. **Wrong Data Type**
   - ❌ String: `"true"` 
   - ✅ Boolean: `true`
   - Fix: Delete the field and re-add it as a boolean type

2. **Typo in Field Name**
   - ❌ `Townhall`, `townHall`, `town_hall`
   - ✅ `townhall` (exactly, all lowercase)
   - Fix: Rename the field to exactly `townhall`

3. **Cache Issues**
   - Clear browser cache completely
   - Open in incognito/private window
   - Try a different browser

4. **Need to Re-login**
   - Firebase auth state must refresh
   - Log out completely, then log back in
   - Check console logs (F12) for verification messages

5. **Wrong Google Account**
   - Ensure you're logged in with the same email that was granted access
   - Check which account is currently signed in

6. **Firestore Security Rules**
   - Ensure read permissions are set correctly for the users collection
   - User must be able to read their own document

### Debugging Steps

1. Open browser console (F12)
2. Navigate to `/townhall.html`
3. Look for these messages:
   - 🔐 Auth State Changed: User logged in
   - 📋 Checking townhall access for user...
   - ✅ User document exists
   - 🔑 Townhall field value: true
   - 🔑 Townhall field type: boolean
   - ✅ TOWNHALL ACCESS GRANTED

4. If you see any ❌ messages, those indicate the problem

### "Access Denied" - Not Granted Yet
- **Cause**: Your account doesn't have `townhall: true` in Firebase
- **Solution**: Contact an existing admin to grant you access

### Not Logged In
- **Cause**: You haven't authenticated
- **Solution**: Click the login button and sign in with Google

### Can't Find Townhall Button
- **Cause**: Button only shows for users with townhall access
- **Solution**: Directly navigate to `/townhall.html`

## Features Available in Townhall

Once you have access, you can manage:

1. **Sponsors** - Add/remove sponsor logos and information
2. **Events** - Manage past event stories and photos
3. **Stories** - Update the stories/moments section
4. **News** - Manage news items for the news room
5. **Next Events Carousel** - Update the upcoming events carousel (limit 6 items)
6. **All Events Page** - Manage the comprehensive events page

## Security Notes

- Only grant townhall access to trusted administrators
- Each admin action is tracked by their Firebase UID
- Regularly review who has admin access
- Remove access for users who no longer need it

## Quick Access Link

Direct URL: `/townhall.html`

---

For technical support, contact the development team or check Firebase console logs.
