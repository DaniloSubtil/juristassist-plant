
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserPlus, ChevronDown, Home, Scale, FileText, Search, Gavel, FileSpreadsheet, Users } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from './ui/button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

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

  const primaryLinks = [
    { name: 'Início', path: '/', icon: <Home className="w-4 h-4" /> },
    { 
      name: 'Serviços', 
      children: [
        { name: 'Consultoria', path: '/consultoria', icon: <Scale className="w-4 h-4" />, description: 'Consultoria jurídica especializada' },
        { name: 'Análise de Documentos', path: '/analise-documentos', icon: <FileText className="w-4 h-4" />, description: 'Revisão e análise de documentos legais' },
        { name: 'Jurisprudência', path: '/jurisprudencia', icon: <Search className="w-4 h-4" />, description: 'Pesquisa de jurisprudência' },
      ] 
    },
    { 
      name: 'Processos', 
      children: [
        { name: 'Petições', path: '/peticoes', icon: <Gavel className="w-4 h-4" />, description: 'Criação e gestão de petições' },
        { name: 'Processos', path: '/processos', icon: <FileSpreadsheet className="w-4 h-4" />, description: 'Acompanhamento de processos' },
      ] 
    },
    { name: 'Encontrar Advogado', path: '/encontrar-advogado', icon: <Users className="w-4 h-4" /> },
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
          {!isMobile && (
            <div className="flex justify-between items-center gap-2">
              <NavigationMenu>
                <NavigationMenuList>
                  {primaryLinks.map((link, idx) => 
                    link.children ? (
                      <NavigationMenuItem key={idx}>
                        <NavigationMenuTrigger className="bg-transparent">{link.name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {link.children.map((childLink, childIdx) => (
                              <ListItem
                                key={childIdx}
                                title={childLink.name}
                                to={childLink.path}
                                icon={childLink.icon}
                                isActive={location.pathname === childLink.path}
                              >
                                {childLink.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem key={idx}>
                        <Link to={link.path}>
                          <NavigationMenuLink 
                            className={cn(
                              "flex items-center gap-1.5 px-3 py-2 text-sm font-medium",
                              location.pathname === link.path 
                                ? "text-foreground font-medium" 
                                : "text-foreground/70 hover:text-foreground",
                            )}
                          >
                            {link.icon}
                            {link.name}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    )
                  )}
                </NavigationMenuList>
              </NavigationMenu>

              <Link to="/cadastro-advogado">
                <Button variant="default" className="bg-jurist-600 hover:bg-jurist-700 text-white">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Área do Advogado
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-foreground hover:bg-secondary button-transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
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
          {primaryLinks.map((link, idx) => {
            if (link.children) {
              return (
                <div key={idx} className="w-full px-6">
                  <div className="flex items-center justify-center mb-2 text-lg font-medium">
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                  <div className="flex flex-col space-y-2 pl-4">
                    {link.children.map((childLink, childIdx) => (
                      <Link
                        key={childIdx}
                        to={childLink.path}
                        className={`nav-item flex items-center text-base ${location.pathname === childLink.path ? 'active' : ''}`}
                      >
                        {childLink.icon}
                        <span className="ml-2">{childLink.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            
            return (
              <Link
                key={idx}
                to={link.path}
                className={`nav-item flex items-center text-lg ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Link>
            );
          })}
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { 
    icon?: React.ReactNode; 
    title: string; 
    to: string;
    isActive?: boolean;
  }
>(({ className, title, to, icon, children, isActive, ...props }, ref) => {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          isActive && "bg-accent/50",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-sm font-medium leading-none">
          {icon}
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
