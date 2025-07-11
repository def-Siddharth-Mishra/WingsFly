# WingsFly - Enhanced Task Management App

This project is an **enhanced version** of the original Home Screen UI task, now featuring a complete task management system with **improved code quality**, **reusable components**, and **additional features**. Built with **React Native CLI** and **TypeScript**, focusing on production-ready code architecture and user experience.

---

## ✅ Features Implemented

- ✅ Horizontal **Date Selector** (15–21) with highlighted selection
- ✅ “**Today’s Quote**” section with animated progress bar and thumb
- ✅ Scrollable **Task List** displaying:
  - Image/Icon
  - Title
  - Time with colored pill
  - Tags (e.g., Habit | Must)
  - Status icon (check, clock, or arrow)
- ✅ Floating “**+**” action button (FAB)
- ✅ Slide-up **Bottom Drawer Modal** with 4 action options:
  - Habit
  - Recurring Task
  - Task
  - Goal of the Day
- ✅ **Smooth drawer animation** using the `Animated` API

---

## 🏗️ Enhanced Architecture

```
/WingsFly
├── /src 
    ├── /assets                  # Images and icons
    ├── /components
    │   ├── /ui                  # Reusable UI components
    │   │   ├── Button.tsx       # Custom button with variants
    │   │   ├── Input.tsx        # Enhanced input with validation
    │   │   ├── SearchBar.tsx    # Animated search component
    │   │   └── FilterChips.tsx  # Status filter chips
    │   ├── /forms               # Form components
    │   │   └── TaskForm.tsx     # Complete task creation form
    │   ├── DateSelector.tsx     # Enhanced date picker
    │   ├── QuoteSection.tsx     # Interactive quote display
    │   ├── TaskItem.tsx         # Advanced task component
    │   ├── Header.tsx           # App header with search
    │   ├── FloatingActionButton.tsx
    │   └── BottomDrawer.tsx     # Functional drawer
    ├── /context                 # State management
    │   ├── ThemeContext.tsx     # Theme system
    │   └── TaskContext.tsx      # Task management
    ├── /data                    # Data layer
    │   └── mockData.ts          # Mock data and generators
    ├── /types                   # TypeScript definitions
    │   └── index.ts             # All type definitions
    ├── /screens
    │   └── HomeScreen.tsx       # Main screen with filtering
    └── App.tsx                  # Root component
├── README.md
└── screenshots
```

---

## Setup Instructions

1. **Clone the repository**  
   git clone https://github.com/def-Siddharth-Mishra/WingsFly.git
   cd home-screen-task

2. **Install dependencies**  
   npm install

3. **Run on Android device/emulator**  
   npx react-native run-android

   Or on iOS (Mac only):
   npx react-native run-ios

3. **If Andriod/gredlew asks for permission**  

   cd android
   chmod +x gradlew

> ⚠️ Ensure a device/emulator is running and your environment is properly set up for React Native CLI.

---

##  Key Decisions & Assumptions

- **React Native CLI** was used as per requirement.
- Used **TypeScript** for type safety and maintainability.
- All **design values were matched pixel-by-pixel** based on the Figma reference.
- Icons were loaded via `react-native-vector-icons` and task images via local assets.
- Used the **Animated API** for the drawer transition (no 3rd party like `react-native-reanimated`).
- No external theming library was added for dark mode (for simplicity) but can be added via `react-native-paper` or Context API.

---


##  Screenshots

###  Home Screen

<img src="/screenshots/Home-Page-Light.jpeg" width="300" />

<img src="/screenshots/Home-Page-Dark.jpeg" width="300" />


###  Bottom Drawer

<img src="/screenshots/Floating-Action-Button-Light.jpeg" width="300" />

<img src="/screenshots/Floating-Action-Button-Dark.jpeg" width="300" />


### Adding Task

<img src="/screenshots/Create-Habit-Light.jpeg" width="300">

<img src="/screenshots/Create-Habit-Dark.jpeg" width="300">



### Searching

<img src="/screenshots/Search-Button.jpeg" width="300">


---

##  Author

- **Your Name**  
- [GitHub Profile](https://github.com/def-Siddharth-Mishra)  
- Email: siddharthmishra918@gmail.com

---

# WingsFly
