```markdown
# Herdeen Mobile App 📱

This is a cross-platform mobile application built with [Expo](https://expo.dev), [Expo Router](https://expo.dev/router), and React Native, styled with NativeWind/Tailwind CSS.

## 🚀 Get Started

1. **Clone the repository and switch to the development branch:**
   ```bash
   git checkout devbranch

```

2. **Install dependencies:**
```bash
npm install

```


3. **Start the app:**
```bash
npx expo start

```



In the terminal output, you'll find options to open the app via:

* [Expo Go](https://expo.dev/go?utm_source=gemini) (Scan the QR code)
* Android Emulator / Studio
* iOS Simulator (macOS only)

## 📁 Project Structure

This project uses **file-based routing** powered by Expo Router inside the `src/app` directory:

* **`src/app/(tabs)/`**: Bottom navigation tab screens (Home, Tracker, Planner, My Cycle).
* **`src/app/settings.tsx`**: Main settings page and profile overview.
* **`src/components/`**: Reusable custom components and UI pieces (such as `cycle-settings.tsx`).
* **`src/components/custom/`**: Shared custom form controls, inputs, and buttons.

## 🛠️ Built With

* **Framework:** React Native / Expo
* **Routing:** Expo Router
* **Styling:** NativeWind (Tailwind CSS for React Native)
* **Icons:** `@expo/vector-icons` & Lucide React Native
* **Utilities:** `@react-native-community/datetimepicker`

```

```