# Welcome to Quizziebot

<p align="center">
  <img src="https://github.com/Beyond-Logic-Ai/Quizziebot-Frontend/blob/main/assets/images/logo.jpeg" alt="App Screenshot" width="400" height="400">
</p>

This is a React Native application built with Expo. This README will guide you on how to run the application on iOS emulator, Android emulator, and web.

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js]([https://nodejs.org/](https://nodejs.org/en)) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android emulator)
- [Xcode](https://apps.apple.com/us/app/xcode) (for iOS emulator, macOS only)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Beyond-Logic-Ai/Quizziebot-Frontend.git
   cd Quizziebot-Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the Application

### Running on iOS Emulator

1. **Start the iOS emulator:**
   Open Xcode and go to `Xcode > Preferences > Locations` and set the Command Line Tools to the latest Xcode version. Then, open the iOS Simulator from `Xcode > Open Developer Tool > Simulator`.

2. **Run the application:**

   ```bash
   npx expo start
   ```

3. Press `i` in the terminal to open the app in the iOS emulator.

### Running on Android Emulator

1. **Start the Android emulator:**
   Open Android Studio and start an Android Virtual Device (AVD) from `AVD Manager`.

2. **Run the application:**

   ```bash
   npx expo start
   ```

3. Press `a` in the terminal to open the app in the Android emulator.

### Running on Web

1. **Run the application:**

   ```bash
   npx expo start
   ```

2. Press `w` in the terminal to open the app in the web browser.

## Building for Production

To create a production build for iOS, Android, or web, refer to the official Expo documentation:

- [Building Standalone Apps](https://docs.expo.dev/build/introduction/)
- [Publishing to the App Store and Play Store](https://docs.expo.dev/distribution/introduction/)
- [Deploying to Web](https://docs.expo.dev/distribution/publishing-websites/)

## Troubleshooting

If you encounter any issues, please refer to the [Expo documentation](https://docs.expo.dev/) or check the [issues](https://github.com/Beyond-Logic-Ai/Quizziebot-Frontend/issues) section in this repository.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
