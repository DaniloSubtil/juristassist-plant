
import React from 'react';
import { Navbar } from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main 
        key={location.pathname}
        className="flex-1 page-transition pt-20 px-4 sm:px-6 md:px-8 pb-12 max-w-7xl mx-auto w-full"
      >
        {children}
      </main>
      <footer className="py-6 px-4 sm:px-6 md:px-8 border-t border-border/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2023 JuristAssist. Todos os direitos reservados.
          </div>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground button-transition">Termos de Uso</a>
            <a href="#" className="hover:text-foreground button-transition">Política de Privacidade</a>
            <a href="#" className="hover:text-foreground button-transition">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
