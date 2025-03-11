# TODO Application

This is a simple TODO application built with Node.js, Express, and MongoDB. It implements all the CRUD (Create, Read, Update, Delete) operations for managing TODO items.

## Features

- Create new TODO items
- Retrieve all TODO items
- Update existing TODO items
- Delete TODO items
- Error handling middleware

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- MongoDB (Docker Image or Local)
- npm | yarn

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:alvaroroberto91/todo-huddle.git
   cd todo-app
   ```

2. Install the dependencies:

   ```bash
   npm install || yarn
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

   ```plaintext
   DB_URI=mongodb://your_mongo_db_uri
   PORT=3000
   ```

### Running the Application

```sh
We recommend that this project be run via Docker. To do so, Docker must be installed.
```

To start the server on docker, run:

1. Run compose Build
    ```plaintext
    docker compose build
    ```
2. Run compose up
    ```plaintext
    docker compose up -d
    ```

#### To run outside the Docker environment, make sure you have the latest stable version of Mongo running on your machine and execute the following command at the root of the project:

```bash
npm run dev || yarn dev
```

The server will run on the specified port (default is 3000).

### TODO Model
```javascript
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }
```

### API Endpoints

- **GET /todos**: Retrieve all TODO items
- **POST /todos**: Create a new TODO item
- **PUT /todos/:id**: Update an existing TODO item
- **DELETE /todos/:id**: Delete a TODO item

### Example Requests

#### Create a TODO

```bash
curl -X POST http://localhost:3000/todos \
-H "Content-Type: application/json" \
-d '{"title": "New TODO", "description": "Description of the TODO", "priority": "medium", "dueDate": "2025-03-18"}'
```

#### Get all TODOs

```bash
curl -X GET http://localhost:3000/todos
```
#### Update a TODO

```bash
curl -X PUT http://localhost:3000/todos/{id} \
-H "Content-Type: application/json" \
-d '{"priority": "medium"}'
```

#### Delete a TODO

```bash
curl -X DELETE http://localhost:3000/todos/{id}

```

### Response Format

All responses will be in JSON format. Here are some examples:

- **Successful Creation Response:**

```json
[
    {
        "_id": "67d079b7ce1c5af0037729b3",
        "title": "New Todo",
        "description": "Some description here",
        "completed": false,
        "priority": "low",
        "dueDate": "2025-03-12T10:00:00.000Z",
        "createdAt": "2025-03-11T17:58:15.301Z",
        "updatedAt": "2025-03-11T17:58:15.301Z",
        "__v": 0
    }
]
```

- **Duplicated TODO title Error Response:**

```json
{
    "message": "A TODO with this title already exists"
}
```

