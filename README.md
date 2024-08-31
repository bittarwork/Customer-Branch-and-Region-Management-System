# Customer, Branch, and Region Management System

## Overview

The **Customer, Branch, and Region Management System** is a comprehensive web application designed to manage customers, branches, and regions within an organization. Built with **Node.js** and **MongoDB**, this system provides a robust set of features to streamline data management and improve productivity.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication.
  - Role-based access control (`user`, `admin`, `superadmin`).

- **Branch Management**
  - CRUD operations for branches.
  - Ensure branches are not deleted if associated with customers.

- **Region Management**
  - CRUD operations for regions.
  - Prevent deletion of regions with associated customers.

- **Customer Management**
  - CRUD operations for customers.
  - Associate customers with branches and regions.
  - Advanced search and filtering options.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Management**: dotenv

