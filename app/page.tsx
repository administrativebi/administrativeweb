'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Utensils, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  BarChart3,
  CheckCircle2,
  X
} from 'lucide-react';
import { trackClick } from '../lib/supabaseClient';
import { ASSETS } from '../lib/assets';
import IERSection from './components/IERSection';

// --- DATA & COPY ---

const SYSTEMS = [
  {
    id: 'financeiro',
    title: '1 — DOMINÂNCIA FINANCEIRA',
    description: 'Controle absoluto da saúde financeira do restaurante. Implementamos engenharia de DRE, auditoria de custos e controle de CMV.',
    points: ['Engenharia de DRE', 'Auditoria de custos', 'Controle de CMV', 'Leitura estratégica', 'Protocolos de margem'],
    goal: 'Reter o máximo lucro na operação.',
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
  },
  {
    id: 'pessoas',
    title: '2 — ENGENHARIA DE EQUIPE',
    description: 'Equipe não é custo. Equipe é sistema de produção de resultado. Estruturamos liderança e disciplina científica.',
    points: ['Liderança operacional', 'Protocolos de disciplina', 'Treinamento de performance', 'Estrutura de funções'],
    goal: 'Transformar equipe em operadores de eficiência.',
    icon: <Users className="w-6 h-6 text-blue-500" />,
  },
  {
    id: 'produto',
    title: '3 — ENGENHARIA DE CARDÁPIO',
    description: 'Cardápio é o principal motor de lucro. Analisamos margem por prato, engenharia de vendas e desperdício.',
    points: ['Margem por prato', 'Engenharia de vendas', 'Desperdício zero', 'Estrutura de produção'],
    goal: 'Maximizar lucro por prato.',
    icon: <Utensils className="w-6 h-6 text-blue-500" />,
  },
  {
    id: 'vendas',
    title: '4 — MÁQUINA DE AQUISIÇÃO',
    description: 'Não basta vender. É preciso vender com previsibilidade. Implementamos funis de marketing orientados por dados.',
    points: ['Aquisição estratégica', 'Funis de marketing', 'Campanhas por dados', 'Análise de retorno real'],
    goal: 'Crescer faturamento com ROI controlado.',
    icon: <Zap className="w-6 h-6 text-blue-500" />,
  },
  {
    id: 'operacoes',
    title: '5 — BLINDAGEM OPERACIONAL',
    description: 'Restaurantes quebram quando dependem de pessoas. Criamos checklists vivos e processos padronizados.',
    points: ['Checklists vivos', 'Processos padronizados', 'Auditoria operacional', 'Cultura de execução'],
    goal: 'Garantir operação livre do dono.',
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
  },
];

const ROADMAP = [
  { day: 'Dia 7', title: 'Instalação da Telemetria', desc: 'Instalação da telemetria de dados e leitura completa da operação.' },
  { day: 'Dia 15', title: 'Identificação de Vazamentos', desc: 'Identificação dos principais vazamentos de margem.' },
  { day: 'Dia 25', title: 'Intervenção Direta', desc: 'Intervenção direta em processos críticos e equipe.' },
  { day: 'Dia 30', title: 'Estado de Eficiência', desc: 'Primeiro estado de eficiência estabilizado.' },
];

const LOGO_VERSION = 'v=1.1';

export default function AdministrativeLanding() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const handleCTA = (id: string, section: string) => {
    trackClick(id, section);
    // Scroll to IERSection
    const ierSection = document.getElementById('ier-diagnostico');
    if (ierSection) {
      ierSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500 selection:text-white overflow-x-hidden pt-16">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/60 backdrop-blur-xl px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={`${ASSETS.LOGO_HORIZONTAL}?${LOGO_VERSION}`} alt="Administrative Logo" className="h-6 md:h-8 w-auto object-contain" />
          <div className="hidden md:flex gap-6 text-[10px] font-mono uppercase tracking-widest text-gray-400">
            <a href="#metodologia" className="hover:text-blue-500 transition-colors">Metodologia</a>
            <a href="#solucao" className="hover:text-blue-500 transition-colors">Solução</a>
          </div>
          <button 
            onClick={() => handleCTA('navbar-cta', 'navbar')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase rounded transition-all"
          >
            Diagnóstico
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-start px-4 md:px-16 overflow-hidden border-b border-white/5 pb-20">
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 767px)" srcSet={ASSETS.HERO_MOBILE} />
            <img 
              src={ASSETS.HERO_DESKTOP} 
              alt="Administrative Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
            />
          </picture>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent z-[1]"
        />
        
        <div className="max-w-3xl z-10 text-left relative mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-6">
              Seu restaurante não precisa de mais esforço.<br />
              <span className="text-blue-500 italic">Precisa de Performance.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-xl mb-8 font-medium leading-tight border-l-2 border-blue-600 pl-4">
              A Administrative instala no seu restaurante um escritório de performance para aumentar margem, eficiência e previsibilidade.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleCTA('hero-cta', 'hero')}
                className="w-fit px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-sm uppercase transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                Diagnosticar Operação <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-blue-400 font-mono text-[10px] uppercase tracking-widest animate-pulse">
                {">>>"} Descubra onde sua operação perde dinheiro.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. DIAGNÓSTICO IER (MOVED HERE) */}
      <div id="ier-diagnostico" className="bg-[#050505] -mt-10 relative z-20">
        <IERSection />
      </div>

      {/* 3 & 4. O PROBLEMA & A VERDADE */}
      <section className="py-20 px-4 bg-[#050505]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="text-red-500 font-mono text-[10px] uppercase tracking-widest mb-4 block">A Causa</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              Falta de clientes não quebra.<br />
              <span className="text-red-500">Falta de performance sim.</span>
            </h2>
            <div className="space-y-3 text-gray-400 text-sm">
              <p>Restaurantes operam milhões sem possuir:</p>
              <ul className="grid grid-cols-1 gap-2 border-l border-white/10 pl-4">
                {[
                  'Noção da performance financeira do negócio', 
                  'Planejamento de ações para melhorar esta performance', 
                  'Habilidade de desenvolver e estimular o colaborador'
                ].map(i => (
                  <li key={i} className="text-white font-bold uppercase text-[10px] tracking-widest">{i}</li>
                ))}
              </ul>
            </div>          </div>
          <div className="bg-[#111] p-8 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <BarChart3 className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-black uppercase mb-4 tracking-tighter">A Ilusão do Dono</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed italic">
              Empresas de verdade têm departamentos de performance. Em restaurantes, o dono tenta assumir financeiro, compras, RH e marketing ao mesmo tempo.
            </p>
            <div className="pt-4 border-t border-white/5">
              <p className="text-sm font-black uppercase tracking-tighter text-red-500">Isso é sobrevivência, não gestão.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. A SOLUÇÃO */}
      <section id="solucao" className="py-20 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-4 block">A Solução</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
            A Administrative é o <span className="text-blue-500">Departamento de Performance.</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 mb-8 leading-snug italic">
            Instalamos um escritório externo dedicado a monitorar e melhorar o desempenho da sua operação. Nosso trabalho é garantir que cada parte opere no máximo potencial.
          </p>
          <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10">
            <p className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none mb-4">
              Transformar seu restaurante em uma <span className="text-blue-500">máquina previsível de lucro.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Financeiro', 'Operacional', 'Equipe'].map(item => (
                <div key={item} className="flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest bg-white/5 px-3 py-1 rounded">
                  <CheckCircle2 className="w-3 h-3 text-blue-500" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PERFORMANCE AS A SERVICE (Comparativo) */}
      <section className="py-20 px-4 bg-white text-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3 leading-none">Performance não é consultoria.</h2>
            <p className="text-lg font-bold uppercase text-blue-600 tracking-widest italic">É operação contínua.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 shadow-xl text-sm">
            <div className="bg-gray-50 p-8">
              <h3 className="text-base font-mono text-gray-400 mb-6 uppercase tracking-[0.2em]">Consultoria Tradicional</h3>
              <ul className="space-y-4">
                {[
                  'Relatórios e apresentações',
                  'Recomendações teóricas',
                  'Reuniões esporádicas',
                  'Pouca execução',
                  'Nenhuma responsabilidade pelo lucro'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-500 font-medium line-through">
                    <X className="w-4 h-4 text-red-500 shrink-0" /> <span className="uppercase text-[10px] tracking-widest">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-600 p-8 text-white">
              <h3 className="text-base font-mono text-blue-200 mb-6 uppercase tracking-[0.2em]">Administrative PaaS</h3>
              <ul className="space-y-4">
                {[
                  'Monitoramento diário', 
                  'Intervenção direta nos indicadores',
                  'Sistemas de inteligência', 
                  'Engenharia contínua de eficiência',
                  'Responsabilidade real pela margem'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-black">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" /> <span className="uppercase text-[10px] tracking-widest">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OS 5 SISTEMAS DE PERFORMANCE */}
      <section id="metodologia" className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">Os 5 Sistemas de Performance</h2>
            <p className="text-gray-400 text-sm italic">As engrenagens que ativamos para blindar a sua margem.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SYSTEMS.map((system) => (
              <div key={system.id} className="p-6 bg-[#111] border border-white/5 rounded-xl hover:border-blue-500/30 transition-all flex flex-col">
                <div className="mb-4">{system.icon}</div>
                <h3 className="text-base font-black uppercase tracking-tight mb-2">{system.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">{system.description}</p>
                <div className="space-y-1 mb-4 flex-1">
                  {system.points.map(p => (
                    <div key={p} className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-gray-500">
                      <div className="w-1 h-1 bg-blue-500" /> {p}
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-blue-500 font-bold uppercase text-[10px] tracking-widest">Meta: {system.goal}</p>
                </div>
              </div>
            ))}
            
            {/* Telemetria Card */}
            <div className="p-6 bg-blue-600 rounded-xl flex flex-col justify-center lg:col-span-1">
              <span className="text-blue-200 font-mono text-[10px] uppercase tracking-[0.3em] block mb-2">Apoio</span>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 leading-none">Telemetria Viva</h3>
              <p className="text-blue-100 text-xs italic mb-6">Monitoramento contínuo da operação para embasar nossa inteligência de intervenção.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP & CTA FINAL MERGED */}
      <section className="py-24 px-4 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Zap className="w-48 h-48" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Roadmap Portion */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3 text-white">Roadmap de Instalação</h2>
            <p className="text-blue-200 uppercase tracking-widest font-mono text-[10px] font-bold">Os primeiros 30 dias de implantação</p>
          </div>
          
          <div className="space-y-6 mb-20">
            {ROADMAP.map((item, index) => (
              <div key={item.day} className="flex items-center gap-6 border-b border-white/10 pb-6 last:border-0">
                <div className="text-black font-black text-2xl md:text-3xl font-mono w-20 shrink-0 leading-none">{item.day}</div>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight mb-1 text-white leading-none">{item.title}</h4>
                  <p className="text-blue-100 text-xs italic">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Portion */}
          <div className="text-center border-t border-white/20 pt-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9] text-white">
              Pare de operar no escuro.<br />
              <span className="text-black italic">Opere com inteligência.</span>
            </h2>
            <button 
              onClick={() => handleCTA('final-cta', 'footer')}
              className="px-8 py-4 bg-black text-white font-black uppercase text-base rounded hover:scale-105 transition-transform shadow-xl"
            >
              Iniciar Diagnóstico
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-black text-center flex flex-col items-center gap-6">
        <img src={`${ASSETS.LOGO_VERTICAL}?${LOGO_VERSION}`} alt="Administrative Logo" className="h-16 w-auto object-contain grayscale opacity-30" />
        <div className="space-y-2">
          <p className="text-gray-500 font-black text-lg uppercase tracking-tighter italic">Administrative</p>
          <div className="text-gray-700 text-[9px] font-mono uppercase tracking-[0.4em]">
            Estado de Eficiência para Restaurantes
          </div>
        </div>
        <div className="text-gray-800 text-[8px] font-mono uppercase tracking-[0.2em] mt-4">
          © 2026 ADMINISTRATIVE - ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}