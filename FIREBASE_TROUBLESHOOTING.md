# Firebase Access Issues - Troubleshooting Guide

## Current Issues
1. ❌ Firebase permission denied errors
2. ❌ Unable to access Townhall even with `townhall: true`
3. ❌ Profile form not saving data

## Root Cause
**Firebase Firestore Security Rules are blocking access**

---

## 🔧 SOLUTION: Update Firebase Security Rules

### Step 1: Go to Firebase Console
1. Open: https://console.firebase.google.com
2. Select project: **acm-web-a6457**
3. Click: **Firestore Database** (left sidebar)
4. Click: **Rules** tab (top menu)

### Step 2: Replace Rules with This Code

**Copy and paste this EXACTLY:**

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public collections - everyone can read
    match /sponsors/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /events/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /stories/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /news/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /nextEvents/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /eventsPageEvents/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /popupEvents/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 3: Publish Rules
1. Click **"Publish"** button (top right corner)
2. Wait for success message: "Rules deployed successfully"

### Step 4: Verify Rules are Active
1. Check the timestamp next to "Rules" - should show current time
2. Refresh your website completely (Ctrl+Shift+R)

---

## 🧪 Testing After Rules Update

### Test 1: Profile Creation
1. **Logout completely** (if logged in)
2. **Clear browser cache**: Ctrl+Shift+Delete
3. **Login with Google**
4. **Profile form should appear**
5. **Fill all required fields**
6. **Submit form**
7. **Check console** (F12) - should see: "✅ Successfully saved to Firebase!"

### Test 2: Townhall Access
1. **Go to Firebase Console** → Firestore Database → Data
2. **Find users collection** → Find your user document (by email)
3. **Add/Edit field**:
   - Field: `townhall`
   - Type: `boolean` (NOT string!)
   - Value: `true` (checked checkbox)
4. **Save the change**
5. **Refresh your website**
6. **Open profile menu** (click your profile picture)
7. **Check console** (F12):
   - Should see: `✅ [AuthButton] User data fetched`
   - Should see: `🔑 [AuthButton] Townhall status: true Type: boolean`
   - Should see: `✅ [AuthButton] Rendering Townhall Admin button`
8. **Townhall Admin button should appear in profile menu**
9. **Click it** to access townhall

---

## 🔍 Debugging Steps

### If Profile Form Still Doesn't Show:

**Open Browser Console (F12) and look for:**

✅ **Success Messages:**
```
🔐 Auth state changed: User logged in
👤 User UID: [your-uid]
📄 User document exists: false
✅ Showing profile form - user document does not exist
🎨 Rendering ProfileCompletion form
```

❌ **Error Messages:**
```
❌ Error checking user document: FirebaseError...
```
→ **Solution**: Rules not updated correctly, go back to Step 2

---

### If Townhall Button Doesn't Show:

**Open Browser Console (F12) and look for:**

✅ **Success Messages:**
```
✅ [AuthButton] User data fetched: {townhall: true, ...}
🔑 [AuthButton] Townhall status: true Type: boolean
✅ [AuthButton] Rendering Townhall Admin button
```

❌ **Wrong Type:**
```
🔑 [AuthButton] Townhall status: "true" Type: string
```
→ **Solution**: In Firebase, the townhall field is a STRING not BOOLEAN
→ **Fix**: Delete the field and re-add as boolean type

❌ **False Value:**
```
🔑 [AuthButton] Townhall status: false Type: boolean
```
→ **Solution**: Change the value to `true` in Firebase

❌ **Error:**
```
❌ [AuthButton] Error fetching user data: FirebaseError...
```
→ **Solution**: Rules not updated, go back to Step 2

---

## 📋 Checklist

Before asking for help, verify:

- [ ] Firebase rules have been published
- [ ] Rules timestamp shows current time
- [ ] Cleared browser cache (Ctrl+Shift+R)
- [ ] Logged out and logged back in
- [ ] Checked browser console (F12) for error messages
- [ ] Townhall field in Firebase is **boolean** type (not string)
- [ ] Townhall field value is `true` (not "true")
- [ ] User document exists in Firebase users collection

---

## 🆘 Still Having Issues?

1. **Take a screenshot** of:
   - Browser console (F12)
   - Firebase rules page
   - Your user document in Firebase (with townhall field visible)

2. **Check console messages** and compare with the examples above

3. **Verify Firebase project ID**: Should be `acm-web-a6457`

---

## ✅ Expected Behavior After Fix

1. ✅ New users see profile form immediately after login
2. ✅ Profile data saves to Firebase successfully
3. ✅ Users can view their profile in profile menu
4. ✅ Users with `townhall: true` see "Townhall Admin" button
5. ✅ Clicking Townhall Admin button opens /townhall.html
6. ✅ Townhall page grants access if `townhall: true`

---

## 🔒 Security Note

The current rules allow any logged-in user to write to public collections. This is temporary for testing.

**For production**, update rules to restrict writes to townhall admins only.
