# Purple Theme Styling System

## Overview
This app now features a modern, playful purple theme with bright interfaces, blur effects, and smooth animations throughout.

## Color Palette
Based on `palette_template.css`, the theme uses a beautiful purple gradient:

- **Russian Violet** (`#10002b`) - Darkest background
- **Russian Violet 2** (`#240046`) - Main background color
- **Persian Indigo** (`#3c096c`) - Surface elements
- **Tekhelet** (`#5a189a`) - Primary interactive elements
- **French Violet** (`#7b2cbf`) - Primary light variant
- **Amethyst** (`#9d4edd`) - Highlights
- **Heliotrope** (`#c77dff`) - Accent color
- **Mauve** (`#e0aaff`) - Light accents

## Key Features

### 🎨 Purple Backgrounds & White Text
- All `SafeAreaView` components use purple backgrounds (`#240046`)
- All text is white or light purple variants for high contrast
- Headers use semi-transparent purple with blur effect

### ✨ Animations
- **Modal animations**: Spring and scale animations on modals
- **Button press effects**: Tap animations on interactive elements
- **Fade transitions**: Smooth opacity changes on page transitions
- **Slide animations**: Side menu slides in smoothly

### 🌟 Blur Effects
- Modal overlays use semi-transparent purple (`rgba(16, 0, 43, 0.85)`)
- Header backgrounds use blur-like transparency
- Creates depth and modern feel

### 🎯 Interactive Elements
All buttons and interactive components feature:
- Purple gradient colors
- Glow shadows with purple tint
- Press animations
- Smooth transitions

## File Structure

```
src/
├── styles/
│   ├── theme.js          # Global theme configuration
│   └── commonStyles.js   # Common styles using theme
├── pages/
│   ├── MapPage.js        # With animated buttons and modals
│   ├── YourPetPage.js    # With slide-up modal animations
│   ├── LearningPage.js   # With fade transitions for quiz slides
│   ├── MyRoutesPage.js   # With purple cards and badges
│   └── CreateRoutePage.js # With themed overlay
└── components/
    └── SideMenu.js       # Purple themed side navigation

```

## Theme Configuration (`src/styles/theme.js`)

### Colors
- Primary backgrounds and surfaces
- Text colors (white, light purple variants)
- Accent colors for interactive elements
- Success, warning, and error states

### Spacing
Consistent spacing values (xs, sm, md, lg, xl, xxl)

### Border Radius
Rounded corners for modern feel (sm: 8, md: 12, lg: 20, xl: 30)

### Shadows
Multiple shadow presets including special purple glow effect:
- Small, medium, large shadows
- Purple glow shadow for special elements

### Typography
Pre-defined text styles with proper colors

## Usage Example

```javascript
import { colors, shadows, borderRadius } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    ...shadows.medium,
  },
  text: {
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primaryLight,
    ...shadows.glow,
  },
});
```

## Animation Examples

### Modal Scale Animation
```javascript
const modalScale = useRef(new Animated.Value(0)).current;

Animated.spring(modalScale, {
  toValue: 1,
  tension: 50,
  friction: 7,
  useNativeDriver: true,
}).start();
```

### Button Press Animation
```javascript
const animateButton = () => {
  Animated.sequence([
    Animated.timing(buttonScale, {
      toValue: 0.95,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(buttonScale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
};
```

## Easy Theme Customization

To change the entire app's vibe, simply update values in `src/styles/theme.js`:

1. **Change color palette**: Update the `colors` object
2. **Adjust spacing**: Modify the `spacing` values
3. **Update shadows**: Change shadow configurations
4. **Border radius**: Adjust for sharper or rounder corners

All changes will propagate throughout the entire app automatically!

## Components Styled

✅ MapPage - Purple theme with animated buttons and modals
✅ YourPetPage - Purple surfaces with slide animations
✅ LearningPage - Purple quiz interface with fade transitions
✅ MyRoutesPage - Purple cards and interactive elements
✅ CreateRoutePage - Purple overlays and themed buttons
✅ SideMenu - Purple navigation with smooth slide
✅ All modals - Blur overlays with animations
✅ All headers - Semi-transparent purple backgrounds
✅ All buttons - Purple colors with glow effects
✅ All text - White and light purple variants

## Visual Features

- **Glow effects** on primary buttons
- **Blur overlays** on modals and popups
- **Smooth transitions** between states
- **Purple gradient** feel throughout
- **High contrast** white text on purple backgrounds
- **Modern rounded corners** on all components
- **Consistent spacing** using theme values
