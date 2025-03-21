
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Consultation from "./pages/Consultation";
import DocumentAnalysis from "./pages/DocumentAnalysis";
import CaseLawSearch from "./pages/CaseLawSearch";
import DocumentCreation from "./pages/DocumentCreation";
import CaseTracking from "./pages/CaseTracking";
import LawyerRegistration from "./pages/LawyerRegistration";
import LawyerDirectory from "./pages/LawyerDirectory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Sempre usamos HashRouter para garantir compatibilidade com GitHub Pages
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/consultoria" element={<Consultation />} />
          <Route path="/analise-documentos" element={<DocumentAnalysis />} />
          <Route path="/jurisprudencia" element={<CaseLawSearch />} />
          <Route path="/peticoes" element={<DocumentCreation />} />
          <Route path="/processos" element={<CaseTracking />} />
          <Route path="/cadastro-advogado" element={<LawyerRegistration />} />
          <Route path="/encontrar-advogado" element={<LawyerDirectory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
