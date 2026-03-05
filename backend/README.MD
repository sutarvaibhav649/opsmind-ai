# OpsMind AI - Enterprise SOP Knowledge Assistant
## Backend Overview

### Table of Contents
- [What the backend does](#what-the-backend-does)
- [Environment variables](#environment-variables)
- [How to run server](#how-to-run-server)
- [API routes](#api-routes)

## What the backend does
- document ingestion
- vector search retrieval
- AI query generation
- chat session management
- query analytics

## Environment variables
```text
# Server
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI="mongo_db_uri"

OPENROUTER_API_KEY="your_api_key"

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET="Your_jwt_secrete_key"

```

## API routes
#### Document Routes
- POST  ```/api/documents/upload ```
- GET   ```/api/documents/all ```
- DELETE ```/api/documents/:id```

#### Chat Routes
- POST  ```/api/chat/sessions ``` 
- POST  ```/api/chat/query```
- GET   ```/api/chat/sessions ```
- GET   ```/api/chat/sessions/:sessionId/messages```
- PATCH ```/api/chat//sessions/:sessionId/title```
- DELETE ```/api/chat/sessions/:sessionId```

#### Admin Routes
- GET ```/api/admin/knowledge-graph ```
- GET ```/api/admin//users```
- PATCH ```/api/admin/users/:userId/role```


#### Auth Routes
- POST ```/api/auth/register```
- POST ```/api/auth/login```