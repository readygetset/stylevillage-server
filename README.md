# StyleVillage Server
Backend server project for the Style Village service built on MySQL/MariaDB.

## Develoment Stack
- Boilerplate
- TypeScript
- Express
- TypeORM
- ESLint/Prettier

## Project Structure
This project follows an MVC design:
- **Entity**: Defines the necessary elements and relationships for the database.
- **Repository**: Connects entities to the data source (database).
- **Service**: Provides CRUD services using the repository to interact with the data source (DB).
- **Controller**: Analyzes queries and utilizes services to execute requested functions.
- **Router**: Directs queries to the appropriate middleware or controller.

## Features and Services
- **Authentication**: Manages user authentication and session handling. Supports registration, login, and logout functions to ensure secure access to the platform.
- **Item Search**: Allows users to search for clothing items or other users within the platform, making it easy to discover new items or potential lenders.
- **Personal Closet Management**: Enables users to organize, manage, and view items in their personal closets, making it easy to keep track of available clothes.
- **Clothing Item Management**: Provides functionality to add, edit, or remove details of individual clothing items, ensuring each item’s information is up-to-date.
- **Lending System**: Facilitates the lending process, allowing users to lend their clothing items to others within the platform.
- **Borrowing Applications**: Manages applications to borrow items, allowing users to request items and track application status.
- **Wishlist**: Allows users to maintain a wishlist of items they are interested in, helping them keep track of items they'd like to borrow or own in the future.
- **Reviews**: Supports reviews for borrowed or lent items, helping users make informed decisions based on previous borrowers’ experiences.
  
## API Endpoints
- `/auth`: Handles user authentication processes such as registration, login, logout, and session management.
- `/search`: Allows users to search for items or users within the application.
- `/closet`: Manages personal closets, enabling users to organize and view their items.
- `/clothes`: Handles functionalities related to individual clothing items, such as adding or updating details.
- `/lend`: Supports lending functions, allowing users to lend items to others.
- `/apply`: Manages applications for borrowing items, facilitating requests between users.
- `/wish`: Manages the wishlist, where users can add items they are interested in.
- `/review`: Allows users to leave reviews on borrowed or lent items.

## Project Setup

### Database
The primary DBMS is MySQL/MariaDB. Install MySQL/MariaDB and create a database for the project. If you prefer another DBMS, adjust the data source in `src/config/dataSource.ts`.

### Environment Variables
Create an `.env.dev` file in the root directory for development mode with the following variables:
```
CLIENT_URL=http://localhost:4000
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=pwd
DB_NAME=example
```
For production, create an `.env.prod` file with the appropriate configurations.

### Running the Server
Execute the following commands in the project root directory depending on the mode:
#### Development Mode
```
npm install
npm run dev
```
#### Production Mode
```
npm install
npm run build
npm run prod
```

