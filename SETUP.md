# 🚀 Setup Instructions for E-commerce Chatbot

## Prerequisites Installation

### 1. Install Node.js
- Download Node.js from: https://nodejs.org/
- Install version 18 LTS or higher
- Verify installation: `node --version` and `npm --version`

### 2. Get OpenAI API Key
- Visit: https://platform.openai.com/api-keys
- Create a new API key
- Copy the key (starts with sk-...)

## Quick Setup

### Windows PowerShell
```powershell
# Navigate to project
cd "c:\Users\muhammadahmad5\Desktop\chatbot"

# Install all dependencies
npm run install:all

# Copy environment file
copy backend\.env.example backend\.env

# Edit the .env file and add your OpenAI API key
notepad backend\.env

# Start the application
npm run dev
```

### Alternative: Manual Setup

1. **Install root dependencies**
   ```bash
   npm install
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Configure environment**
   ```bash
   # Create .env file in backend folder
   copy backend\.env.example backend\.env
   
   # Edit backend/.env and replace:
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

5. **Start development servers**
   ```bash
   # Option 1: Start both servers together
   npm run dev
   
   # Option 2: Start servers separately
   # Terminal 1 (Backend)
   cd backend && npm run dev
   
   # Terminal 2 (Frontend)
   cd frontend && npm run dev
   ```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000 (shows available endpoints)

## Test the Chatbot

Try these sample messages:
- "Track my order ORD-12345"
- "Tell me about wireless headphones"
- "How do I return an item?"
- "What are your shipping options?"

## Troubleshooting

### Common Issues

1. **Node.js not found**
   - Install Node.js from nodejs.org
   - Restart your terminal after installation

2. **OpenAI API Error**
   - Check your API key in backend/.env
   - Ensure you have credits in your OpenAI account
   - Verify the key starts with "sk-"

3. **Port already in use**
   - Kill existing processes: `npx kill-port 3000 5000`
   - Or use different ports in package.json

4. **CORS errors**
   - Ensure both frontend and backend are running
   - Check proxy configuration in vite.config.js

### Verify Setup

Check if everything is working:
```bash
# Check Node.js
node --version

# Check if servers are running
curl http://localhost:5000
curl http://localhost:3000
```

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy 'dist' folder
```

### Backend (Heroku/Railway)
```bash
# Add start script to backend/package.json
# Set OPENAI_API_KEY environment variable
# Deploy backend folder
```

## Demo Video Creation

For your job application, record a demo showing:
1. ✅ Opening the application
2. ✅ Tracking an order (ORD-12345)
3. ✅ Asking about products
4. ✅ Getting return information
5. ✅ Showing the responsive design

**Perfect for showcasing your full-stack AI development skills!** 🎯
