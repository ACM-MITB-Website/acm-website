# Next Events Carousel - Setup & Usage Guide

## 🎯 What Changed

The **EventSidebar** (floating "NEXT EVENT" tab on the right side) has been transformed into a **carousel** that can hold up to **6 events** with navigation arrows. The single "Next Event" widget in the Hero section remains unchanged.

### Key Features:
- ✅ **Hero Widget**: Single next event display (top right of Hero section)
- ✅ **Sidebar Carousel**: Up to 6 events with navigation arrows (floating right sidebar)
- ✅ Automatic Firebase sync
- ✅ Cloudinary integration for images
- ✅ Drag-and-drop reordering in Townhall
- ✅ Status indicators (Active, Live, Hidden)

---

## 📁 Files Modified

### Modified Files:
1. **`src/components/EventSidebar.jsx`** - Transformed into a carousel with Firebase sync
2. **`src/components/Hero.jsx`** - Kept original single event widget
3. **`src/TownhallApp.jsx`** - Added managers for both single event and carousel

---

## 🚀 How to Use (Townhall Admin)

### Step 1: Access Townhall
1. Go to: `http://localhost:5173/townhall.html`
2. Login with admin credentials

### Step 2A: Manage Hero Next Event (Single)
Click on **"NEXT EVENT"** tab to manage the single event widget in the Hero section.

**Fields:**
- **Event Title**: e.g., "Tech Talk 2026"
- **Date/Time**: e.g., "Feb 28, 5:00 PM"
- **Registration Link**: Optional
- **Event Image**: Upload via Cloudinary

Click **UPDATE HERO WIDGET** to sync.

### Step 2B: Manage Sidebar Carousel (Up to 6 Events)
Click on **"NEXT EVENTS CAROUSEL"** tab to manage the floating sidebar events.

**Required Fields:**
- **Event Title**: e.g., "TURINGER 2026"
- **Event Subtitle**: e.g., "The Ultimate Coding Showdown"
- **Date Range**: e.g., "30th Jan - 1st Feb 2026"

**Optional Fields:**
- **Registration Link**
- **Description**
- **Status**: Active (Visible) / Live Now / Hidden
- **Event Image**: Upload to Cloudinary

Click **ADD EVENT** (max 6 events allowed).

---

## 🎨 Display Locations

### 1. Hero Section (Top Right)
- **Location**: Right side of the Hero section on home page
- **Type**: Single event widget
- **Data Source**: `settings/nextEvent` (Firebase document)
- **Managed via**: "NEXT EVENT" tab in Townhall

### 2. Floating Sidebar (Right Side)
- **Location**: Floating "NEXT EVENT" tab on right edge of screen
- **Type**: Carousel with up to 6 events
- **Data Source**: `nextEvents` collection (Firebase)
- **Managed via**: "NEXT EVENTS CAROUSEL" tab in Townhall
- **Features**:
  - Navigation arrows
  - Dot indicators
  - Event counter (e.g., "2 / 6")
  - Expandable panel

---

## 📊 Firebase Structure

### Single Event (Hero): `settings/nextEvent`
```javascript
{
  title: "Tech Talk 2026",
  date: "Feb 28, 5:00 PM",
  image: "https://res.cloudinary.com/...",
  link: "https://registration-link.com"
}
```

### Carousel Events (Sidebar): Collection `nextEvents`
```javascript
{
  title: "TURINGER 2026",
  subtitle: "The Ultimate Coding Showdown",
  date: "30th Jan - 1st Feb 2026",
  description: "Join the ultimate coding showdown...",
  image: "https://res.cloudinary.com/...",
  link: "https://registration-link.com",
  status: "active", // "active", "live", or "hidden"
  order: 1 // Display order (1-6)
}
```

---

## ✨ Example: Adding Turinger 2026 to Sidebar

1. Go to Townhall → **"NEXT EVENTS CAROUSEL"** tab
2. Fill in:
   ```
   Title: TURINGER 2026
   Subtitle: The Ultimate Coding Showdown
   Date: 30th Jan - 1st Feb 2026
   Description: Join the ultimate coding showdown. Prove your skills. Win glory.
   Link: https://your-registration-link.com
   Status: Active (Visible)
   ```
3. Upload event banner image
4. Click **ADD EVENT**

The event will appear in the floating sidebar carousel!

---

## 🎯 Key Differences

| Feature | Hero Widget | Sidebar Carousel |
|---------|------------|------------------|
| Location | Top right of Hero | Floating right sidebar |
| Events | 1 single event | Up to 6 events |
| Navigation | None | Arrows + dots |
| Firebase | Document: `settings/nextEvent` | Collection: `nextEvents` |
| Townhall Tab | "NEXT EVENT" | "NEXT EVENTS CAROUSEL" |
| Visibility | Always visible (on Hero) | Expandable sidebar tab |

---

## 🔧 Developer Notes

### EventSidebar Carousel Features:
- Real-time Firebase sync with `onSnapshot`
- Smooth transitions with Framer Motion
- Auto-hides when scrolling past Hero section
- Keyboard accessible navigation
- Dot indicators for quick navigation
- Event counter display

### Firebase Queries:
```javascript
// Sidebar Carousel
query(
  collection(db, "nextEvents"), 
  orderBy("order", "asc"),
  limit(6)
)

// Hero Widget  
doc(db, "settings", "nextEvent")
```

---

## 🐛 Troubleshooting

**Sidebar not showing?**
1. Check if at least one event has status "active" or "live"
2. Verify you're on the Hero section (sidebar hides on scroll)
3. Check browser console for Firebase errors

**Events not in correct order?**
- Use up/down arrows in Townhall to reorder
- Order numbers should be sequential (1-6)

**Images not uploading?**
- Verify Cloudinary credentials in ImageUpload component
- Check file size limits
- Ensure proper folder permissions

---

## ✅ Summary

You now have **TWO** next event systems:
1. **Hero Widget** - Single event, always visible, top-right of Hero
2. **Sidebar Carousel** - Up to 6 events, expandable sidebar with navigation

Both are independently managed through Townhall and sync with Firebase in real-time!


---

## 🚀 How to Use (Townhall Admin)

### Step 1: Access Townhall
1. Go to: `http://localhost:5173/townhall.html`
2. Login with admin credentials
3. Click on **"NEXT EVENTS"** tab

### Step 2: Add Events (Max 6)

Fill in the form with:

**Required Fields:**
- **Event Title**: e.g., "TURINGER 2026"
- **Event Subtitle**: e.g., "The Ultimate Coding Showdown"
- **Date Range**: e.g., "30th Jan - 1st Feb 2026"

**Optional Fields:**
- **Registration Link**: e.g., "https://forms.gle/..."
- **Description**: e.g., "Join the ultimate coding showdown. Prove your skills. Win glory."
- **Status**: Choose from:
  - `Active (Visible)` - Shows in carousel
  - `Live Now` - Shows "LIVE NOW" badge
  - `Hidden` - Not displayed

**Image Upload:**
- Click the upload area or drag & drop an image
- Images are automatically uploaded to Cloudinary
- Recommended size: 400x400px or similar square ratio

### Step 3: Manage Events

**Reorder Events:**
- Use ⬆️ and ⬇️ arrows to change the display order
- Order 1 shows first in the carousel

**Edit Events:**
- Click the blue **Edit** button
- Modify fields and click **UPDATE EVENT**

**Delete Events:**
- Click the red **Trash** button
- Confirm deletion

---

## 🎨 Home Page Display

The carousel appears on the **right side** of the Hero section with:
- Current event display
- Image thumbnail
- Event details (title, subtitle, date, description)
- Register/Join button
- Navigation arrows (when more than 1 event)
- Page indicator (e.g., "2 / 6")

---

## 📊 Firebase Structure

### Collection: `nextEvents`

```javascript
{
  title: "TURINGER 2026",
  subtitle: "The Ultimate Coding Showdown",
  date: "30th Jan - 1st Feb 2026",
  description: "Join the ultimate coding showdown...",
  image: "https://res.cloudinary.com/...",
  link: "https://registration-link.com",
  status: "active", // or "live" or "hidden"
  order: 1 // Display order (1-6)
}
```

---

## 🖼️ Cloudinary Setup

Images are uploaded to the **`nextEvents`** folder in your Cloudinary account.

**To configure Cloudinary:**
1. Check `ImageUpload.jsx` component for API settings
2. Ensure credentials are set in your Firebase config
3. Images are automatically optimized for web

---

## ✨ Example: Adding Turinger 2026

**Form Values:**
```
Title: TURINGER 2026
Subtitle: The Ultimate Coding Showdown
Date: 30th Jan - 1st Feb 2026
Description: Join the ultimate coding showdown. Prove your skills. Win glory.
Link: https://your-registration-link.com
Status: Active (Visible)
Image: [Upload the event banner]
```

**Result:**
- Event appears in carousel on home page
- Users can navigate to it with arrows
- Clicking register opens the link in new tab

---

## 🔧 Developer Notes

### Component Props:

**NextEventsCarousel.jsx:**
- No props needed
- Fetches data directly from Firebase
- Auto-updates on data changes

**Carousel Features:**
- Auto-loops through events
- Smooth transitions with Framer Motion
- Responsive design (hidden on mobile)
- Keyboard accessible

### Firebase Query:
```javascript
query(
  collection(db, "nextEvents"), 
  orderBy("order", "asc"),
  limit(6)
)
```

---

## 🎯 Migration from Old System

The old system used:
- Single document: `settings/nextEvent`
- No carousel navigation
- No multiple events

**New system:**
- Collection: `nextEvents`
- Up to 6 events
- Full carousel with navigation

**Old data is NOT migrated** - you need to re-add events through the new interface.

---

## 📱 Responsive Behavior

- **Desktop**: Full carousel visible with navigation
- **Mobile**: Carousel hidden (too small to display properly)
- Consider adding a mobile-specific view in future updates

---

## 🐛 Troubleshooting

**Events not showing?**
1. Check if status is "active" or "live"
2. Verify order numbers are sequential (1-6)
3. Check browser console for errors

**Images not uploading?**
1. Verify Cloudinary credentials
2. Check file size (max usually 5MB)
3. Ensure ImageUpload component is configured

**Carousel not navigating?**
1. Need at least 2 active events
2. Check browser console for React errors
3. Verify Firebase connection

---

## 🎉 Done!

Your Next Events Carousel is now live! Add up to 6 events and let users browse through them on the home page.

For support, check Firebase console for data structure and browser console for any errors.
