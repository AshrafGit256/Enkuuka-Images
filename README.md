# 🎉 Enkuuka Yomwaka – CBS Festival App (Ionic + Capacitor)

A mobile app for the Enkuuka Yomwaka cultural festival by CBS Radio Buganda.
Built with **Ionic React + Capacitor** — ready to build into an Android APK.

---

## 📱 Features
- **Home** – Festival overview, programme, quick links
- **Radio** – Live CBS FM 89.2 & 88.8 streaming player
- **Clans** – All 52 clans of Buganda with searchable details
- **Tickets** – Multi-step ticket purchase with mobile money
- **Hotels** – Hotel listing and room reservation flow

---

## 🛠️ Build Steps (Windows / Mac / Linux)

### Prerequisites
Make sure you have these installed:
- **Node.js** v16+ → https://nodejs.org
- **Android Studio** (with Android SDK) → https://developer.android.com/studio
- **Java JDK 17** (comes with Android Studio)

---

### Step 1 – Install dependencies & build the web app

Open a terminal in this folder and run:

```bash
npm install
npm run build
```

This creates a `build/` folder with the compiled React/Ionic web app.

---

### Step 2 – Add Android platform (first time only)

```bash
npx cap add android
```

This creates the full Android project inside the `android/` folder.

> **Note:** If `android/` already exists (it does in this zip), skip this step.

---

### Step 3 – Copy web build into Android

```bash
npx cap copy android
```

This copies your `build/` folder into `android/app/src/main/assets/public/`.

---

### Step 4 – Sync Capacitor plugins

```bash
npx cap sync android
```

---

### Step 5 – Open in Android Studio

```bash
npx cap open android
```

Android Studio will open the `android/` project automatically.

---

### Step 6 – Generate the APK in Android Studio

1. Wait for Gradle sync to complete (bottom bar)
2. Go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. Click **Build APK(s)**
4. When done, click **locate** in the notification to find your APK

The APK will be at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

### Step 7 – Share the APK

You can share `app-debug.apk` directly via:
- WhatsApp, Telegram, email, Google Drive, etc.
- Recipients need to **enable "Install from unknown sources"** in Android Settings

---

## 🔄 Quick reference (all steps at once)

```bash
npm install
npm run build
npx cap copy android
npx cap sync android
npx cap open android
# Then in Android Studio: Build → Build APK(s)
```

---

## 📂 Project Structure

```
enkuuka-app/
├── src/
│   ├── App.tsx          # Root app + tab navigation + splash
│   ├── theme.ts         # Color palette
│   ├── data.ts          # All app data (stations, clans, hotels, tickets)
│   ├── global.css       # Global Ionic theme overrides
│   ├── components/
│   │   └── Shared.tsx   # Pill, Stars, Popup, SuccessPopup
│   └── pages/
│       ├── Home.tsx     # Home screen
│       ├── Radio.tsx    # Radio player
│       ├── Clans.tsx    # 52 Clans browser
│       ├── Tickets.tsx  # Ticket purchase flow
│       └── Hotels.tsx   # Hotel booking flow
├── android/             # Capacitor Android project
├── public/              # Static assets
├── capacitor.config.ts  # Capacitor configuration
└── package.json
```

---

## ⚙️ App ID
`com.enkuuka.cbsfestival`

To change it, update:
- `capacitor.config.ts` → `appId`
- `android/app/build.gradle` → `applicationId`
- `android/app/src/main/AndroidManifest.xml` → `package`

---

## 🎨 Branding
Primary color: `#1A5276` (deep royal blue)  
Accent color: `#D4AC0D` (gold)  
Font: Nunito (loaded from Google Fonts)
