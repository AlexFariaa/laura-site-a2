import React, { useEffect, useState } from 'react';
import { Bot, User, CheckCheck, Send } from 'lucide-react';

export const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<Array<{id: number, type: 'bot' | 'user', text: string}>>([]);
  
  const sequence = [
    { type: 'user', text: "Olá, gostaria de agendar uma consulta para amanhã." },
    { type: 'bot', text: "Olá! Aqui é a Laura, assistente virtual da Clínica. 👋 Terei prazer em ajudar." },
    { type: 'bot', text: "Para amanhã, tenho horários às 14:00 e às 16:30 com a Dra. Ana. Algum desses funciona para você?" },
    { type: 'user', text: "Pode ser às 16:30." },
    { type: 'bot', text: "Perfeito! Horário pré-reservado. 😊" },
    { type: 'bot', text: "Para confirmar, preciso apenas do seu nome completo e se é sua primeira vez aqui." }
  ];

  useEffect(() => {
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];
    
    // Reset and start animation loop
    const runAnimation = () => {
      setMessages([]);
      let currentTime = 0;

      sequence.forEach((msg, index) => {
        const delay = msg.type === 'user' ? 1500 : 2500;
        currentTime += delay;
        
        const timeoutId = setTimeout(() => {
          setMessages(prev => [...prev, { id: index, type: msg.type as 'bot' | 'user', text: msg.text }]);
        }, currentTime);
        
        timeoutIds.push(timeoutId);
      });

      // Restart loop
      const resetId = setTimeout(() => {
        runAnimation();
      }, currentTime + 4000);
      timeoutIds.push(resetId);
    };

    runAnimation();

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden border-8 border-slate-900 aspect-[9/18]">
      {/* Phone Header */}
      <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Laura (IA)</h3>
          <p className="text-xs opacity-80">Online agora</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-[#E5DDD5] h-full p-4 overflow-hidden flex flex-col gap-3 pb-20 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`max-w-[85%] p-2.5 rounded-lg text-sm shadow-sm relative animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              msg.type === 'user' 
                ? 'bg-[#DCF8C6] self-end rounded-tr-none text-slate-800' 
                : 'bg-white self-start rounded-tl-none text-slate-800'
            }`}
          >
            {msg.text}
            <div className="flex justify-end mt-1">
              <span className="text-[10px] text-gray-500 flex items-center gap-1">
                10:0{msg.id + 1}
                {msg.type === 'user' && <CheckCheck size={12} className="text-blue-500" />}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area (Visual only) */}
      <div className="absolute bottom-0 w-full bg-[#F0F2F5] p-2 px-3 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full h-9 px-4 flex items-center text-gray-400 text-xs shadow-sm">
          Digite uma mensagem...
        </div>
        <div className="w-10 h-10 bg-[#008069] rounded-full flex items-center justify-center text-white shadow-sm">
          <Send size={18} />
        </div>
      </div>
    </div>
  );
};