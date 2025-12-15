# API Response Structure

All API endpoints in this application follow a consistent response structure defined in `lib/apiResponse.ts`.

## Response Format

### Success Response
```typescript
{
  status: number,      // HTTP status code (200, 201, etc.)
  message: string,     // User-friendly success message
  data?: any          // Optional response data
}
```

### Error Response
```typescript
{
  status: number,      // HTTP status code (400, 401, 404, 500, etc.)
  message: string,     // User-friendly error message
  error?: string      // Optional detailed error information
}
```

## Helper Functions

### sendSuccess
```typescript
sendSuccess({
  message: "Operation completed successfully",
  status: 200,
  data: { ... }
})
```

### sendError
```typescript
sendError({
  message: "Operation failed",
  status: 400,
  error: "Detailed error message"
})
```

## API Endpoints

### Projects

#### GET /api/project
**Success Response:**
```json
{
  "status": 200,
  "message": "Projects fetched successfully",
  "data": {
    "projects": [...]
  }
}
```

#### POST /api/project/create
**Success Response:**
```json
{
  "status": 201,
  "message": "Project created successfully",
  "data": {
    "project": { ... }
  }
}
```

#### GET /api/project/[id]
**Success Response:**
```json
{
  "status": 200,
  "message": "Project fetched successfully",
  "data": {
    "project": { ... }
  }
}
```

#### PATCH /api/project/[id]/update
**Success Response:**
```json
{
  "status": 200,
  "message": "Project updated successfully",
  "data": {
    "project": { ... }
  }
}
```

#### DELETE /api/project/[id]/delete
**Success Response:**
```json
{
  "status": 200,
  "message": "Project deleted successfully",
  "data": {
    "projectId": "..."
  }
}
```

### Templates

#### GET /api/project/[id]/templates
**Success Response:**
```json
{
  "status": 200,
  "message": "Templates fetched successfully",
  "data": {
    "templates": [...]
  }
}
```

#### POST /api/project/[id]/templates
**Success Response:**
```json
{
  "status": 201,
  "message": "Template created successfully",
  "data": {
    "template": { ... }
  }
}
```

#### GET /api/project/[id]/templates/[templateId]
**Success Response:**
```json
{
  "status": 200,
  "message": "Template fetched successfully",
  "data": {
    "template": { ... }
  }
}
```

#### PATCH /api/project/[id]/templates/[templateId]
**Success Response:**
```json
{
  "status": 200,
  "message": "Template updated successfully",
  "data": {
    "template": { ... }
  }
}
```

#### DELETE /api/project/[id]/templates/[templateId]
**Success Response:**
```json
{
  "status": 200,
  "message": "Template deleted successfully",
  "data": {
    "templateId": "..."
  }
}
```

## Frontend Usage

### Example: Fetching Data
```typescript
const response = await fetch('/api/project');
if (response.ok) {
  const result = await response.json();
  const projects = result.data?.projects || [];
  // Use projects...
} else {
  const error = await response.json();
  alert(error.message); // Show user-friendly error
  console.error(error.error); // Log detailed error
}
```

### Example: Creating/Updating Data
```typescript
const response = await fetch('/api/project/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ... })
});

const result = await response.json();
if (response.ok) {
  alert(result.message); // "Project created successfully"
  const project = result.data?.project;
  // Use project...
} else {
  alert(result.message); // User-friendly error
}
```

## Error Status Codes

- `400` - Bad Request (validation failed, missing fields)
- `401` - Unauthorized (not logged in)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (unexpected error)
