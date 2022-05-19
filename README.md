# ambient frontend

**ambient** is a social listening experience app, where artists and other content creators can reach and interact with the audience. This documentation is written for developers who want to understand how the ambient frontend app work. It will also give a step-by-step guide to install and run it locally.

The backend overview and installation will not be covered here, but you can read about it at [ambient-BE](https://github.com/athifongoqa/ambient-BE).

# Prerequisites

To follow this guide, readers should be familiar with:

- basic terminal commands (installing, configuring and running packages)
- cloning or downloading a repository on GitHub

The app is compatible only with Android OS, however you won't need a physical device to run it.

# Quick Overview

1. User Interface (UI) with [React](https://reactjs.org/) and [React Native](https://reactnative.dev/) for Android
2. Authentication and Playback Sync with [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
3. Requests with a [RESTful API](https://restfulapi.net/)
4. Instant Messaging (IM) and [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) with [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

<p align="center">
  <img src="./docs/ambient_architeture.jpg?raw=true" width="90%">
</p>

# Requirements

- [Android Studio](https://developer.android.com/studio/index.html)
- [OpenJDK](https://openjdk.java.net/) `11.0` or newer
- [Node](https://nodejs.org) `14.0` or newer
- [Watchman](https://facebook.github.io/watchman/) for macOS/Linux only
- Windows, MacOs or Linux
- [Android Virtual Device (AVD)](https://source.android.com/setup/create/avd) or a physical device with Android

See [Getting Started](#getting-started) to install requirement tools.

# Stack

- [React JS](https://reactjs.org/) `16.13.1` JavaScript library for UI
- [React Native](http://reactnative.dev/) `0.63.4` for building native apps using React
- [Expo](https://docs.expo.dev/versions/latest/) `42.0.1` provides tools to use in "vanilla" React Native app ("bare workflow")
- [Babel](https://babeljs.io/) `7.9.0` for ES6+ support
- [Socket.io](https://socket.io/) `4.3.2` bidirectional and low-latency communication
- [PeerJs](https://peerjs.com/) `1.1.0` library that simplifies WebRTC peer-to-peer data and audio calls

# Getting Started

## Setting up the development environment

Follow the instructions for [installing dependencies](https://reactnative.dev/docs/environment-setup) to the development environment for React Native.

Make sure to select:

- **React Native CLI Quickstart**
- **Development OS**: Your OS
- **Target OS**: Android

By the end of this step, you should have installed:

- [x] Node
- [x] Java SE Development Kit (JDK)
- [x] Android Studio
- [x] Android SDK
- [ ] Watchman (MacOS/Linux only)

Also, follow the instructions in the link above to verify that the environment variables for the Android SDK are set correctly.

## Preparing the Android device

To run the app, you will either need to have a physical device with Android OS and a compatible USB cable, or you will have to create a virtual device:

- Physical Device:
  1. Plug it in to your computer using a USB cable
  1. Folow the instructions [here](https://reactnative.dev/docs/running-on-device)
- Virtual Device:

  1. Open "AVD Manager" from within Android Studio
  1. If you have an existing AVD, you can skip to step iv
  1. Create a new AVD:

     1. Select "Create Virtual Device"
     1. Pick any phone from the list and click "Next"
     1. Select R API Level 30 image and click "Next"
     1. Click "Finish"

  1. Launch the AVD by clicking the green triangle button

## Cloning this repository

In a Terminal, navigate to the folder where you want to install the app and run:

```bash
git clone https://github.com/Costa-Alexandre/ambient-FE.git
cd ambient-FE
```

## Installing dependencies

ambient uses [Yarn](https://classic.yarnpkg.com/) for dependency management. You can verify if you have it installed by running:

```bash
yarn --version
```

If you don't have Yarn, follow [these instructions](https://classic.yarnpkg.com/en/docs/install) for installing.

Once installed, make sure you are in `/ambient-FE` path and run:

```bash
yarn install
```

## Running the app

1. Start Metro Bundler

Run:

```bash
yarn start
```

2. Start the application

Let Metro Bundler run in its own terminal. Open a new terminal inside ambient project folder.

Run:

```bash
yarn android
```

3. Get a coffee ☕ (or take a short break)

The previous command might take several minutes.
If everything is set up correctly, you should see ambient initial screen running in your Android emulator after the build is finished:

<p align="center">
  <img src="./docs/animated_initial_screen.gif?raw=true" width="300">
</p>
