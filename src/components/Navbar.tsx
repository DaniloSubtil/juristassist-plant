
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserPlus, Search } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Consultoria', path: '/consultoria' },
    { name: 'Análise de Documentos', path: '/analise-documentos' },
    { name: 'Jurisprudência', path: '/jurisprudencia' },
    { name: 'Petições', path: '/peticoes' },
    { name: 'Processos', path: '/processos' },
    { name: 'Encontrar Advogado', path: '/encontrar-advogado' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-display text-xl font-semibold text-foreground">
                Jurist<span className="text-jurist-600">Assist</span>
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/cadastro-advogado"
              className="ml-2 bg-jurist-600 hover:bg-jurist-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Área do Advogado
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-secondary button-transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div 
        className={`md:hidden ${
          isMobileMenuOpen 
            ? 'h-screen bg-background/95 backdrop-blur-md' 
            : 'h-0 opacity-0 pointer-events-none'
        } overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <nav className="flex flex-col items-center space-y-4 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item text-lg ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/cadastro-advogado"
            className="mt-4 bg-jurist-600 hover:bg-jurist-700 text-white px-6 py-2 rounded-md flex items-center"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Área do Advogado
          </Link>
        </nav>
      </div>
    </header>
  );
};
