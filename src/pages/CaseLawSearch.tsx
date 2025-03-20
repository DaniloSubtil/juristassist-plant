
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Search, Filter, Calendar, Book, FileText } from 'lucide-react';

const CaseLawSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  const mockResults = [
    {
      id: 1,
      title: 'Recurso Especial nº 1.737.428/RS',
      court: 'Superior Tribunal de Justiça',
      date: '12/03/2022',
      excerpt: 'DIREITO DO CONSUMIDOR. CONTRATO DE ADESÃO. CLÁUSULA LIMITATIVA DE DIREITO DO CONSUMIDOR. DESTAQUE. NECESSIDADE. NEGÓCIO JURÍDICO. NULIDADE. DECLARAÇÃO.',
      relevance: 95,
    },
    {
      id: 2,
      title: 'Acórdão em Agravo de Instrumento nº 2059477-89.2021.8.26.0000',
      court: 'Tribunal de Justiça de São Paulo',
      date: '23/05/2021',
      excerpt: 'RESPONSABILIDADE CIVIL. DANO MORAL. INSCRIÇÃO INDEVIDA EM CADASTRO DE INADIMPLENTES. QUANTUM INDENIZATÓRIO. RAZOABILIDADE E PROPORCIONALIDADE.',
      relevance: 88,
    },
    {
      id: 3,
      title: 'Apelação Cível nº 1001234-12.2020.8.26.0100',
      court: 'Tribunal de Justiça de São Paulo',
      date: '14/08/2021',
      excerpt: 'RESCISÃO CONTRATUAL. COMPRA E VENDA. IMÓVEL NA PLANTA. ATRASO NA ENTREGA. DEVOLUÇÃO DAS PARCELAS. DANO MORAL.',
      relevance: 82,
    },
    {
      id: 4,
      title: 'Recurso Extraordinário nº 760.931/DF',
      court: 'Supremo Tribunal Federal',
      date: '30/03/2020',
      excerpt: 'TRABALHISTA. RESPONSABILIDADE SUBSIDIÁRIA. ADMINISTRAÇÃO PÚBLICA. FISCALIZAÇÃO DO CONTRATO. TERCEIRIZAÇÃO.',
      relevance: 79,
    },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setHasSearched(true);
    }
  };

  const categories = [
    'Direito Civil',
    'Direito Penal',
    'Direito Trabalhista',
    'Direito Tributário',
    'Direito do Consumidor',
    'Direito Administrativo',
  ];

  const courts = [
    'Supremo Tribunal Federal',
    'Superior Tribunal de Justiça',
    'Tribunal de Justiça de São Paulo',
    'Tribunal de Justiça do Rio de Janeiro',
    'Tribunal Regional Federal',
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-block rounded-full bg-jurist-100 px-3 py-1 text-sm text-jurist-800 mb-4">
            Pesquisa de Jurisprudência
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Encontre jurisprudência relevante
          </h1>
          <p className="text-muted-foreground text-lg">
            Pesquise decisões judiciais que podem servir como base para o seu caso.
          </p>
        </section>
        
        <div className="glass-card p-6">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquise por termos jurídicos, números de processo ou temas..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-jurist-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-jurist-700 button-transition"
              >
                Pesquisar
              </button>
            </div>
          </form>
          
          {hasSearched && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium flex items-center mb-3">
                    <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                    Filtros
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Categoria Jurídica</h4>
                      <div className="space-y-2">
                        {categories.map((category, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`category-${index}`}
                              className="rounded border-input text-jurist-600 focus:ring-jurist-600 mr-2"
                            />
                            <label htmlFor={`category-${index}`} className="text-sm">{category}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Tribunal</h4>
                      <div className="space-y-2">
                        {courts.map((court, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`court-${index}`}
                              className="rounded border-input text-jurist-600 focus:ring-jurist-600 mr-2"
                            />
                            <label htmlFor={`court-${index}`} className="text-sm">{court}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Período</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <label htmlFor="date-from" className="text-sm w-14">De:</label>
                          <input
                            type="date"
                            id="date-from"
                            className="text-sm rounded border-input w-full"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label htmlFor="date-to" className="text-sm w-14">Até:</label>
                          <input
                            type="date"
                            id="date-to"
                            className="text-sm rounded border-input w-full"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-secondary text-foreground rounded-lg py-2 text-sm font-medium hover:bg-secondary/80 button-transition">
                      Aplicar filtros
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <div className="rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{mockResults.length} resultados encontrados</h3>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground mr-2">Ordenar por:</span>
                      <select className="bg-background border border-input rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-jurist-600">
                        <option>Relevância</option>
                        <option>Data (mais recente)</option>
                        <option>Data (mais antiga)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {mockResults.map((result) => (
                      <div key={result.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="inline-flex items-center text-jurist-600 text-sm font-medium">
                              <Book className="w-4 h-4 mr-1" />
                              {result.court}
                            </span>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {result.date}
                            </div>
                          </div>
                          
                          <h3 className="font-medium text-lg mb-2">{result.title}</h3>
                          <p className="text-muted-foreground mb-3 text-sm">{result.excerpt}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-sm">
                              <div className="px-2 py-0.5 bg-jurist-50 text-jurist-700 rounded-full">
                                Relevância: {result.relevance}%
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <button className="text-jurist-600 hover:text-jurist-700 button-transition text-sm font-medium flex items-center">
                                <FileText className="w-4 h-4 mr-1" />
                                Ver completo
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <nav className="flex items-center space-x-1">
                      <button className="px-3 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary button-transition">
                        Anterior
                      </button>
                      <button className="px-3 py-1 rounded-md bg-jurist-600 text-white">
                        1
                      </button>
                      <button className="px-3 py-1 rounded-md text-foreground hover:bg-secondary button-transition">
                        2
                      </button>
                      <button className="px-3 py-1 rounded-md text-foreground hover:bg-secondary button-transition">
                        3
                      </button>
                      <button className="px-3 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary button-transition">
                        Próxima
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!hasSearched && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Inicie sua pesquisa</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Digite termos relacionados ao seu caso para encontrar decisões judiciais relevantes.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CaseLawSearch;
