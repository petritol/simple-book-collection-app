# A simple book collection app
This was made for demonstration purposes using React as the frontend and PHP as the backend as per request.

## Installation
Note: These instructions assume you are running Ubuntu Desktop on WSL2 or as the actual OS.
### Frontend
To install the required packages, run the following command in the /client directory:
```
npm install
```
### Backend
To install PHP, run:
```
sudo apt install php
```
To install SQLite 3 and its PHP extension, run:
```
sudo apt-get install sqlite3
sudo apt-get install php-sqlite3
```

## Running the app
To start the backend, navigate to the /server directory and run:
```
php -S localhost:8000
```
For the frontend, start a new terminal in the /client directory and run:
```
npm start
```

This should start the frontend in your browser, but in case it doesn't, you can access the app by navigating to
```
http://localhost:3000/
```
in your favorite browser. Happy book collecting!

## TODO
- Actual styling, this thing looks hideous
- Toasts instead of alert() for feedback
- Tests for frontend and backend
- Replace the backend with something more robust, for example Laravel