import { useState, useRef, useEffect } from 'react';
import { Send, BarChart2, Cpu, Loader2, RefreshCw, ArrowRight, Pill } from 'lucide-react';

// Main Dashboard Component
export default function AnalyticsChatbot() {
  const [messages, setMessages] = useState([
    { 
      content: "Welcome to AnalytiX AI. Ask me anything about your data or get insights on analytics trends.", 
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visualMode, setVisualMode] = useState('chat'); // 'chat' or 'insights'
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Simulate API call to your Python backend
  const callChatbotAPI = async (userInput) => {
    setIsLoading(true);
    
    // Here you would replace this with your actual API call
    try {
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example responses based on input (replace with actual API integration)
      let botResponse;
      
      if (userInput.toLowerCase().includes('sales')) {
        botResponse = "Sales have increased by 24% compared to last quarter. Top performing regions are West (32%) and North (29%).";
      } else if (userInput.toLowerCase().includes('trend')) {
        botResponse = "Current trends show increasing adoption of predictive analytics and real-time data processing. Would you like me to generate a forecast based on your historical data?";
      } else if (userInput.toLowerCase().includes('insight')) {
        botResponse = "Based on your recent data, customer retention could be improved by focusing on the 25-34 demographic. They show high acquisition but low retention rates.";
      } else {
        botResponse = "I've analyzed your query. To provide more specific insights, could you specify which metrics or dimensions you're most interested in?";
      }
      
      setMessages(prev => [
        ...prev, 
        { content: botResponse, sender: 'bot', timestamp: new Date() }
      ]);
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      setMessages(prev => [
        ...prev, 
        { content: "Sorry, I encountered an error processing your request. Please try again.", sender: 'bot', timestamp: new Date() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage = { content: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input;
    setInput('');
    
    // Call API with user input
    await callChatbotAPI(currentInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
      e.preventDefault();
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-blue-100 text-gray-800">
      {/* Header */}
      <header className="border-b border-blue-900 bg-blue-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pill className="text-orange-500" />
            <h1 className="text-xl font-bold bg-orange-500 bg-clip-text text-transparent">
              OptAnalyst AI
            </h1>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setVisualMode('chat')} 
              className={`px-3 py-1 rounded-lg text-sm ${visualMode === 'chat' ? 'bg-orange-500' : 'bg-blue-300 hover:bg-gray-600'}`}>
              Chat
            </button>
            <button 
              onClick={() => setVisualMode('insights')} 
              className={`px-3 py-1 rounded-lg text-sm ${visualMode === 'insights' ? 'bg-orange-500' : 'bg-blue-300 hover:bg-gray-600'}`}>
              Insights
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-64 bg-blue-100 border-r border-blue-900 p-4 hidden md:block">
          {/* <h2 className="text-sm font-medium text-gray-400 mb-4">QUICK INSIGHTS</h2>
          
          <div className="space-y-4">
            <button className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors text-left">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-sm">Monthly Performance</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors text-left">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span className="text-sm">User Demographics</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors text-left">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="text-sm">Conversion Rates</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors text-left">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-sm">Growth Trends</span>
            </button>
          </div> */}
          
          <h2 className="text-sm font-medium text-blue-900 mt-8 mb-4">SUGGESTED QUERIES</h2>
          
          <div className="space-y-2">
            <button 
              onClick={() => {
                setInput("What are the current sales trends?");
                setTimeout(() => handleSubmit(), 100);
              }}
              className="w-full p-2 bg-blue-300 rounded-lg hover:bg-blue-200 transition-colors text-left text-sm flex items-center">
              <span>What are the current sales trends?</span>
              <ArrowRight size={14} className="ml-auto text-white-400" />
            </button>
            
            <button 
              onClick={() => {
                setInput("Give me insights on user retention");
                setTimeout(() => handleSubmit(), 100);
              }}
              className="w-full p-2 bg-blue-300 rounded-lg hover:bg-blue-200 transition-colors text-left text-sm flex items-center">
              <span>Give me insights on user retention</span>
              <ArrowRight size={14} className="ml-auto text-white-400" />
            </button>
            
            <button 
              onClick={() => {
                setInput("Compare this month vs last month");
                setTimeout(() => handleSubmit(), 100);
              }}
              className="w-full p-2 bg-blue-300 rounded-lg hover:bg-blue-200 transition-colors text-left text-sm flex items-center">
              <span>Compare this month vs last month</span>
              <ArrowRight size={14} className="ml-auto text-white-400" />
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Chat/Insights Display */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {visualMode === 'chat' ? (
              // Chat Messages
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-3xl rounded-2xl px-4 py-3 ${
                      msg.sender === 'user' 
                        ? 'bg-blue-300 text-blue' 
                        : 'bg-blue-900 text-white'
                    }`}
                  >
                    <div className="text-sm mb-1">{msg.content}</div>
                    <div className="text-xs text-blue-900 text-right">{formatTime(msg.timestamp)}</div>
                  </div>
                </div>
              ))
            ) : (
              // Insights View (placeholder for custom visualizations)
              <div className="bg-blue-300 rounded-lg p-6 h-full">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Pill className="mr-2 text-blue-800" />
                  Interactive Analytics Dashboard
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Metrics Cards */}
                  {/* <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-gray-400 text-sm mb-2">MONTHLY ACTIVE USERS</h3>
                    <div className="text-2xl font-bold">24,892</div>
                    <div className="text-green-400 text-sm">+12.5% vs Last Month</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-gray-400 text-sm mb-2">CONVERSION RATE</h3>
                    <div className="text-2xl font-bold">3.8%</div>
                    <div className="text-red-400 text-sm">-0.5% vs Last Month</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-gray-400 text-sm mb-2">AVG. SESSION DURATION</h3>
                    <div className="text-2xl font-bold">4m 32s</div>
                    <div className="text-green-400 text-sm">+0:42 vs Last Month</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-gray-400 text-sm mb-2">BOUNCE RATE</h3>
                    <div className="text-2xl font-bold">42.1%</div>
                    <div className="text-gray-400 text-sm">-0.3% vs Last Month</div>
                  </div> */}
                </div>
                
                <div className="mt-6 bg-gray-700 rounded-lg p-4 flex items-center justify-center h-64">
                  <div className="text-center">
                    <Cpu size={48} className="mx-auto mb-4 text-blue-400 opacity-50" />
                    <p className="text-white">Interactive charts would display here</p>
                    <p className="text-white text-sm mt-2">Ask a question in the chat to generate insights</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                ref={inputRef}
                className="flex-1 bg-blue-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent placeholder:text-white"
                placeholder="Ask anything..."
                disabled={isLoading}
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-blue-300 hover:bg-blue-400 rounded-r-lg px-4 py-3 flex items-center justify-center transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
            
            {isLoading && (
              <div className="mt-2 text-xs text-blue-500 flex items-center">
                <RefreshCw className="animate-spin mr-1" size={12} />
                Processing your request...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}