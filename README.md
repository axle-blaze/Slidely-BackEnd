

This project is a simple Express.js backend API that handles form submissions, data retrieval, data search by email, and deletion of entries from a JSON file database. The application is built using Node.js and Express.

## Features

- **Ping**: Check the server status.
- **Submit**: Handle form submissions and save data to a JSON file.
- **Read**: Retrieve a specific submission by index.
- **Search**: Search for a submission by email.
- **Delete**: Delete a specific submission by index.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/your-repo.git
    ```

2. Navigate to the project directory:

    ```sh
    cd your-repo
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

## Running the Server

To start the server, run:

```sh
npx ts-node src/index.ts

The server will start on http://localhost:3000.

API Endpoints
Ping
GET /ping

Check if the server is running.

Response
200 OK: "True"
Submit
POST /submit

Submit form data.

Request Body
json
Copy code
{
  "Name": "Your Name",
  "Email": "your.email@example.com",
  "Phone": "1234567890",
  "GithubLink": "https://github.com/yourprofile",
  "StopwatchTime": "00:10:00"
}
Response
200 OK: "Submission saved"
400 Bad Request: "Missing required fields"
Read
GET /read

Retrieve a specific submission by index.

Query Parameters
index: The index of the submission to retrieve.
Response
200 OK: Submission data (JSON)
400 Bad Request: "Invalid index"
404 Not Found: "Entry not found"
Search
GET /search

Search for a submission by email.

Query Parameters
email: The email of the submission to search.
Response
200 OK: Submission data (JSON)
400 Bad Request: "Email query parameter is required"
404 Not Found: "Entry not found"
Delete
DELETE /delete

Delete a specific submission by index.

Query Parameters
index: The index of the submission to delete.
Response
200 OK: "Entry deleted"
400 Bad Request: "Invalid index"
404 Not Found: "Entry not found"
JSON Database
The data is stored in a JSON file named db.json in the root directory of the project. Ensure that this file exists before starting the server. You can create an empty JSON array in the file as shown below:

json
Copy code
[]
