import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Package, RotateCcw, HelpCircle } from 'lucide-react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m here to help you with your TechStore orders, returns, and any questions you might have. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const response = await axios.post('/api/chat', {
        message: messageText.trim(),
        conversationHistory
      });

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setError(
        error.response?.data?.error || 
        'Sorry, I encountered an error. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
    const quickMessages = {
      track: "I'd like to track my order ORD-12345",
      return: "How do I return an item?",
      shipping: "What are your shipping options?",
      product: "Tell me about wireless headphones"
    };
    
    handleSendMessage(quickMessages[action]);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1>TechStore Customer Support</h1>
        <p>Get instant help with orders, returns, and product questions</p>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Info Panel */}
        <aside className="info-panel">
          <h2>How I Can Help</h2>
          
          <div className="info-section">
            <h3>📦 Order Support</h3>
            <ul>
              <li>Track your orders (use order ID like ORD-12345)</li>
              <li>Check delivery status</li>
              <li>Update shipping address</li>
              <li>Cancel or modify orders</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>🔄 Returns & Refunds</h3>
            <ul>
              <li>30-day return policy</li>
              <li>Return process guidance</li>
              <li>Refund status updates</li>
              <li>Exchange options</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>🛍️ Product Help</h3>
            <ul>
              <li>Product recommendations</li>
              <li>Pricing information</li>
              <li>Stock availability</li>
              <li>Technical specifications</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>💬 Sample Questions</h3>
            <ul>
              <li>"Track order ORD-12345"</li>
              <li>"Tell me about wireless headphones"</li>
              <li>"How do I return an item?"</li>
              <li>"What are shipping costs?"</li>
            </ul>
          </div>
        </aside>

        {/* Chat Interface */}
        <section className="chat-container">
          {/* Chat Header */}
          <div className="chat-header">
            <MessageCircle size={20} />
            <h3>Live Support Chat</h3>
            <div className="status-dot"></div>
          </div>

          {/* Messages */}
          <div className="messages-container">
            {/* Quick Actions */}
            <div className="quick-actions">
              <button 
                className="quick-action" 
                onClick={() => handleQuickAction('track')}
                disabled={isLoading}
              >
                <Package size={14} style={{marginRight: '0.5rem'}} />
                Track Order
              </button>
              <button 
                className="quick-action" 
                onClick={() => handleQuickAction('return')}
                disabled={isLoading}
              >
                <RotateCcw size={14} style={{marginRight: '0.5rem'}} />
                Returns
              </button>
              <button 
                className="quick-action" 
                onClick={() => handleQuickAction('shipping')}
                disabled={isLoading}
              >
                <HelpCircle size={14} style={{marginRight: '0.5rem'}} />
                Shipping Info
              </button>
              <button 
                className="quick-action" 
                onClick={() => handleQuickAction('product')}
                disabled={isLoading}
              >
                Products
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Message List */}
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'user' ? 'U' : 'AI'}
                </div>
                <div>
                  <div className="message-content">
                    {message.content}
                  </div>
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="typing-indicator">
                <div className="message-avatar">AI</div>
                <div className="typing-content">
                  <span>AI is typing</span>
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="input-area">
            <div className="input-container">
              <textarea
                ref={textareaRef}
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about orders, returns, products..."
                rows={1}
                disabled={isLoading}
              />
              <button
                className="send-button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
