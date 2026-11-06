# API Testing - Assignment 6

I used curl in the VS Code terminal to test my Notes REST API.

Before running the commands, the server must be started using `node server.js`.

## 1. POST - Create a Note

```bash
curl -i -X POST http://localhost:3000/notes \
-H "Content-Type: application/json" \
-d '{"title":"My first note","content":"This is my first note in MongoDB"}'
```

Result: 201 Created

The note was added to MongoDB and an ID was generated.

## 2. GET - Get All Notes

```bash
curl -i http://localhost:3000/notes
```

Result: 200 OK

The response returned the notes stored in MongoDB.

## 3. GET - Get One Note

I used the ID returned when creating the note.

```bash
curl -i http://localhost:3000/notes/NOTE_ID
```

Replace `NOTE_ID` with the actual note ID.

Result: 200 OK

The response returned the note with the given ID.

## 4. PUT - Update a Note

```bash
curl -i -X PUT http://localhost:3000/notes/NOTE_ID \
-H "Content-Type: application/json" \
-d '{"title":"My updated note","content":"This note has been updated successfully"}'
```

Replace `NOTE_ID` with the actual note ID.

Result: 200 OK

The note was updated successfully.

## 5. DELETE - Delete a Note

```bash
curl -i -X DELETE http://localhost:3000/notes/NOTE_ID
```

Replace `NOTE_ID` with the actual note ID.

Result: 200 OK

Response:

```json
{
  "message": "Note deleted successfully"
}
```

After deleting the note, I used GET /notes again and received an empty array `[]`.

## 6. Invalid Input

I tried to create a note with an empty title.

```bash
curl -i -X POST http://localhost:3000/notes \
-H "Content-Type: application/json" \
-d '{"title":"","content":"Test"}'
```

Result: 400 Bad Request

Response:

```json
{
  "error": "Title and content must be non-empty strings"
}
```

## 7. Note Not Found

I tried to get a note that does not exist.

```bash
curl -i http://localhost:3000/notes/507f1f77bcf86cd799439011
```

Result: 404 Not Found

Response:

```json
{
  "error": "Note not found"
}
```

## 8. Invalid ID

I used an invalid note ID.

```bash
curl -i http://localhost:3000/notes/invalid-id
```

Result: 400 Bad Request

Response:

```json
{
  "error": "Invalid note ID"
}
```

## 9. Invalid JSON

I sent a request with an incomplete JSON body.

```bash
curl -i -X POST http://localhost:3000/notes \
-H "Content-Type: application/json" \
-d '{"title":'
```

Result: 400 Bad Request

Response:

```json
{
  "error": "Invalid JSON body"
}
```

## Conclusion

All 9 tests passed.

The five CRUD routes worked correctly, and the API also returned the expected errors for invalid requests.