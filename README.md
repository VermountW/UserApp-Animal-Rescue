# Animal Rescue System - User Report App

## Overview
The **Animal Rescue System** is a comprehensive platform designed to streamline the process of reporting and rescuing animals in distress. It consists of three main components:
- **Admin Dashboard** - The UI for administrators to review and update the status of reported animal cases.
- **Server** - The backend system that manages data and communication between users and administrators.
- **User Report App** - The frontend application for users to report animal anomalies and track their case status.
This repository contains the **User Report App**, built with Expo Go for mobile devices. **This project is designed to run locally and does not include a hosted deployment.**

## Features
- Report an animal in need of rescue by providing details such as location and description.
- Track the status of reported cases.
- Simple and user-friendly mobile interface.

## Technologies Used
- **Frontend**: React Native (Expo Go)
- **Styling**: Tailwind CSS

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/userapp-animal-rescue.git
   cd userapp-animal-rescue
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the app in Expo Go:
   ```sh
   expo start
   ```
4. Scan the QR code with the Expo Go app on your mobile device to run the application.

## API Integration
- The app connects to the backend server to send and retrieve reports.
- Ensure the backend is running locally before using the app.
  ```sh
  node server.js
  ```

**Note:** This project is intended to run locally. Ensure that you have Node.js and Expo installed before running the application.

