# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Walk to School App is a gamified React Native application built with Expo that encourages children to walk or cycle to school. The app features:
- Real-time location tracking and mapping
- Route creation and management
- A virtual pet system that rewards active transportation
- Educational quizzes about cycling safety and air pollution
- Achievement tracking and points system

## Development Commands

### Running the App
```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
```

### Building
The app uses Expo Application Services (EAS) for builds:
- Project ID: `d814e3cf-7acc-4d16-b2f8-63a599083df7`
- Configuration: `eas.json`
- Package name (Android): `com.mild_solvent.walktoschoolapp`

## Architecture

### Application Structure

**State Management**: The app uses React hooks and prop drilling for state management. The root `App.js` component manages all application state and passes it down to page components.

**Navigation**: Custom page-based navigation system without a navigation library. Pages are conditionally rendered based on `currentPage` state:
- `map` → MapPage (default)
- `yourpet` → YourPetPage
- `myroutes` → MyRoutesPage
- `createroute` → CreateRoutePage
- `learning` → LearningPage

**Key State in App.js**:
- `location`: User's current GPS position (via expo-location)
- `savedRoutes`: Array of user-created routes with waypoints
- `selectedRouteId` / `schoolRouteId`: For displaying routes on map
- `totalPoints`: Gamification score
- `waypoints`: Temporary array for route creation
- `menuOpen`: Side menu visibility
- `recentRoutes`: History of completed walks

### File Organization

```
src/
├── components/
│   └── SideMenu.js          # Sliding navigation menu
├── pages/
│   ├── MapPage.js           # Main map view with react-native-maps
│   ├── YourPetPage.js       # Virtual pet display with video animations
│   ├── MyRoutesPage.js      # Route management and selection
│   ├── CreateRoutePage.js   # Route creation with map interaction
│   └── LearningPage.js      # Educational quiz system
└── styles/
    ├── theme.js             # Centralized design tokens
    └── commonStyles.js      # Reusable StyleSheet definitions
```

### Theme System

**Centralized Styling**: All visual styling is defined in `src/styles/theme.js` using a purple color palette inspired by `palette_template.css`.

**Design Tokens**:
- `colors`: Purple gradient palette, semantic colors, overlays
- `gradients`: Pre-defined color arrays for gradient effects
- `spacing`: Consistent spacing scale (xs to xxl)
- `borderRadius`: Rounded corner values
- `shadows`: Shadow presets including special purple glow effect
- `typography`: Text style definitions
- `animations`: Timing constants

**Usage Pattern**: Import design tokens and use them in StyleSheet.create():
```javascript
import { colors, shadows, borderRadius } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    ...shadows.medium,
  }
});
```

### Animation Patterns

The app uses React Native's Animated API throughout:

1. **Modal Animations**: Spring animations for scale/slide effects
   - Scale from 0 to 1 with spring physics (MapPage, YourPetPage)
   - Slide-up from bottom (YourPetPage achievements modal)

2. **Button Press Feedback**: Sequence animations that scale down (0.95) then back up (1.0)

3. **Page Transitions**: Fade animations using opacity (LearningPage quiz slides)

4. **Side Menu**: Slide animation using translateX (SideMenu component)

All animations use `useNativeDriver: true` for better performance.

### Location & Mapping

- **Location Permission**: Requested on app startup in App.js useEffect
- **Map Library**: react-native-maps (v1.20.1)
- **Map Features**:
  - User location marker
  - Polylines for displaying saved routes
  - Color coding: Green (#4CAF50) for selected routes, Blue (#2196F3) for school route
  - Long-press to add waypoints in CreateRoutePage

### Route System

**Route Data Structure**:
```javascript
{
  id: string,           // Date.now().toString()
  name: string,         // Auto-generated or custom
  date: string,         // Creation date
  waypoints: Array<{    // GPS coordinates
    latitude: number,
    longitude: number
  }>
}
```

**Route Workflow**:
1. Navigate to CreateRoutePage from MyRoutesPage
2. Long-press map to add waypoints (minimum 2 required)
3. Save route → stored in `savedRoutes` array
4. Set one route as "school route" from MyRoutesPage
5. Use "Go to school" button on MapPage to navigate school route

### Gamification System

**Points System**:
- 5 points per completed route (simulated via "Simulate Arrival" button)
- 10 points per completed educational quiz
- Points tracked in `totalPoints` state and displayed in header badge

**Virtual Pet**:
- Static dragon image (dragon.png) when idle
- Animated video (animated-dragon.mp4) plays when user "arrives" at school
- Video uses expo-video with loop=false for one-time playback

**Educational Content**:
- Quiz data hardcoded in LearningPage.js
- Multi-slide format with multiple choice questions
- Tracks completion status to prevent point farming
- Topics: cycling safety, air pollution

## Technical Constraints

### Expo SDK 54
- Uses new architecture (`newArchEnabled: true`)
- React 19.1.0 and React Native 0.81.5
- Requires expo-location for GPS features
- Requires expo-video for pet animations

### Platform-Specific Config
- **Android**: Google Maps API key configured in app.json (edgeToEdgeEnabled)
- **iOS**: Location permission description in infoPlist, empty Maps API key
- **Web**: Basic support via `expo start --web`

### Dependencies to Note
- `react-native-maps`: Maps must be manually configured for bare workflow
- `expo-video`: New video API (v3.0.11), uses `useVideoPlayer` hook
- `react-native-safe-area-context`: Used for SafeAreaView on all pages

## Code Patterns

### Page Component Structure
All page components follow this pattern:
1. Accept navigation functions and shared state as props
2. Return SafeAreaView with purple background (`colors.background`)
3. Include common header with back button, title, points badge, and burger menu
4. Render SideMenu component with slideAnim
5. Use StatusBar component from expo-status-bar

### Modal Pattern
Modals use:
- React Native Modal component with transparent={true}
- Overlay view with `colors.overlay` background
- Animated content view for entrance effects
- Close button (✕) in header

### State Mutation Pattern
State updates flow up from child pages to App.js via callback props:
- `addPoints(number)` - Increment total points
- `addRecentRoute()` - Add route history entry
- `saveRoute()` - Save created route
- `setSchoolRoute(id)` - Set default school route

## Theme Customization

To change the app's visual theme:
1. Edit `src/styles/theme.js` color palette
2. Changes propagate automatically to all components
3. Consider updating `palette_template.css` reference colors
4. Update splash screen and icon assets to match

The current purple theme creates high contrast with white text and uses blur/glow effects for a modern, playful aesthetic suitable for children.
