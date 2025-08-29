const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Mock e-commerce data
const mockData = {
  orders: [
    {
      id: "ORD-12345",
      customerEmail: "john@example.com",
      status: "shipped",
      items: ["Wireless Headphones", "Phone Case"],
      total: 129.99,
      trackingNumber: "TRK789456123",
      estimatedDelivery: "2025-08-30"
    },
    {
      id: "ORD-67890",
      customerEmail: "jane@example.com",
      status: "processing",
      items: ["Laptop Stand", "USB Cable"],
      total: 85.50,
      trackingNumber: null,
      estimatedDelivery: "2025-09-02"
    }
  ],
  products: [
    {
      id: "PROD-001",
      name: "Wireless Headphones",
      price: 99.99,
      category: "Electronics",
      inStock: true,
      description: "High-quality wireless headphones with noise cancellation"
    },
    {
      id: "PROD-002",
      name: "Phone Case",
      price: 29.99,
      category: "Accessories",
      inStock: true,
      description: "Protective phone case with drop protection"
    }
  ],
  faqs: [
    {
      question: "What is your return policy?",
      answer: "We offer 30-day returns for all items in original condition."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days, express shipping 1-2 days."
    }
  ]
};

// System prompt for the chatbot
const systemPrompt = `You are a helpful customer support chatbot for "TechStore", an e-commerce website. 

Your capabilities include:
1. Order tracking and status updates
2. Product information and recommendations
3. Return and refund assistance
4. General customer service inquiries
5. Shipping information

Guidelines:
- Be friendly, professional, and helpful
- Always ask for order ID or email when helping with orders
- Provide specific, actionable information
- If you can't help with something, politely explain and suggest contacting human support
- Keep responses concise but informative
- Use the provided mock data to give realistic responses

Available mock data includes orders, products, and FAQs. Use this data to provide realistic responses.`;

// Helper functions
function findOrderByIdOrEmail(identifier) {
  return mockData.orders.find(order => 
    order.id.toLowerCase() === identifier.toLowerCase() || 
    order.customerEmail.toLowerCase() === identifier.toLowerCase()
  );
}

function findProductByName(name) {
  return mockData.products.find(product => 
    product.name.toLowerCase().includes(name.toLowerCase())
  );
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce Chatbot API is running!',
    endpoints: {
      chat: 'POST /api/chat',
      orders: 'GET /api/orders/:id',
      products: 'GET /api/products'
    }
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file' 
      });
    }

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Check if message is about order tracking
    const orderMatch = message.match(/(?:order|tracking|track).*?(ORD-\d+|\w+@\w+\.\w+)/i);
    if (orderMatch) {
      const identifier = orderMatch[1];
      const order = findOrderByIdOrEmail(identifier);
      
      if (order) {
        const orderInfo = `Order ${order.id}: Status is "${order.status}". Items: ${order.items.join(', ')}. Total: $${order.total}. ${order.trackingNumber ? `Tracking: ${order.trackingNumber}` : 'No tracking number yet'}. Estimated delivery: ${order.estimatedDelivery}`;
        messages.push({ role: 'system', content: `Use this order information: ${orderInfo}` });
      }
    }

    // Check if message is about products
    const productMatch = message.match(/(?:product|item|buy|purchase|price).*?([a-zA-Z\s]+)/i);
    if (productMatch) {
      const productName = productMatch[1].trim();
      const product = findProductByName(productName);
      
      if (product) {
        const productInfo = `Product: ${product.name}, Price: $${product.price}, Category: ${product.category}, In Stock: ${product.inStock}, Description: ${product.description}`;
        messages.push({ role: 'system', content: `Use this product information: ${productInfo}` });
      }
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      max_tokens: 300,
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content;

    res.json({ 
      reply,
      conversationId: req.body.conversationId || 'default'
    });

  } catch (error) {
    console.error('Chat error:', error);
    
    if (error.code === 'insufficient_quota') {
      res.status(500).json({ 
        error: 'OpenAI API quota exceeded. Please check your OpenAI account.' 
      });
    } else if (error.code === 'invalid_api_key') {
      res.status(500).json({ 
        error: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY in .env file.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Sorry, I encountered an error. Please try again later.' 
      });
    }
  }
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = findOrderByIdOrEmail(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(mockData.products);
});

// Get FAQs
app.get('/api/faqs', (req, res) => {
  res.json(mockData.faqs);
});

app.listen(PORT, () => {
  console.log(`🚀 Chatbot server running on port ${PORT}`);
  console.log(`📱 API available at http://localhost:${PORT}`);
  
  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️  Warning: OPENAI_API_KEY not set. Please add it to your .env file');
  }
});
