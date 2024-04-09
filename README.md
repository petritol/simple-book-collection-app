# A simple book collection app
This was made for demonstration purposes using React frontend with Laravel backend.

## Installation
Note: These instructions assume you are running Ubuntu Desktop on WSL2 or as the actual OS with Docker, PHP, Composer, Node and npm already installed.

Install the PHP dependencies:
```
composer install
```
Install the Javascript dependencies:
```
npm install
```
Build the static assets:
```
npm run build
```

## Running the app
Start the Docker container by running:
```
./vendor/bin/sail up
```
After the container is up and running, navigate to
```
http://localhost/
```
in your favorite browser. Happy book collecting!

## TODO
- Actual styling, this thing looks hideous
- Toasts instead of alert() for feedback
- Tests for frontend and backend