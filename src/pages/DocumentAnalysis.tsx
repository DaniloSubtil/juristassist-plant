
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { FileUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const DocumentAnalysis = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || 
          droppedFile.type === 'application/msword' || 
          droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(droppedFile);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleAnalyze = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };
  
  const handleReset = () => {
    setFile(null);
    setAnalysisComplete(false);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-block rounded-full bg-jurist-100 px-3 py-1 text-sm text-jurist-800 mb-4">
            Análise de Documentos
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Avaliação inteligente de documentos jurídicos
          </h1>
          <p className="text-muted-foreground text-lg">
            Faça upload do seu contrato ou documento jurídico para uma análise detalhada e identificação de pontos críticos.
          </p>
        </section>

        <div className="glass-card p-8">
          {!file && (
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragging ? 'border-jurist-600 bg-jurist-50' : 'border-border'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <FileUp className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Arraste seu documento aqui</h3>
                <p className="text-muted-foreground mb-6">Suporte para arquivos PDF e Word (DOC, DOCX)</p>
                
                <label className="bg-jurist-600 text-white rounded-lg px-6 py-3 cursor-pointer hover:bg-jurist-700 button-transition">
                  Selecionar arquivo
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          )}
          
          {file && !isAnalyzing && !analysisComplete && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-medium">Arquivo selecionado</h3>
                  <p className="text-muted-foreground text-sm">{file.name}</p>
                </div>
                <button 
                  onClick={handleReset}
                  className="text-sm text-muted-foreground hover:text-foreground button-transition"
                >
                  Remover
                </button>
              </div>
              
              <button
                onClick={handleAnalyze}
                className="w-full bg-jurist-600 text-white rounded-lg py-3 font-medium hover:bg-jurist-700 button-transition"
              >
                Iniciar análise
              </button>
            </div>
          )}
          
          {isAnalyzing && (
            <div className="p-4 text-center">
              <div className="mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jurist-600 mx-auto"></div>
              </div>
              <h3 className="font-medium mb-1">Analisando documento</h3>
              <p className="text-muted-foreground text-sm">Nosso sistema está verificando o conteúdo. Isso pode levar alguns instantes.</p>
            </div>
          )}
          
          {analysisComplete && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-medium">{file?.name}</h3>
                  <p className="text-muted-foreground text-sm">Análise concluída</p>
                </div>
                <button 
                  onClick={handleReset}
                  className="bg-secondary text-foreground px-3 py-1 rounded-md text-sm hover:bg-secondary/80 button-transition"
                >
                  Nova análise
                </button>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Resumo da análise</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h4 className="font-medium">Pontos críticos</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">3 cláusulas com potenciais problemas legais</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="w-5 h-5 text-amber-600" />
                      <h4 className="font-medium">Pontos de atenção</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">5 itens que merecem revisão adicional</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium">Conformidade</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">85% do documento está em conformidade com a legislação</p>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="p-4 border-b">
                    <h4 className="font-medium">Detalhes da análise</h4>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium">Cláusula 3.2 - Penalidade excessiva</h5>
                        <p className="text-sm text-muted-foreground">A multa estipulada excede o limite legal de 2% conforme Art. 52, § 1º do CDC.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium">Cláusula 5.1 - Limitação de responsabilidade</h5>
                        <p className="text-sm text-muted-foreground">Tentativa de eximir-se de responsabilidade por vício do produto ou serviço, o que é vedado pelo Art. 25 do CDC.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium">Cláusula 7.3 - Prazo de entrega</h5>
                        <p className="text-sm text-muted-foreground">Prazo indeterminado para entrega do serviço pode ser considerado abusivo. Recomenda-se definir um prazo específico.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button className="px-4 py-2 rounded-lg border border-jurist-600 text-jurist-600 hover:bg-jurist-50 button-transition">
                    Baixar relatório completo
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-jurist-600 text-white hover:bg-jurist-700 button-transition">
                    Solicitar revisão por advogado
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DocumentAnalysis;
