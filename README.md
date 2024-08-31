# Customer Management System

## Description

The Customer Management System is a comprehensive application designed to manage users, branches, regions, and customers within an organization. Features include user authentication, role-based access control, and CRUD operations for managing branches, regions, and customers.

## Features

- **User Management**: Create, update, delete, and list users with role-based access control (superadmin, admin, user).
- **Branch Management**: Manage branches with attributes like name, contact details, and color. Supports CRUD operations and permissions.
- **Region Management**: Manage regions with attributes like name and notes. Includes CRUD operations with permission control.
- **Customer Management**: Create, update, delete, and list customers. Customers are linked to regions and branches.

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/customer-management-system.git
    cd customer-management-system
    ```

2. **Install Dependencies**

    Ensure you have `Node.js` and `npm` installed. Then run:

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    MONGO_URI=your_mongo_database_uri
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Run the Application**

    Start the server with:

    ```bash
    npm start
    ```

5. **Run Tests**

    To run tests, use:

    ```bash
    npm test
    ```

## API Endpoints

### User Management

- **Create User**: `POST /api/users`
- **Get Users**: `GET /api/users`
- **Update User**: `PUT /api/users/:id`
- **Delete User**: `DELETE /api/users/:id`
- **Login**: `POST /api/users/login`
- **Verify Token**: `POST /api/users/verify-token`
- **Refresh Token**: `POST /api/users/refresh-token`

### Branch Management

- **Create Branch**: `POST /api/branches`
- **Get Branches**: `GET /api/branches`
- **Update Branch**: `PUT /api/branches/:id`
- **Delete Branch**: `DELETE /api/branches/:id`

### Region Management

- **Create Region**: `POST /api/regions`
- **Get Regions**: `GET /api/regions`
- **Update Region**: `PUT /api/regions/:id`
- **Delete Region**: `DELETE /api/regions/:id`

### Customer Management

- **Create Customer**: `POST /api/customers`
- **Get Customers**: `GET /api/customers`
- **Update Customer**: `PUT /api/customers/:id`
- **Delete Customer**: `DELETE /api/customers/:id`

## Middleware

- **Protect Middleware**: Ensures that the user is authenticated.
- **Authorize Middleware**: Ensures that the user has the required role.

## Contributing

1. **Fork the Repository**
2. **Create a New Branch**: `git checkout -b feature/your-feature`
3. **Make Changes and Commit**: `git commit -am 'Add new feature'`
4. **Push to the Branch**: `git push origin feature/your-feature`
5. **Create a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact:

- **Email**: bittar.work@gmail.com
- **GitHub**: [Your GitHub Profile](https://github.com/bittarwork)
