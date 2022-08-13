# Fibonacci Game

## Game Rules


Make a 50x50 grid of cells. When a cell is clicked, increment all cells that are in the same row and the same column by one. If a cell is empty, it becomes a one. Every time a cell is updated it should momentarily light up yellow. If five consecutive numbers are found to be part of the Fibonacci series, momentarily light them up green, and then reset them. Please use Typescript to get the job done


## Setup


Step 1: Clone the repository

Step 2: `npm install`

Step 3: `npm run start`

Step 4: Open url http://localhost:5578/

Step 5: Run test `npm run test`

## Key Features

1. Highlights horizontal fibonacci series of 5 numbers
2. Highlights vertical fibonacci series of 5 numbers
3. Testing with jsdom
4. No frontend framework used done with vanila HTML and DOM manipulation
5. No package used for the working funcationality 
6. Can run without a server by using a html `file:///{path_to_repo_in_local_computer}/fibo-game/dist/ui/fibo-view.html`
7. Can be rendered on a simple node server that does not require any external packages
8. All the dependecy in the package are for using Typescipt as a language and for runing tests cases

