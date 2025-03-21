
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Phone, Mail, Star, Filter, ArrowUpDown } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

// Mock dos dados de advogados
const lawyers = [
  {
    id: 1,
    name: "Dra. Carolina Mendes",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specialization: "Direito de Família",
    experience: "10 anos",
    location: "São Paulo, SP",
    rating: 4.8,
    reviews: 124,
    verified: true,
    plan: "premium",
    oab: "123456/SP",
    description: "Especialista em direito de família com vasta experiência em divórcios, guarda compartilhada e pensão alimentícia.",
    email: "carolina@exemplo.com",
    phone: "(11) 99999-1234",
  },
  {
    id: 2,
    name: "Dr. Ricardo Oliveira",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specialization: "Direito Trabalhista",
    experience: "8 anos",
    location: "Rio de Janeiro, RJ",
    rating: 4.6,
    reviews: 98,
    verified: true,
    plan: "pro",
    oab: "78901/RJ",
    description: "Especializado em causas trabalhistas com foco em garantir os direitos dos trabalhadores.",
    email: "ricardo@exemplo.com",
    phone: "(21) 98888-5678",
  },
  {
    id: 3,
    name: "Dra. Fernanda Costa",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specialization: "Direito Civil",
    experience: "12 anos",
    location: "Belo Horizonte, MG",
    rating: 4.9,
    reviews: 156,
    verified: true,
    plan: "premium",
    oab: "45678/MG",
    description: "Advogada com forte atuação em direito civil, contratos e responsabilidade civil.",
    email: "fernanda@exemplo.com",
    phone: "(31) 97777-9012",
  },
  {
    id: 4,
    name: "Dr. Eduardo Santos",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specialization: "Direito Penal",
    experience: "15 anos",
    location: "São Paulo, SP",
    rating: 4.7,
    reviews: 203,
    verified: true,
    plan: "pro",
    oab: "98765/SP",
    description: "Criminalista experiente com atuação em júris e defesas criminais complexas.",
    email: "eduardo@exemplo.com",
    phone: "(11) 96666-3456",
  },
  {
    id: 5,
    name: "Dra. Mariana Lima",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specialization: "Direito Tributário",
    experience: "9 anos",
    location: "Brasília, DF",
    rating: 4.5,
    reviews: 87,
    verified: true,
    plan: "basic",
    oab: "54321/DF",
    description: "Especialista em direito tributário com foco em planejamento tributário e contencioso administrativo.",
    email: "mariana@exemplo.com",
    phone: "(61) 95555-7890",
  },
  {
    id: 6,
    name: "Dr. Gustavo Martins",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specialization: "Direito do Consumidor",
    experience: "7 anos",
    location: "Curitiba, PR",
    rating: 4.4,
    reviews: 76,
    verified: true,
    plan: "basic",
    oab: "13579/PR",
    description: "Advogado especializado em direito do consumidor, com experiência em ações contra empresas e bancos.",
    email: "gustavo@exemplo.com",
    phone: "(41) 94444-2109",
  },
];

// Lista de áreas de especialização
const specializations = [
  { id: "familia", name: "Direito de Família" },
  { id: "trabalhista", name: "Direito Trabalhista" },
  { id: "civil", name: "Direito Civil" },
  { id: "penal", name: "Direito Penal" },
  { id: "tributario", name: "Direito Tributário" },
  { id: "consumidor", name: "Direito do Consumidor" },
  { id: "empresarial", name: "Direito Empresarial" },
  { id: "imobiliario", name: "Direito Imobiliário" },
  { id: "previdenciario", name: "Direito Previdenciário" },
  { id: "ambiental", name: "Direito Ambiental" },
  { id: "internacional", name: "Direito Internacional" },
  { id: "digital", name: "Direito Digital" },
];

const LawyerCard = ({ lawyer }: { lawyer: typeof lawyers[0] }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className={`overflow-hidden transition-all ${lawyer.plan === 'premium' ? 'border-jurist-300 shadow-md' : ''}`}>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Foto e Detalhes Básicos */}
          <div className="md:col-span-1 relative">
            <img 
              src={lawyer.photo} 
              alt={lawyer.name} 
              className="w-full h-64 md:h-full object-cover"
            />
            {lawyer.verified && (
              <div className="absolute top-2 right-2 bg-jurist-100 rounded-full p-1">
                <Badge variant="outline" className="bg-white/80 text-jurist-800 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-jurist-500 text-jurist-500" />
                  Verificado
                </Badge>
              </div>
            )}
          </div>
          
          {/* Informações */}
          <div className="md:col-span-3 p-4 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                <p className="text-muted-foreground">{lawyer.specialization} • {lawyer.experience} de experiência</p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{lawyer.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">({lawyer.reviews})</span>
              </div>
            </div>
            
            <div className="mb-3 flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {lawyer.location}
            </div>
            
            <p className="mb-4 text-sm">{lawyer.description}</p>
            
            {showDetails && (
              <div className="mt-2 space-y-2 text-sm border-t pt-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{lawyer.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{lawyer.email}</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline">{lawyer.oab}</Badge>
                </div>
              </div>
            )}
            
            <div className="mt-auto pt-3 flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Ocultar detalhes" : "Ver detalhes"}
              </Button>
              
              <Button 
                className="bg-jurist-600 hover:bg-jurist-700"
                size="sm"
              >
                Entrar em contato
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LawyerDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [filteredLawyers, setFilteredLawyers] = useState(lawyers);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterLawyers(searchTerm, selectedSpecialization);
  };

  const filterLawyers = (search: string, specialization: string | null) => {
    let filtered = lawyers;
    
    if (search) {
      filtered = filtered.filter(lawyer => 
        lawyer.name.toLowerCase().includes(search.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(search.toLowerCase()) ||
        lawyer.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (specialization) {
      const specializationName = specializations.find(s => s.id === specialization)?.name;
      if (specializationName) {
        filtered = filtered.filter(lawyer => 
          lawyer.specialization === specializationName
        );
      }
    }
    
    setFilteredLawyers(filtered);
  };

  const selectSpecialization = (id: string) => {
    setSelectedSpecialization(id);
    filterLawyers(searchTerm, id);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-block rounded-full bg-jurist-100 px-3 py-1 text-sm text-jurist-800 mb-4">
            Diretório de Advogados
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Encontre o advogado ideal para o seu caso
          </h1>
          <p className="text-muted-foreground text-lg">
            Busque por especialidade, localização ou nome e conecte-se com os melhores profissionais.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar com filtros */}
          <div className="md:col-span-1">
            <div className="glass-card p-4 space-y-6 sticky top-24">
              <div>
                <h3 className="text-lg font-medium mb-3">Especialidades</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedSpecialization === null ? "default" : "outline"}
                    size="sm"
                    className={`w-full justify-start ${selectedSpecialization === null ? 'bg-jurist-600 hover:bg-jurist-700' : ''}`}
                    onClick={() => {
                      setSelectedSpecialization(null);
                      filterLawyers(searchTerm, null);
                    }}
                  >
                    Todas as especialidades
                  </Button>
                  {specializations.slice(0, 6).map(spec => (
                    <Button
                      key={spec.id}
                      variant={selectedSpecialization === spec.id ? "default" : "outline"}
                      size="sm"
                      className={`w-full justify-start ${selectedSpecialization === spec.id ? 'bg-jurist-600 hover:bg-jurist-700' : ''}`}
                      onClick={() => selectSpecialization(spec.id)}
                    >
                      {spec.name}
                    </Button>
                  ))}
                </div>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="link" size="sm" className="mt-2">
                      Ver todas as especialidades
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Áreas de Especialização</SheetTitle>
                    </SheetHeader>
                    <div className="grid grid-cols-1 gap-2 mt-4">
                      {specializations.map(spec => (
                        <Button
                          key={spec.id}
                          variant={selectedSpecialization === spec.id ? "default" : "outline"}
                          size="sm"
                          className={`w-full justify-start ${selectedSpecialization === spec.id ? 'bg-jurist-600 hover:bg-jurist-700' : ''}`}
                          onClick={() => {
                            selectSpecialization(spec.id);
                          }}
                        >
                          {spec.name}
                        </Button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="hidden md:block">
                <h3 className="text-lg font-medium mb-3">Ordenar por</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Melhor avaliação
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Mais experiência
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:block border-t pt-4">
                <Label className="text-lg font-medium mb-3">É advogado?</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Cadastre-se e apareça em nosso diretório para potenciais clientes.
                </p>
                <Button 
                  className="w-full bg-jurist-600 hover:bg-jurist-700"
                  onClick={() => window.location.href = '/cadastro-advogado'}
                >
                  Cadastrar como advogado
                </Button>
              </div>
            </div>
          </div>
          
          {/* Resultados da pesquisa */}
          <div className="md:col-span-3 space-y-6">
            {/* Barra de pesquisa */}
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por nome, especialidade ou localização..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit" className="bg-jurist-600 hover:bg-jurist-700">
                  Buscar
                </Button>
              </form>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="md:hidden">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <div>
                      <Label className="text-base font-medium">Especialidades</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {specializations.slice(0, 8).map(spec => (
                          <Button
                            key={spec.id}
                            variant={selectedSpecialization === spec.id ? "default" : "outline"}
                            size="sm"
                            className={`justify-start ${selectedSpecialization === spec.id ? 'bg-jurist-600 hover:bg-jurist-700' : ''}`}
                            onClick={() => {
                              selectSpecialization(spec.id);
                            }}
                          >
                            {spec.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium">Ordenar por</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Melhor avaliação
                        </Button>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Mais experiência
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Lista de advogados */}
            {filteredLawyers.length > 0 ? (
              <div className="space-y-6">
                {filteredLawyers.map(lawyer => (
                  <LawyerCard key={lawyer.id} lawyer={lawyer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">Nenhum advogado encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar seus filtros ou fazer uma nova busca.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default LawyerDirectory;
