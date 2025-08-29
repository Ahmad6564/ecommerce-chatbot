# 🤖 E-commerce Customer Support Chatbot

A full-stack AI-powered customer support chatbot for e-commerce, built with React, Node.js, and GPT-4 integration.

![Chatbot Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=Customer+Support+Chatbot)

## 🌟 Features

### 🎯 Core Functionality
- **Real-time Chat Interface** - Modern, responsive chat UI
- **GPT-4 Integration** - Natural language processing for customer queries
- **Order Tracking** - Track orders by ID or email
- **Product Information** - Get details about products and pricing
- **Returns & Refunds** - Guidance on return policies and processes
- **FAQ Support** - Instant answers to common questions

### 🛠️ Technical Features
- **Full-stack Architecture** - React frontend + Node.js backend
- **API Integration** - RESTful APIs with proper error handling
- **Rate Limiting** - Protection against API abuse
- **Responsive Design** - Works on desktop and mobile
- **Real-time Typing Indicators** - Enhanced user experience
- **Conversation Memory** - Context-aware responses

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- OpenAI API key

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd chatbot
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   copy backend\.env.example backend\.env
   
   # Edit backend/.env and add your OpenAI API key
   OPENAI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

5. **Open the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
chatbot/
├── frontend/                 # React application
│   ├── src/
│   │   ├── App.jsx          # Main chat interface
│   │   ├── index.css        # Styling
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js server
│   ├── server.js            # Express server with GPT-4 integration
│   ├── package.json
│   └── .env.example         # Environment variables template
├── package.json             # Root package.json with scripts
└── README.md
```

## 🎭 Demo Scenarios

Try these example interactions:

### 📦 Order Tracking
```
User: "Track my order ORD-12345"
Bot: "Order ORD-12345 is currently shipped. Items: Wireless Headphones, Phone Case..."
```

### 🛍️ Product Inquiries
```
User: "Tell me about wireless headphones"
Bot: "Our Wireless Headphones are $99.99, featuring high-quality sound with noise cancellation..."
```

### 🔄 Returns
```
User: "How do I return an item?"
Bot: "We offer 30-day returns for all items in original condition. Here's how to start a return..."
```

## 🔧 API Endpoints

### Chat Endpoint
- **POST** `/api/chat`
  - Send messages and get AI responses
  - Includes conversation history for context

### Data Endpoints
- **GET** `/api/orders/:id` - Get order details
- **GET** `/api/products` - List all products
- **GET** `/api/faqs` - Get frequently asked questions

## 🎨 UI Features

- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Works on all device sizes
- **Quick Actions** - Pre-defined buttons for common queries
- **Typing Indicators** - Shows when AI is responding
- **Message Timestamps** - Track conversation timeline
- **Error Handling** - User-friendly error messages

## 🧠 AI Capabilities

The chatbot is trained to handle:
- Order status and tracking inquiries
- Product recommendations and information
- Return and refund processes
- Shipping and delivery questions
- General customer service queries
- Context-aware follow-up questions

## 🔒 Security & Performance

- **Rate Limiting** - Prevents API abuse
- **Environment Variables** - Secure API key management
- **Error Handling** - Graceful failure modes
- **CORS Configuration** - Secure cross-origin requests

## 📊 Mock Data

The application includes realistic mock data:
- **Orders**: Sample order data with different statuses
- **Products**: Product catalog with pricing and descriptions
- **FAQs**: Common customer questions and answers

## 🚀 Deployment Ready

The application is configured for easy deployment:
- **Frontend**: Can be deployed to Vercel, Netlify, or any static hosting
- **Backend**: Ready for deployment to Heroku, AWS, or any Node.js hosting
- **Environment**: Configured for development and production environments

## 📝 Customization

Easy to customize for different businesses:
- Update mock data in `backend/server.js`
- Modify the system prompt for different industries
- Customize UI colors and branding in `frontend/src/index.css`
- Add new API endpoints for additional functionality

## 🤝 Contributing

This is a demonstration project for job application purposes. The codebase follows best practices and is ready for production use with real data integration.

## 📄 License

MIT License - feel free to use this code for your own projects.

---

**Built with ❤️ for the Full Stack AI Engineer position**

*This chatbot demonstrates real-world full-stack development skills, AI integration, and user experience design.*
