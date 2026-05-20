# DriveFleet - Car Rental Platform

Live Website: https://drive-fleet-client.vercel.app/  
Server API: https://drive-fleet-server.vercel.app/

## Project Overview

DriveFleet is a full-stack car rental platform where users can explore available cars, view detailed information, book vehicles, and manage their own rental listings. The platform is designed with a clean, responsive, and recruiter-friendly interface so that users can easily browse cars, check rental prices, and complete bookings from any device.

This project was built as a complete MERN-style full-stack application using Next.js for the frontend, Express.js for the backend, MongoDB for database operations, Better Auth for authentication, and JWT HTTPOnly cookies for protecting private backend APIs.

## Purpose of the Project

The main purpose of DriveFleet is to create a modern car rental management system where both general users and car owners can interact with the platform.

General users can browse cars, search and filter listings, view full car details, and book available vehicles. Logged-in users can also track their bookings from a private dashboard. Car owners can add new cars, update their own listings, and delete cars they no longer want to rent out.

## Features

- Users can explore all available and unavailable cars in a responsive card-based layout.
- Home page displays a banner section, available cars section, and extra static sections for better user engagement.
- Secure email and password authentication is implemented using Better Auth.
- Google login support is included for faster authentication.
- Logged-in users can add car listings with car name, image, rent price, car type, seat capacity, pickup location, description, and availability status.
- Users can view full car details from a dedicated dynamic details page.
- Logged-in users can book available cars using a booking modal.
- Booking form includes driver needed option and special note field.
- My Bookings page shows all bookings created by the logged-in user.
- My Added Cars page allows users to manage only the cars they have added.
- Car owners can update car price, description, availability, image, type, and location.
- Car owners can delete their own cars with a confirmation modal.
- Search functionality allows users to search cars by car name.
- Filter functionality allows users to filter cars by car type.
- Booking count increases automatically when a user books a car.
- JWT is stored in an HTTPOnly cookie for secure backend API protection.
- Private APIs are protected so unauthorized users cannot access sensitive data.
- Loading spinner is shown while data is being fetched.
- Custom 404 page is included for invalid routes.
- The website is fully responsive for mobile, tablet, and desktop devices.
- Clean UI design with Tailwind CSS utility classes.

## Technologies Used

### Frontend

- Next.js
- React
- JSX Components
- Tailwind CSS
- Better Auth Client
- React Hot Toast
- Fetch API
- Vercel Hosting

### Backend

- Node.js
- Express.js
- MongoDB
- JWT
- Cookie Parser
- CORS
- Dotenv
- Vercel Serverless Deployment

### Database

- MongoDB Atlas
- Database Name: `DriveFleet`
- Cars Collection: `Cars`
- Bookings Collection: `Bookings`

## Authentication System

DriveFleet uses Better Auth for user registration and login. Users can create accounts using email and password. Google login is also supported.

After a successful login, the client sends the logged-in user information to the Express server. The backend then creates a JWT token and stores it in an HTTPOnly cookie. This cookie is automatically sent with protected API requests.

This makes private routes and private backend APIs more secure because the JWT token is not directly accessible from client-side JavaScript.

## JWT Flow

```txt
User logs in with Better Auth
        ↓
Client receives session user
        ↓
Client calls backend JWT API
        ↓
Backend creates JWT token
        ↓
JWT is stored in HTTPOnly cookie
        ↓
Client sends private API requests with credentials
        ↓
Backend verifies JWT cookie
        ↓
Protected data is returned

### Locally run 

Clone the client project and install dependencies:

```bash
npm install
npm run dev