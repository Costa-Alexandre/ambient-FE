# ambient frontend

**ambient** is a social listening experience app, where artists and other content creators can reach and interact with the audience. This documentation is written for developers who want to understand how the ambient frontend app work. It will also give a step-by-step guide to install and run it locally.

The backend overview and installation will not be covered here, but you can read about it at [ambient-BE](#).

# Prerequisites

To follow this guide, developers should be familiar with basic terminal commands for installing, configuring and running packages in your machine. The app is compatible only with Android OS, though you won't need a physical device to run it.

# Quick Overview

![Diagram of ambient](/docs/ambient_architeture.jpg?raw=true)

1. User Interface (UI) with [React Native](https://reactnative.dev/) for Android
2. Authentication and Playback Sync with [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
3. Requests with a [RESTful API](https://restfulapi.net/)
4. Instant Messaging (IM) and [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) with [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

# Requirements

- [Node](https://nodejs.org) `14.0` or newer
- [Android Studio](https://developer.android.com/studio/index.html)
- [OpenJDK](https://openjdk.java.net/) `11.0` or newer
- [Watchman](https://facebook.github.io/watchman/) for macOS only
- Windows, MacOs or Linux
- [Android Virtual Device (AVD)](https://source.android.com/setup/create/avd) or a physical device with Android

See [Getting Started](#) to install requirement tools.

# Stack

- [React JS](https://reactjs.org/) `16.13.1` JavaScript library for UI
- [React Native](http://reactnative.dev/) `0.63.4` for building native apps using React
- [Expo](https://docs.expo.dev/versions/latest/) `42.0.1` provides tools to use in "vanilla" React Native app ("bare workflow")
- [Babel](https://babeljs.io/) `7.9.0` for ES6+ support
- [Socket.io](https://socket.io/) `4.3.2` bidirectional and low-latency communication
- [PeerJs](https://peerjs.com/) `1.1.0` library that simplifies WebRTC peer-to-peer data and audio calls

# Getting Started

The app runs on Android, therefore you will need either a physical Android device or, more commonly, an Android Virtual Device (AVD).

### Setting up the development environment

### Cloning the repository

###
