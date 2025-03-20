
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Consultation from "./pages/Consultation";
import DocumentAnalysis from "./pages/DocumentAnalysis";
import CaseLawSearch from "./pages/CaseLawSearch";
import DocumentCreation from "./pages/DocumentCreation";
import CaseTracking from "./pages/CaseTracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Detecta se estamos rodando em um subdiretório no GitHub Pages
const getBasename = () => {
  // Em desenvolvimento, use caminho raiz
  if (import.meta.env.DEV) return '/';
  
  // Em produção, use o pathname do repositório se existir
  const { pathname } = window.location;
  const pathSegments = pathname.split('/');
  
  // Se tiver pelo menos 2 segmentos e o primeiro for vazio (devido à barra inicial)
  if (pathSegments.length >= 2 && pathSegments[0] === '') {
    // Retorna o primeiro segmento como basename
    return `/${pathSegments[1]}`;
  }
  
  return '/';
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={getBasename()}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/consultoria" element={<Consultation />} />
          <Route path="/analise-documentos" element={<DocumentAnalysis />} />
          <Route path="/jurisprudencia" element={<CaseLawSearch />} />
          <Route path="/peticoes" element={<DocumentCreation />} />
          <Route path="/processos" element={<CaseTracking />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
