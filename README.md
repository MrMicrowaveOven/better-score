# Bocce Score
This is a Bocceball Scoring App

# Building for a Release
## Build for Android on a Local Phone
Build for .apk
cd android && ./gradlew assembleRelease && cd ..

## Build for Google Play Store
Build for .aab
(update version code first!)
npx react-native build-android --mode=release