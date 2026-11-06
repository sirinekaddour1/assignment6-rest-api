# Notes REST API - Assignment 6

## Description

For this assignment, I made a REST API to manage notes using Node.js, Express and MongoDB.

The user can create, view, update and delete notes. All notes are saved in MongoDB Atlas.

## Technologies

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv

## How to Run

First, download the project and open it in VS Code.

Install the packages:

```bash
npm install
```

Create a `.env` file and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own.

Then start the server:

```bash
node server.js
```

The server runs on `http://localhost:3000`.

## API Routes

I used five routes for the CRUD operations.

**GET /notes**

Gets all notes from the database.

Example response (200 OK):

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My first note",
    "content": "This is my first note in MongoDB"
  }
]
```

**GET /notes/:id**

Gets one note using its ID.

Example request:

`GET /notes/507f1f77bcf86cd799439011`

Example response (200 OK):

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My first note",
  "content": "This is my first note in MongoDB"
}
```

**POST /notes**

Creates a new note.

Example request body:

```json
{
  "title": "My first note",
  "content": "This is my first note in MongoDB"
}
```

Example response (201 Created):

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My first note",
  "content": "This is my first note in MongoDB"
}
```

**PUT /notes/:id**

Updates an existing note.

Example request:

`PUT /notes/507f1f77bcf86cd799439011`

Request body:

```json
{
  "title": "My updated note",
  "content": "This note has been updated successfully"
}
```

Example response (200 OK):

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My updated note",
  "content": "This note has been updated successfully"
}
```

**DELETE /notes/:id**

Deletes a note from the database.

Example request:

`DELETE /notes/507f1f77bcf86cd799439011`

Example response (200 OK):

```json
{
  "message": "Note deleted successfully"
}
```

The examples above use a sample note ID. MongoDB generates the real IDs. The actual note responses also contain `createdAt`, `updatedAt` and `__v`.

## Error Handling

I added error handling to avoid crashing the server when the request is invalid.

- 400: Invalid input, invalid ID or invalid JSON.
- 404: Note not found.
- 500: Server error.

For example, if the title or content is empty, the API returns:

```json
{
  "error": "Title and content must be non-empty strings"
}
```

## Testing

I tested the API using curl commands in the VS Code terminal.

I tested all five routes and also checked what happens when the user sends invalid data or requests a note that does not exist.

All the commands are in `TESTING.md`.

## Gitignore

I used `.gitignore` to exclude `node_modules` and `.env` from GitHub because `.env` contains the database connection information.