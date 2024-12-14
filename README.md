# Gym Class Scheduling and Membership Management System Task

## Project-live Link: https://gym-administration.onrender.com

## Project Overview

The Gym Class Scheduling and Membership Management System is designed to streamline gym operations by managing class schedules and memberships. It allows administrators, trainers, and trainees to interact with the system based on their respective roles and permissions.

### Key Features:
- **Role-Based Access Control**: Admins, Trainers, and Trainees have distinct roles with specific privileges.
- **Class Scheduling**: Admins can schedule up to 5 classes per day, with each class having a maximum of 10 trainees.
- **Profile Management**: Trainees can create and manage their own profiles.
- **Trainer Management**: Admins can create and manage trainers, and assign them to classes.
- **JWT Authentication**: Ensures secure login and access to different actions based on user roles.

## Technology Stack

- **Backend Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB 
- **ORM/ODM**: Mongoose 
- **Authentication**: JSON Web Tokens (JWT)

## Business Rules

1. **Authentication**: All users must authenticate using JWT tokens to perform actions within the system.
2. **Roles and Permissions**:
   - **Admin**: Can create trainers, manage class schedules, and assign trainers to classes.
   - **Trainer**: Can only view assigned schedules, but cannot create new schedules or manage trainees.
   - **Trainee**: Can create and manage their own profile and book classes (with a max of 10 trainees per class).
3. **Class Scheduling**:
   - A maximum of 5 classes per day.
   - Each class lasts for 2 hours.
   - No more than 10 trainees per class.
4. **Error Handling**: Includes validation errors, unauthorized access, and class booking limit violations.

## Relational Diagram

![Relational Diagram](https://res.cloudinary.com/dq1vwcflq/image/upload/v1734104747/relational-diagram_d6s3rq.png)  


## API Endpoints

### 1. **POST request: Create Member
       
       With live link: https://gym-administration.onrender.com/auth/create-member
       In localhost: http://localhost:7094/auth/create-member
- **Description**: Create profile for Trainer or Trainee returns a JWT token.
- **Parameters**:
   - `email`: email (required)
   - `password`: password (required)
   - `name`: name (required)
   - `role`: Trainer | Trainee (For testing purposes add role value "Trainer" for creating Trainer profile but only admin can create Trainer profile and add "Trainee" for creating Trainee profile) (required) <br>
*For the successful request you will get a token in response, add this token to the Headers tab of the postman like token = "Your_Token""*
   
### 2. **POST request: Login
       With live link: https://gym-administration.onrender.com/auth/login
       In localhost: http://localhost:7094/auth/login
- **Description**: Authenticates the user and returns a JWT token.
   - **Parameters**:
      - `email`: User email (required)
      - `password`: User password (required) <br>
        *For the successful request you will get a token in response, add this token to the Headers tab of the postman like token = "Your_Token""*

### 3. **POST request: Create Schedule
       With live link: https://gym-administration.onrender.com/schedule/create-schedule
       In localhost: http://localhost:7094/schedule/create-schedule
- **Description**: Allows the admin to create a new class schedule.
- **Parameters**:
   - `date`: Class date (Use today's or a future date in YYYY-MM-DD format) (required)
   - `startTime`: Class time (Provide a start time in HH:mm format, ensuring it's in 24-hour format) (required)
   - `endTime`: Class time (Provide an end time exactly two hours after the start time in HH:mm format) (required)
   - `trainerId`: Trainer assigned (required)

### 4. **POST request: Create Trainer
       With live link: https://gym-administration.onrender.com/schedule/create-trainer
       In localhost: http://localhost:7094/schedule/create-trainer
- **Description**: Only admin can create a new Trainer.
- **Parameters**:
   - `email`: email (required)
   - `password`: password (required)
   - `name`: name (required)
   - `role`: "Trainer"

### 5. **GET request: Get all schedule 
       With live link: https://gym-administration.onrender.com/schedule/get-schedule
       In localhost: http://localhost:7094/schedule/get-schedule
- **Description**: Allows the user to see available class schedules.
- **Parameters**: no parameters need just make a get request

### 6. **GET request: Get trainer schedule 
       With live link: https://gym-administration.onrender.com/schedule/get-schedule-trainer
       In localhost: http://localhost:7094/schedule/get-schedule-trainer
- **Description**: Allows the Trainers to see class schedules assigned to them. (For this Trainer has to log in to his account with his email & password)
- **Parameters**: no parameters need just make a get request

### 7. **POST request: Booking class
       With live link: https://gym-administration.onrender.com/booking/book-schedule
       In localhost: http://localhost:7094/schedule/booking/book-schedule
- **Description**: Allows a trainee to book a class if available.
- **Parameters**:
   - `scheduleId`: ID of the class to book (required)
   - `traineeId`: ID of the respective Trainee (required)

### 8. **POST request: Manage trainee profile
       With live link: https://gym-administration.onrender.com/booking/update-trainee-profile
       In localhost: http://localhost:7094/booking/update-trainee-profile
- **Description**: Allows a trainee to update their profile.
- **Parameters**:
   - `name`: (if needed)
   - `password`: (if needed)

## Database Schema

### Trainee Model
- user.model.ts. (For storing user information and their role)
- schedule.model.ts. (For storing scheduled classes)
- booking.model.ts.   (For storing booking information)

### Admin Credentials
#### **POST request: Login
       With live link: https://gym-administration.onrender.com/auth/login
       In localhost: http://localhost:7094/auth/login
Please just log in with these api end points for admin permission
- **Parameters**:
   - email: "admin@gmail.com"
   - password: "sifat017"

### Instructions to Run Locally

Follow these steps to set up and run the project on your local machine.

Ensure you have the following installed:
- **Node.js** (version 14.x or higher) - [Download Node.js](https://nodejs.org/)
- **MongoDB** - Either [install MongoDB locally](https://www.mongodb.com/try/download/community) or use a cloud instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Postman** (optional) - Use for testing API endpoints.

### 1. Clone the Repository

Clone the repository from GitHub to your local machine:
```bash
git clone https://github.com/Tonmoysifat/gym-administration.git
```

### 2. Navigate to the Project Folder

Go to the project directory:

```bash
cd gym-administration
```

### 3. Install Dependencies

Install the necessary project dependencies:

```bash
npm install
```

### 4. Set Up Environment Variables

Create a .env file in the root directory of the project. This file will store sensitive information like your MongoDB connection string and JWT secret.

```bash
DB_USER = "YOUR_MONGODB_USER_NAME"
DB_PASS = "YOUR_MONGODB_PASSWORD"
JWT_SECRET="SECRET_KEY"
```

### 5. Run the Application

Once the dependencies are installed and the environment variables are set, start the application:

```bash
npm run dev
```
This will start the server and you can access the API at http://localhost:7094.
### 6. Build the Application

If anything is changed inside the src folder, then build the application using command:

```bash
npx tsc --build
```



### 7. Test the Application

Use Postman or any HTTP client to test the API endpoints.