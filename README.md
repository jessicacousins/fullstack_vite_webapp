# Fullstack Vite Web Application

## TODO:

- Add in games
- Adjust backend to reflect new frontend features
- Create client personalized feed
- Add chat feature
- Add AI bot

## Backend

- MongoDB
- Express
- NodeJS
- bcryptjs
- request-ip
- useragent

## Frontend

- Vite
- Firebase
- React Router
- Axios
- npm install three @react-three/fiber @react-three/drei
- React-Confetti

## Project Overview

This project is a full-stack web application built using **Vite**, **React**, and **Firebase** on the frontend, while leveraging **Node.js**, **Express**, and **MongoDB** for the backend. The primary objective of this project is to implement a user registration and authentication system with data collection features, enabling a comprehensive user experience that includes account creation, login, blog feature, and profile management.

The backend securely handles user data such as personal information, device and browser details, IP address, and more. This data is stored in MongoDB, with strict age verification in compliance with legal guidelines.

## Blog Feature

This web application also includes a **Blog Feature** where users can:

- **Create Blog Posts**: Users can write and publish their own blog posts.
- **Edit Blog Posts**: Users have the ability to edit their previously created blog posts.
- **Delete Blog Posts**: Users can delete blog posts they have created.

All user interactions with the blog posts are tracked in the backend, and the data is stored securely in the MongoDB database. This includes:

- The **creation time and date** of the blog post.
- The **author’s details** (linked to their user account).
- Any **updates made** to the blog posts.

## Scope of the Project

This web application focuses on:

1. **User Registration**: The user can sign up with their personal details such as name, email, phone, and date of birth. The system includes age verification to ensure users under 13 cannot register.
2. **User Authentication**: Firebase authentication is used for both email/password and Google sign-in options.
3. **Data Collection**: When a user signs up, the backend collects and stores user information, including:
   - Basic personal information (name, email, phone, etc.).
   - Date of birth to enforce the age restriction (13+).
   - IP address, device type, browser, and operating system.
   - User acceptance of the Privacy Policy.
4. **Profile Management**: Users can manage their profile details, such as updating their information or viewing their past login history.
5. **Privacy Policy Compliance**: Users must agree to the privacy policy before completing the registration process. This policy explains the types of data being collected, including personal data, device information, and analytics data (Google Analytics and Google AdSense).

## Packages and Technologies Used

### Frontend

- **Vite**: Vite is a modern build tool that provides fast development and improved performance compared to traditional bundlers like Webpack.
- **Three.js**: A JavaScript library for creating 3D graphics and animations in the browser.
- **React**: A front-end JavaScript library for building interactive user interfaces.
- **Firebase**: Firebase Authentication is used to handle user authentication via email/password and Google sign-in. It simplifies the management of user accounts.
- **React Router**: For seamless navigation and routing between the various pages (e.g., home, profile, login, signup, etc.).
- **Axios**: Axios is a promise-based HTTP client used to make API calls to the backend for data retrieval and submission.

### Backend

- **Node.js**: JavaScript runtime used to run the backend server.
- **Express**: A web framework for Node.js that is used to handle routing, middleware, and API endpoint creation.
- **MongoDB**: A NoSQL database used to store user data such as personal information, IP addresses, device information, and more.
- **bcryptjs**: A library used to securely hash passwords before storing them in the database.
- **request-ip**: A package that helps capture the user's IP address when they make requests to the server.
- **useragent**: This package is used to capture detailed information about the user's device and browser, such as browser type, operating system, and device category.

## Features

### Frontend Features

- **Sign-Up & Login**: Users can register for an account using either their email/password or via Google authentication.
- **Form Validation**: The sign-up form validates user input such as email format, password complexity, and ensures users are at least 13 years old before allowing them to create an account.
- **Privacy Policy Confirmation**: Users must confirm that they have read and agreed to the privacy policy before completing registration.
- **Google Sign-In Integration**: Users can use Google credentials for seamless sign-up and login via Firebase.

### Backend Features

- **User Data Collection**: The backend captures and stores user data such as IP address, device type, operating system, and browser information. This is useful for security measures, analytics, and personalization.
- **Age Verification**: The backend checks the user's date of birth to enforce that users under 13 are denied from registering, ensuring compliance with legal guidelines (e.g., COPPA).
- **Password Hashing**: User passwords are securely hashed using **bcryptjs** before being saved in the database.
- **Device Logging**: The backend logs device and browser information during registration and login to maintain a secure environment and monitor user activities.
- **MongoDB Storage**: All user data is stored in MongoDB, ensuring scalability and flexibility for large datasets.

## Privacy Policy and Data Collection

This application complies with privacy regulations by ensuring users must agree to the privacy policy before completing the registration process. The privacy policy explicitly states that the following data is collected:

- **Personal Information**: Name, email, phone number, date of birth, etc.
- **IP Address**: Collected via `request-ip` to monitor user sessions and track locations for security purposes.
- **Device and Browser Information**: Collected via `useragent` to track user devices, operating systems, and browsers used to access the platform.
- **Google Analytics**: (To be added) Traffic and usage data will be collected through Google Analytics to improve the user experience.
- **Google AdSense**: (To be added) Advertisements served via Google AdSense will track user interactions to display relevant ads.

## How to Run the Project

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16+)
- **MongoDB** (either locally or use a cloud service like MongoDB Atlas)
- **Firebase** account for authentication

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repository/fullstack-vite-app.git
   cd fullstack-vite-app
   ```

## Installation Guide

### Install Dependencies:

#### For the backend:

```bash
cd backend
npm install
node index.js
```

#### For the backend:

```bash
cd frontend
npm install
npm run dev
```

## License Info

## License Info

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**Attribution**: You must give appropriate credit to me, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

**NonCommercial**: You may not use the material for commercial purposes.

**ShareAlike**: If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

### Full Legal Code

For more details, refer to the full legal code of the license [here](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).

_Copyright (c) 2024 Jessica Cousins_

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
