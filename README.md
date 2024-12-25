# E-Commerce Application

## Overview
This E-Commerce application is built with React and Redux Toolkit for the frontend and uses Sequelize with SQLite for the backend. The application allows users to manage products, orders, and user accounts, supporting functionalities such as user registration, role management, search, add to cart, checkout and product management.

## Technologies Used

### Frontend
- React
- Redux Toolkit 
- Redux-Persist
- React Router DOM
- CSS Modules

### Backend
- Node.js
- Express
- Sequelize
- SQLite

## Features
- User Registration and Authentication
- Role Management (Admin, Seller, Shopper) with Create, Read, Update, Delete
- Product Management (Create, Read, Update, Delete)
- Order Management (Checkout, View Orders)
- User and Product Search Functionality
- User roles with different special operation permissions (Admin, Seller, Shopper)
- Add To Cart And View Cart Functionality
- Persistence For Cart Items and Auth After Reloads(Redux-Persist Package).
-

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- SQLite installed (if required for database management).

### Installation
### Clone the Repository

```bash
git clone https://github.com/Im-in123/Ecommerce-with-Advanced-Redux-Toolkit-State-Management
cd Ecommerce-with-Advanced-Redux-Toolkit-State-Management
 
nvm install --lts  # if using nvm
corepack enable
yarn set version stable
yarn install  # Install all required dependencies for the project
 
cd /packages/frontend
yarn install  # Install frontend dependencies
change the BASE_URL in frontend/src/constants.ts to the url of your running backend . The url shoul not end in a trailing slash. So remove the slash.
cd packages/backend
yarn install  # Install backend dependencies

cd packages/backend
cp .env.example .env  # Copy the example environment variables file . After that edit the .env file to set the appropriate values for your environment
mkdir -p uploads  #create uploads directory if it doesnt already exist in backend directory
Add the url of the running frontend in backend/app.js, add it to the cors origin. The url should not end with a slash, so remove the slash. Always restart the backend after any changes for it to reflect.

# Now cd back to your root folder
yarn backend:serve  # Start the backend server
yarn frontend:dev  # Start the frontend application
```

