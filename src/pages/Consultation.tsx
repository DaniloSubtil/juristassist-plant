
import React from 'react';
import { Layout } from '@/components/Layout';
import { Chatbot } from '@/components/Chatbot';
import { Link } from 'react-router-dom';

const Consultation = () => {
  const faqItems = [
    {
      question: 'Quais são os direitos do trabalhador no Brasil?',
      category: 'Direito Trabalhista',
    },
    {
      question: 'Como funciona o processo de divórcio consensual?',
      category: 'Direito de Família',
    },
    {
      question: 'Quais os direitos do consumidor em caso de produto com defeito?',
      category: 'Direito do Consumidor',
    },
    {
      question: 'Como solicitar pensão alimentícia?',
      category: 'Direito de Família',
    },
    {
      question: 'Qual o prazo para reclamar de um produto ou serviço?',
      category: 'Direito do Consumidor',
    },
    {
      question: 'Quais são as leis que protegem contra o assédio no trabalho?',
      category: 'Direito Trabalhista',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-block rounded-full bg-jurist-100 px-3 py-1 text-sm text-jurist-800 mb-4">
            Consultoria Jurídica
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tire suas dúvidas jurídicas
          </h1>
          <p className="text-muted-foreground text-lg">
            Use nosso assistente virtual para obter respostas rápidas e precisas sobre questões jurídicas.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Chatbot />
          </div>
          
          <aside className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Perguntas frequentes</h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-border/30 pb-3 last:border-0 last:pb-0">
                    <div className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground inline-block mb-1">
                      {item.category}
                    </div>
                    <button 
                      className="text-left font-medium hover:text-jurist-600 button-transition w-full"
                    >
                      {item.question}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Precisa de ajuda especializada?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Nosso assistente virtual pode ajudar com questões gerais, mas para casos específicos, recomendamos consultar um advogado.
              </p>
              <Link 
                to="/encontrar-advogado" 
                className="block w-full bg-jurist-600 text-white rounded-lg py-2 hover:bg-jurist-700 button-transition text-center"
              >
                Encontrar advogado especializado
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Consultation;
