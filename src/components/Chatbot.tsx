
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Olá! Sou o JuristAssist, seu assistente jurídico virtual. Como posso ajudar hoje?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Entendo sua dúvida. Com base na legislação atual, posso informar que...",
        "Esta é uma questão interessante. De acordo com o artigo 5º da Constituição Federal...",
        "Para responder adequadamente, preciso de algumas informações adicionais. Poderia especificar melhor?",
        "Analisando sua pergunta, posso sugerir as seguintes alternativas legais...",
        "Esta situação está prevista no Código Civil. Segundo o artigo 393..."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="glass-card h-[500px] max-h-[70vh] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border/30 bg-background/50">
        <h3 className="text-lg font-medium">Assistente Jurídico</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-scale-in`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-3 ${
                message.isBot
                  ? 'bg-secondary text-foreground'
                  : 'bg-jurist-600 text-white'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className={`text-xs mt-1 ${message.isBot ? 'text-muted-foreground' : 'text-white/70'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary text-foreground max-w-[80%] rounded-xl p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSend} className="p-4 border-t border-border/30 bg-background/50">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className={`p-2 rounded-lg ${
              input.trim()
                ? 'bg-jurist-600 text-white hover:bg-jurist-700'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            } button-transition`}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
