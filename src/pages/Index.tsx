
import React from 'react';
import { Layout } from '@/components/Layout';
import { Chatbot } from '@/components/Chatbot';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Scale, FilePlus, Search, FileCheck, UserPlus } from 'lucide-react';

const Index = () => {
  const services = [
    {
      title: 'Consultoria Jurídica',
      description: 'Tire suas dúvidas jurídicas com nosso assistente virtual',
      icon: <Scale className="w-6 h-6 text-jurist-600" />,
      path: '/consultoria'
    },
    {
      title: 'Análise de Documentos',
      description: 'Upload e análise inteligente de contratos e documentos',
      icon: <FileText className="w-6 h-6 text-jurist-600" />,
      path: '/analise-documentos'
    },
    {
      title: 'Pesquisa de Jurisprudência',
      description: 'Encontre decisões judiciais relevantes para seu caso',
      icon: <Search className="w-6 h-6 text-jurist-600" />,
      path: '/jurisprudencia'
    },
    {
      title: 'Criação de Petições',
      description: 'Gere documentos jurídicos a partir de modelos inteligentes',
      icon: <FilePlus className="w-6 h-6 text-jurist-600" />,
      path: '/peticoes'
    },
    {
      title: 'Consulta de Processos',
      description: 'Acompanhe o andamento dos seus processos judiciais',
      icon: <FileCheck className="w-6 h-6 text-jurist-600" />,
      path: '/processos'
    },
    {
      title: 'Encontrar Advogado',
      description: 'Encontre advogados especializados para o seu caso',
      icon: <UserPlus className="w-6 h-6 text-jurist-600" />,
      path: '/encontrar-advogado'
    }
  ];

  return (
    <Layout>
      <div className="space-y-12">
        <section className="space-y-4 text-center pt-8 md:pt-12">
          <div className="inline-block rounded-full bg-jurist-100 px-3 py-1 text-sm text-jurist-800 mb-4">
            Inteligência artificial jurídica
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Soluções jurídicas <span className="text-jurist-600">inteligentes</span><br />ao seu alcance
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Consultoria jurídica automatizada com inteligência artificial para advogados e clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link 
              to="/consultoria" 
              className="bg-jurist-600 hover:bg-jurist-700 text-white px-6 py-3 rounded-lg button-transition"
            >
              Iniciar consultoria
            </Link>
            <Link 
              to="/encontrar-advogado" 
              className="bg-white border border-jurist-300 hover:bg-jurist-50 text-jurist-800 px-6 py-3 rounded-lg button-transition"
            >
              Encontrar advogado
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Experimente nosso assistente jurídico
            </h2>
            <p className="text-muted-foreground">
              Faça perguntas jurídicas, consulte legislação e obtenha orientações sobre seus direitos e obrigações. Nosso chatbot está aqui para ajudar.
            </p>
            <Chatbot />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Serviços disponíveis
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <Link 
                  key={index} 
                  to={service.path}
                  className="glass-card p-5 flex flex-col space-y-3 hover:translate-y-[-2px]"
                >
                  <div className="p-2 bg-jurist-50 rounded-lg w-fit">
                    {service.icon}
                  </div>
                  <h3 className="font-medium text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 text-center">
          <div className="inline-block rounded-full bg-jurist-100 px-3 py-1 text-sm text-jurist-800 mb-4">
            Área do Advogado
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            É advogado? Junte-se à nossa rede
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-6">
            Cadastre-se como parceiro para aumentar sua visibilidade e conquistar novos clientes através da nossa plataforma.
          </p>
          <Link 
            to="/cadastro-advogado" 
            className="inline-flex items-center bg-jurist-600 hover:bg-jurist-700 text-white px-6 py-3 rounded-lg button-transition"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Cadastrar como advogado
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
