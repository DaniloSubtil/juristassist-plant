
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Index from "./pages/Index";
import Consultation from "./pages/Consultation";
import DocumentAnalysis from "./pages/DocumentAnalysis";
import CaseLawSearch from "./pages/CaseLawSearch";
import DocumentCreation from "./pages/DocumentCreation";
import CaseTracking from "./pages/CaseTracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Para GitHub Pages, é melhor usar o HashRouter
// pois ele usa hash (#) para rotas, o que funciona melhor em hospedagens estáticas
const Router = import.meta.env.DEV ? BrowserRouter : HashRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
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
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
