
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Search, FileText, Calendar, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const CaseTracking = () => {
  const [processNumber, setProcessNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (processNumber.trim()) {
      setHasSearched(true);
    }
  };

  const toggleEvent = (id: number) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };
  
  const mockProcess = {
    number: '0123456-78.2022.8.26.0100',
    court: 'Tribunal de Justiça de São Paulo',
    district: '1ª Vara Cível da Comarca de São Paulo',
    class: 'Procedimento Comum Cível',
    subject: 'Responsabilidade Civil',
    value: 'R$ 30.000,00',
    filingDate: '15/04/2022',
    currentPhase: 'Instrução e Julgamento',
    parties: [
      { type: 'Autor', name: 'João da Silva', representation: 'Dra. Maria Oliveira (OAB/SP 123.456)' },
      { type: 'Réu', name: 'Empresa XYZ Ltda.', representation: 'Dr. Carlos Souza (OAB/SP 654.321)' }
    ],
    events: [
      { 
        id: 1,
        date: '12/05/2022', 
        time: '14:30',
        title: 'Audiência de Conciliação',
        description: 'Audiência realizada sem acordo entre as partes. As partes não chegaram a um consenso sobre os termos propostos. Processo seguirá para fase de instrução.',
        documents: ['Ata de Audiência']
      },
      { 
        id: 2,
        date: '30/04/2022', 
        time: '16:15',
        title: 'Citação do Réu',
        description: 'Réu citado pessoalmente conforme AR juntado aos autos.',
        documents: ['Aviso de Recebimento', 'Mandado de Citação']
      },
      { 
        id: 3,
        date: '18/04/2022', 
        time: '09:45',
        title: 'Distribuição da Ação',
        description: 'Processo distribuído para a 1ª Vara Cível da Comarca de São Paulo.',
        documents: ['Petição Inicial', 'Documentos Anexos']
      }
    ],
    deadlines: [
      { date: '05/06/2022', description: 'Prazo para Contestação', remaining: 'Expirado' },
      { date: '20/06/2022', description: 'Prazo para Réplica', remaining: 'Expirado' },
      { date: '15/08/2022', description: 'Audiência de Instrução', remaining: '3 dias' }
    ],
  };

  return (
    <Layout>
      <div className="space-y-8">
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-block rounded-full bg-jurist-100 px-3 py-1 text-sm text-jurist-800 mb-4">
            Consulta de Processos
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Acompanhamento processual
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitore o andamento dos seus processos judiciais em tempo real.
          </p>
        </section>
        
        <div className="glass-card p-6">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  value={processNumber}
                  onChange={(e) => setProcessNumber(e.target.value)}
                  placeholder="Digite o número do processo (Ex: 0123456-78.2022.8.26.0100)"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-jurist-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-jurist-700 button-transition w-full md:w-auto"
              >
                Consultar
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Consulte processos de tribunais estaduais, federais e trabalhistas.
            </p>
          </form>
          
          {hasSearched && (
            <div className="space-y-8">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-secondary/50 p-4 border-b">
                  <h2 className="font-semibold">Informações do Processo</h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Número do Processo</h3>
                      <p className="font-medium">{mockProcess.number}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Tribunal</h3>
                      <p>{mockProcess.court}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Vara</h3>
                      <p>{mockProcess.district}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Classe</h3>
                      <p>{mockProcess.class}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Assunto</h3>
                      <p>{mockProcess.subject}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Valor da Causa</h3>
                      <p>{mockProcess.value}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Data de Distribuição</h3>
                      <p>{mockProcess.filingDate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-1">Fase Atual</h3>
                      <p>{mockProcess.currentPhase}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-secondary/50 p-4 border-b">
                  <h2 className="font-semibold">Partes do Processo</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {mockProcess.parties.map((party, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="inline-block rounded-full bg-jurist-100 px-2 py-0.5 text-sm text-jurist-800 mb-2">
                          {party.type}
                        </div>
                        <p className="font-medium">{party.name}</p>
                        <p className="text-sm text-muted-foreground">Representado por: {party.representation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-secondary/50 p-4 border-b">
                  <h2 className="font-semibold">Movimentações</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {mockProcess.events.map((event) => (
                      <div key={event.id} className="border rounded-lg">
                        <div 
                          className="p-3 flex justify-between items-center cursor-pointer hover:bg-secondary/30 transition-colors"
                          onClick={() => toggleEvent(event.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="bg-secondary rounded-lg p-2 flex-shrink-0">
                              <Calendar className="w-5 h-5 text-jurist-600" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium">{event.title}</p>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <span>{event.date}</span>
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {event.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          {expandedEvent === event.id ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        
                        {expandedEvent === event.id && (
                          <div className="p-3 border-t bg-secondary/20">
                            <p className="text-sm mb-3">{event.description}</p>
                            {event.documents.length > 0 && (
                              <div>
                                <p className="text-sm font-medium mb-2">Documentos:</p>
                                <div className="space-y-2">
                                  {event.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                      <FileText className="w-4 h-4 text-jurist-600" />
                                      <a href="#" className="text-sm text-jurist-600 hover:underline">{doc}</a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-secondary/50 p-4 border-b">
                  <h2 className="font-semibold">Prazos e Compromissos</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {mockProcess.deadlines.map((deadline, index) => (
                      <div key={index} className="p-3 border rounded-lg flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          deadline.remaining === 'Expirado' 
                            ? 'bg-red-50' 
                            : 'bg-amber-50'
                        }`}>
                          <AlertCircle className={`w-5 h-5 ${
                            deadline.remaining === 'Expirado' 
                              ? 'text-red-500' 
                              : 'text-amber-500'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{deadline.description}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              deadline.remaining === 'Expirado' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {deadline.remaining}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">Data: {deadline.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button className="px-4 py-2 border border-jurist-600 text-jurist-600 rounded-lg hover:bg-jurist-50 button-transition">
                  Imprimir relatório
                </button>
                <button className="px-4 py-2 bg-jurist-600 text-white rounded-lg hover:bg-jurist-700 button-transition">
                  Configurar alertas
                </button>
              </div>
            </div>
          )}
          
          {!hasSearched && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Consulte seus processos</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Digite o número do processo para visualizar todas as informações e movimentações.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CaseTracking;
