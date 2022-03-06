# POKEDEX

- Prerequisites:
  - Have **Node.js** installed on your machine. That's it :)

- How to run it:
  - From the root directory run ``` npm i ```.
  - Run ``` npm start ```.
  - The server should run on <http://localhost:8080> and you can call the API.

- How to run with Docker:
  - Have Docker installed on your machine.
  - Run ``` docker build -t pokedex . ```
  - Run the container with ``` docker run -p 8080:8080 pokedex ```
  - The server should run on <http://localhost:8080> and you can call the API.

- Note: You can run the tests with ``` npm test ```. The Docker build process automatically runs the tests for you :)
- Another Note: You can change the server port by passing in an environment variable PORT with the required port.
