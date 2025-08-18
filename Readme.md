# Mobile intern starter project
This is the starting point for mobile programming interns at Pandosima. You will work with the web interns team, and develop mobile version of the web version's features.

Make sure to check out the [web repository](https://github.com/pandosima/intern-web-starter) Follow the Readme to build and run the web version before building and runing this project.

You also need to install and run [ngrok](https://ngrok.com/downloads/) to create a free domain and forward to your pc. That help your mobile app (running on simulator) can access your REST APIs.

## Requirements
* This project use [React Native](https://reactnative.dev/) framwork. So make sure you follow [this guide](https://reactnative.dev/docs/set-up-your-environment) to setup the development environment.

## Signing config
### For Android
* [Generate a keystore](https://developer.android.com/studio/publish/app-signing#generate-key) for yourself.
* Copy [android/keystore.properties.example](mobile\android\keystore.properties.example), to `android/keystore.properties`. Then open it and change the values according to your team. Don't commit this file to the repository, because it contain sensitive information.
* If you join internship at the company's office, ask your leader to share the `key store` and `google-services.json` files. Put them to the [android/app](mobile\android\app) folder. Otherwise, you have to [create a Firebase project and register your app with Firebase](https://firebase.google.com/docs/android/setup), then download the `google-services.json` file. Don't commit these files to the repository, because it contain sensitive information.
### For iOS
* If you join internship at the company's office, ask your leader for the `.p12` key and `.mobileprovision` files. Install the `.p12` key. Put the the `.mobileprovision` files to the folder `~/Library/MobileDevice/Provisioning Profiles`. Otherwise, you have to have an Apple Developer Account (https://developer.apple.com/programs), create [applications](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app) and [provisioning profile](https://developer.apple.com/help/account/provisioning-profiles/create-a-development-provisioning-profile) yourself.
* Ask your leader for the 'GoogleService-Info.plist' files (if you join internship at the company's office) or download them from your Firebase console. Put it to the [ios/GoogleService](mobile\ios\GoogleService) folder (under corresponding folder for each environment, dev/prod/rc/stg). Don't commit these files to the repository, because it contain sensitive information.

## Build and run
Run these commands from [mobile](./mobile/) folder
### Install libraries
```
yarn install
```
### run debug build on Android
```
yarn android --mode <build_variant> [--appIdSuffix <suffix>]
```
For example, this command will run the dev debug variant:
```
yarn android --mode devDebug --appIdSuffix dev
```
### run debug build on iOS
Install dependencies:
```
cd ios
bundle install
bundle exec pod install
```

Build and run:
```
yarn ios  --scheme <scheme_name>
```
For example, this command will run the Interns-Dev scheme in Debug mode:
```
yarn ios  --scheme "Interns-Dev"
```

## Debuging
Follow the guide [here](https://reactnative.dev/docs/next/debugging) to debug the app

## Themimg
We use [React Native Elements](https://reactnativeelements.com/docs) to boot up theming for the app. Make sure to read [this guide](https://reactnativeelements.com/docs/customizing) if you want to custome the theme for the app.

## Build variants
* We have toltal 8 [build variants](https://developer.android.com/build/build-variants) for Android for 4 environments: `dev`, `rc`, `stg`, and `prod`. Each environent have 2 variants: `debug`, and `release`.
* Only for debug variant can be debbuged: `devDebug`, `rcDebug`, `stgDebug`, `prodDebug`. To debug these variants on your device/simulator, you have to specify the variant and app id suffix, for example:
```
yarn android --mode devDebug --appIdSuffix dev
```

# Troubleshoots
* Windows limit maximum 256 characters on a path. So you have to keep the path to your project as short as possible, otherwise, you will face error on linking c++ libraries for react-native-vision-camera.
