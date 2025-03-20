
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { File, FilePlus, FileText, Check, ArrowRight } from 'lucide-react';

const DocumentCreation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  
  const templates = [
    {
      id: 1,
      title: 'Petição Inicial',
      description: 'Documento para iniciar um processo judicial',
      category: 'Processual',
    },
    {
      id: 2,
      title: 'Contestação',
      description: 'Resposta do réu aos argumentos do autor',
      category: 'Processual',
    },
    {
      id: 3,
      title: 'Contrato de Prestação de Serviços',
      description: 'Acordo entre contratante e prestador de serviços',
      category: 'Contratual',
    },
    {
      id: 4,
      title: 'Procuração',
      description: 'Documento que concede poderes a terceiros',
      category: 'Administrativo',
    },
    {
      id: 5,
      title: 'Recurso de Apelação',
      description: 'Recurso contra sentença de primeira instância',
      category: 'Processual',
    },
    {
      id: 6,
      title: 'Notificação Extrajudicial',
      description: 'Comunicação formal pré-processual',
      category: 'Extrajudicial',
    },
  ];
  
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSelectTemplate = (id: number) => {
    setSelectedTemplate(id);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-block rounded-full bg-jurist-100 px-3 py-1 text-sm text-jurist-800 mb-4">
            Criação de Documentos
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Crie documentos jurídicos
          </h1>
          <p className="text-muted-foreground text-lg">
            Gere petições e documentos personalizados de forma rápida e eficiente.
          </p>
        </section>
        
        <div className="glass-card p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10"></div>
              {[1, 2, 3].map((step) => (
                <div 
                  key={step} 
                  className={`flex flex-col items-center ${
                    step < currentStep 
                      ? 'text-jurist-600' 
                      : step === currentStep 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                  }`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step < currentStep 
                        ? 'bg-jurist-600 text-white' 
                        : step === currentStep 
                          ? 'border-2 border-jurist-600 text-jurist-600' 
                          : 'border-2 border-border bg-background'
                    }`}
                  >
                    {step < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {step === 1 ? 'Escolher modelo' : step === 2 ? 'Preencher dados' : 'Finalizar'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Selecione um modelo de documento</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    onClick={() => handleSelectTemplate(template.id)}
                    className={`border rounded-lg p-5 cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-jurist-600 bg-jurist-50 ring-2 ring-jurist-600/20'
                        : 'hover:border-jurist-200 hover:bg-jurist-50/30'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg mr-3 ${
                        selectedTemplate === template.id
                          ? 'bg-jurist-100'
                          : 'bg-secondary'
                      }`}>
                        {template.category === 'Processual' ? (
                          <FileText className={`w-5 h-5 ${
                            selectedTemplate === template.id
                              ? 'text-jurist-600'
                              : 'text-muted-foreground'
                          }`} />
                        ) : template.category === 'Contratual' ? (
                          <File className={`w-5 h-5 ${
                            selectedTemplate === template.id
                              ? 'text-jurist-600'
                              : 'text-muted-foreground'
                          }`} />
                        ) : (
                          <FilePlus className={`w-5 h-5 ${
                            selectedTemplate === template.id
                              ? 'text-jurist-600'
                              : 'text-muted-foreground'
                          }`} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{template.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                        <div className="mt-2">
                          <span className="inline-block text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                            {template.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={nextStep}
                  disabled={selectedTemplate === null}
                  className={`flex items-center px-6 py-2 rounded-lg button-transition ${
                    selectedTemplate !== null
                      ? 'bg-jurist-600 text-white hover:bg-jurist-700'
                      : 'bg-jurist-200 text-jurist-600 cursor-not-allowed'
                  }`}
                >
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">
                {selectedTemplate && templates.find(t => t.id === selectedTemplate)?.title}
              </h2>
              <p className="text-muted-foreground">
                Preencha os campos abaixo para gerar seu documento.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="petitioner" className="block text-sm font-medium mb-1">
                      Nome do Requerente
                    </label>
                    <input
                      id="petitioner"
                      type="text"
                      className="w-full rounded-lg border border-input px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="petitioner-document" className="block text-sm font-medium mb-1">
                      CPF/CNPJ do Requerente
                    </label>
                    <input
                      id="petitioner-document"
                      type="text"
                      className="w-full rounded-lg border border-input px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="petitioner-address" className="block text-sm font-medium mb-1">
                      Endereço do Requerente
                    </label>
                    <input
                      id="petitioner-address"
                      type="text"
                      className="w-full rounded-lg border border-input px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="respondent" className="block text-sm font-medium mb-1">
                      Nome do Requerido
                    </label>
                    <input
                      id="respondent"
                      type="text"
                      className="w-full rounded-lg border border-input px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="respondent-document" className="block text-sm font-medium mb-1">
                      CPF/CNPJ do Requerido
                    </label>
                    <input
                      id="respondent-document"
                      type="text"
                      className="w-full rounded-lg border border-input px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="respondent-address" className="block text-sm font-medium mb-1">
                      Endereço do Requerido
                    </label>
                    <input
                      id="respondent-address"
                      type="text"
                      className="w-full rounded-lg border border-input px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="facts" className="block text-sm font-medium mb-1">
                    Breve descrição dos fatos
                  </label>
                  <textarea
                    id="facts"
                    rows={5}
                    className="w-full rounded-lg border border-input px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="requests" className="block text-sm font-medium mb-1">
                    Pedidos
                  </label>
                  <textarea
                    id="requests"
                    rows={3}
                    className="w-full rounded-lg border border-input px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-jurist-600 focus:border-transparent transition-all"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-between space-x-3 mt-6">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 border border-input rounded-lg text-foreground hover:bg-secondary button-transition"
                >
                  Voltar
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-jurist-600 text-white rounded-lg hover:bg-jurist-700 button-transition"
                >
                  Gerar documento
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold">Documento gerado com sucesso!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Seu documento está pronto para download. Você também pode editá-lo ou compartilhá-lo diretamente.
              </p>
              
              <div className="glass-panel p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="w-6 h-6 text-jurist-600 mr-2" />
                    <span className="font-medium">
                      {selectedTemplate && templates.find(t => t.id === selectedTemplate)?.title}.docx
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">245 KB</span>
                </div>
                
                <div className="flex justify-center space-x-3">
                  <button className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 button-transition text-sm">
                    Editar
                  </button>
                  <button className="px-4 py-2 bg-jurist-600 text-white rounded-lg hover:bg-jurist-700 button-transition text-sm">
                    Baixar
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedTemplate(null);
                  }}
                  className="px-6 py-2 border border-input rounded-lg text-foreground hover:bg-secondary button-transition"
                >
                  Criar novo documento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DocumentCreation;
