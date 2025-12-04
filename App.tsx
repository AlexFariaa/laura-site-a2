import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  Menu, 
  X, 
  CalendarCheck,
  Zap,
  ChevronDown,
  Home,
  HelpCircle,
  Star,
  Cpu
} from 'lucide-react';
import { Reveal } from './components/Reveal';
import { ChatDemo } from './components/ChatDemo';

// --- Configuration ---

const WhatsAppLink = "https://wa.me/5511994791869";

// --- Components ---

interface ButtonProps {
  children: React.ReactNode; 
  variant?: 'primary' | 'outline' | 'white' | 'icon'; 
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  href?: string;
  target?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', onClick, fullWidth, href, target }) => {
  const base = "font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2 active:scale-95 cursor-pointer";
  
  const variants = {
    primary: "py-3 px-6 bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:shadow-xl",
    outline: "py-3 px-6 border-2 border-brand-600 text-brand-600 hover:bg-brand-50",
    white: "py-3 px-6 bg-white text-brand-900 hover:bg-gray-100 shadow-lg",
    icon: "p-2 hover:bg-slate-100 text-slate-500 hover:text-brand-600"
  };

  const classes = `${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={target === '_blank' ? "noopener noreferrer" : undefined}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
};

const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-slate-900">
    <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
      <Zap size={20} fill="currentColor" />
    </div>
    Laura
  </div>
);

// --- Sections ---

const Navbar = ({ isVisible }: { isVisible: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#funciona" className="text-slate-600 hover:text-brand-600 font-medium text-sm transition-colors">Como funciona</a>
            <a href="#beneficios" className="text-slate-600 hover:text-brand-600 font-medium text-sm transition-colors">Benefícios</a>
            <a href="#faq" className="text-slate-600 hover:text-brand-600 font-medium text-sm transition-colors">Dúvidas</a>
            <Button href={WhatsAppLink} target="_blank" className="py-2 px-5 text-sm">Agendar Demo</Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Only visible when at top) */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a onClick={() => setIsOpen(false)} href="#funciona" className="block px-3 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Como funciona</a>
            <a onClick={() => setIsOpen(false)} href="#beneficios" className="block px-3 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Benefícios</a>
            <a onClick={() => setIsOpen(false)} href="#faq" className="block px-3 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Dúvidas</a>
            <div className="pt-2">
              <Button fullWidth href={WhatsAppLink} target="_blank">Falar no WhatsApp</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const BottomNav = ({ isVisible }: { isVisible: boolean }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'}`}>
      <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-slate-900/10 rounded-2xl p-2 flex items-center justify-between px-4 ring-1 ring-slate-200">
        <button onClick={() => scrollTo('root')} className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-brand-600 transition-colors">
          <Home size={20} />
          <span className="text-[10px] font-medium">Início</span>
        </button>
        <button onClick={() => scrollTo('funciona')} className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-brand-600 transition-colors">
          <Cpu size={20} />
          <span className="text-[10px] font-medium">Laura</span>
        </button>
        <button onClick={() => scrollTo('beneficios')} className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-brand-600 transition-colors">
          <Star size={20} />
          <span className="text-[10px] font-medium">Vantagens</span>
        </button>
        <a href={WhatsAppLink} target="_blank" rel="noopener noreferrer" className="bg-brand-600 hover:bg-brand-500 text-white rounded-xl p-3 shadow-lg shadow-brand-500/30 transition-all active:scale-95 flex items-center justify-center">
          <MessageSquare size={20} fill="currentColor" className="text-white" />
        </a>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-brand-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-6 border border-brand-100">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                IA Especialista em Saúde
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Sua clínica perde chamadas? <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">A Laura não.</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                Automatize agendamentos, triagem e confirmações pelo WhatsApp. Transforme leads em pacientes sem sobrecarregar sua recepção.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href={WhatsAppLink} target="_blank" className="text-lg px-8">
                  Contratar a Laura <ArrowRight size={20} />
                </Button>
                <Button variant="outline" onClick={() => document.getElementById('funciona')?.scrollIntoView({behavior: 'smooth'})} className="text-lg px-8">
                  Ver como funciona
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${i+50}/100`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p>Usada por +200 profissionais</p>
              </div>
            </Reveal>
          </div>

          <div className="relative z-10 flex justify-center lg:justify-end mt-10 lg:mt-0">
             {/* Tech Rings Effect behind phone */}
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent rounded-full blur-2xl transform scale-90"></div>
             <div className="animate-float">
               <ChatDemo />
             </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-300">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

const FeatureItem: React.FC<{icon: React.ElementType, title: string, description: string}> = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 group">
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section id="funciona" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Mais que um chatbot. <br/>Uma assistente proativa.</h2>
            <p className="text-lg text-slate-600">A Laura entende contexto, gerencia sua agenda em tempo real e trata seus pacientes com empatia.</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Reveal delay={100}>
            <FeatureItem 
              icon={CalendarCheck}
              title="Agendamento Inteligente"
              description="A Laura acessa sua agenda, oferece horários livres e realiza a marcação instantaneamente, sem conflitos."
            />
          </Reveal>
          <Reveal delay={200}>
            <FeatureItem 
              icon={Smartphone}
              title="Lembretes Automáticos"
              description="Reduza o 'no-show'. A Laura envia confirmações 24h antes e reagenda caso o paciente não possa comparecer."
            />
          </Reveal>
          <Reveal delay={300}>
            <FeatureItem 
              icon={ShieldCheck}
              title="Triagem Personalizada"
              description="Configure perguntas essenciais. A Laura filtra convênios, sintomas e procedimentos antes de agendar."
            />
          </Reveal>
          <Reveal delay={400}>
            <FeatureItem 
              icon={MessageSquare}
              title="Tira-Dúvidas 24/7"
              description="Preço da consulta? Endereço? Preparo para exames? Ela responde tudo instantaneamente, a qualquer hora."
            />
          </Reveal>
          <Reveal delay={500}>
            <FeatureItem 
              icon={Clock}
              title="Recuperação de Leads"
              description="Paciente parou de responder? A Laura retoma o contato de forma gentil para tentar concluir o agendamento."
            />
          </Reveal>
          <Reveal delay={600}>
            <FeatureItem 
              icon={CheckCircle2}
              title="Integração Simples"
              description="Funciona diretamente no WhatsApp da sua clínica. Sem necessidade de baixar novos aplicativos."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  return (
    <section id="beneficios" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-[128px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-[128px] opacity-20"></div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Por que clínicas modernas escolhem a Laura?</h2>
            <p className="text-slate-300 text-lg mb-8">
              O modelo tradicional de secretariado tem falhas humanas naturais. A Laura complementa sua equipe, cuidando do repetitivo para que elas cuidem do acolhimento presencial.
            </p>
            
            <div className="space-y-6">
              {[
                { label: "Tempo de resposta", human: "10 min a 4 horas", laura: "Imediato (< 2 seg)" },
                { label: "Disponibilidade", human: "Horário comercial", laura: "24 horas / 7 dias" },
                { label: "Capacidade", human: "1 paciente por vez", laura: "Ilimitada simultaneamente" },
                { label: "Custo Operacional", human: "Alto (Salário + encargos)", laura: "Fixo e acessível" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4 border-b border-slate-800 pb-4 last:border-0">
                  {/* Label */}
                  <div className="font-medium text-brand-200/80 text-sm md:text-base uppercase tracking-wider md:normal-case md:tracking-normal md:text-slate-400">
                    {item.label}
                  </div>
                  
                  {/* Values Container */}
                  <div className="flex justify-between items-center md:contents">
                    <div className="text-slate-500 text-base md:text-base w-1/2 md:w-auto pr-2 border-r border-slate-800/50 md:border-0">
                      {item.human}
                    </div>
                    <div className="text-brand-400 font-bold flex items-center justify-end md:justify-start gap-2 text-base md:text-base w-1/2 md:w-auto pl-2 md:pl-0">
                      <CheckCircle2 size={18} className="shrink-0" /> 
                      <span className="break-words">{item.laura}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button variant="white" href={WhatsAppLink} target="_blank">
                Quero modernizar minha clínica
              </Button>
            </div>
          </Reveal>

          <Reveal direction="left" delay={300} className="relative hidden lg:block">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 relative z-10">
              <div className="flex items-center gap-4 mb-6">
                 <img src="https://picsum.photos/seed/doc1/64" alt="Doctor" className="w-16 h-16 rounded-full border-2 border-brand-500" />
                 <div>
                   <h4 className="font-bold text-lg">Dr. Ricardo Mendes</h4>
                   <p className="text-slate-400 text-sm">Cardiologista</p>
                 </div>
              </div>
              <p className="text-slate-300 italic text-lg leading-relaxed">
                "Antes da Laura, minha secretária passava 80% do tempo no WhatsApp respondendo as mesmas perguntas. Hoje, ela foca em receber bem os pacientes na recepção, e minha agenda está sempre cheia, inclusive com marcações feitas no domingo à noite."
              </p>
              <div className="mt-6 flex gap-1 text-yellow-400">
                {[1,2,3,4,5].map(i => <div key={i}>★</div>)}
              </div>
            </div>
            {/* Decor element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-slate-700 rounded-2xl"></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "A Laura substitui minha secretária?", a: "Não, ela empodera sua secretária. A Laura cuida do volume repetitivo (agendamento, dúvidas básicas), liberando sua equipe humana para tarefas complexas, acolhimento presencial e gestão da clínica." },
    { q: "Ela se integra com meu sistema de agenda?", a: "Sim! A Laura possui integração com as principais agendas digitais (Google Calendar, e sistemas médicos populares). Caso não tenhamos integração nativa, nossa equipe avalia a viabilidade." },
    { q: "O que acontece se a IA não souber responder?", a: "A Laura é programada para identificar quando não sabe algo. Nesses casos, ela transborda o atendimento para um humano da sua equipe de forma transparente." },
    { q: "É difícil de configurar?", a: "Zero complexidade para você. Nossa equipe faz toda a configuração inicial, treina a IA com suas regras de negócio e entrega pronta para uso." }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Dúvidas Frequentes</h2>
          <p className="text-slate-600">Entenda tudo antes de contratar.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{item.q}</span>
                  <span className={`transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown className="text-slate-400" />
                  </span>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 py-12 pb-32 md:pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <Logo />
      <div className="text-slate-500 text-sm text-center md:text-right">
        <p>&copy; {new Date().getFullYear()} Laura AI. Todos os direitos reservados.</p>
        <p className="mt-1">Feito para profissionais da saúde exigentes.</p>
      </div>
    </div>
  </footer>
);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-200 selection:text-brand-900">
      <Navbar isVisible={!isScrolled} />
      <BottomNav isVisible={isScrolled} />
      
      <main id="root">
        <Hero />
        <Features />
        <Comparison />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;