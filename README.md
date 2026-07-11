# Travel Website

A full-stack travel booking and planning app.

## Built by Shivam Chamoli

## Quick start

1. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
2. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```
3. Run backend server:
   ```bash
   cd ../server
   npm run dev
   ```
4. Run frontend app:
   ```bash
   cd ../client
   npm run dev
   ```

## Environment

Create `server/.env` with your credentials. Example:

```env
PORT=5000
MONGODB_URI=<your-mongodb-uri>
OPENAI_API_KEY=<your-openai-api-key>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
DB_SEED_ON_STARTUP=true
FORCE_DB_SEED=true
GEMINI_API_KEY=<your-gemini-api-key>
```

## Notes

- The frontend is served by Vite from `client/`.
- The backend runs on Node/Express from `server/`.
- `.env` is ignored by Git and should keep secrets secure.
