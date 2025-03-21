
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, Shield, Award, Zap, User, Mail, Phone, Briefcase, CreditCard } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
  phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 dígitos",
  }),
  oab: z.string().min(3, {
    message: "Número da OAB inválido",
  }),
  specialization: z.string({
    required_error: "Selecione uma especialização",
  }),
  plan: z.string({
    required_error: "Selecione um plano",
  }),
});

const specializations = [
  { value: "trabalhista", label: "Direito Trabalhista" },
  { value: "civil", label: "Direito Civil" },
  { value: "penal", label: "Direito Penal" },
  { value: "familia", label: "Direito de Família" },
  { value: "tributario", label: "Direito Tributário" },
  { value: "empresarial", label: "Direito Empresarial" },
  { value: "consumidor", label: "Direito do Consumidor" },
  { value: "ambiental", label: "Direito Ambiental" },
  { value: "previdenciario", label: "Direito Previdenciário" },
];

const SubscriptionPlan = ({ title, price, features, popular, onSelect }: { 
  title: string; 
  price: string; 
  features: string[]; 
  popular?: boolean;
  onSelect: () => void;
}) => (
  <Card className={`flex flex-col justify-between ${popular ? 'border-jurist-500 shadow-lg' : ''}`}>
    <CardHeader className="space-y-1">
      {popular && (
        <div className="inline-block text-center rounded-full bg-jurist-100 px-3 py-1 text-xs text-jurist-800 mb-2">
          Mais Popular
        </div>
      )}
      <CardTitle className="text-2xl">{title}</CardTitle>
      <div className="text-3xl font-bold">
        {price} <span className="text-sm font-normal text-muted-foreground">/mês</span>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-jurist-600" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button 
        onClick={onSelect}
        variant={popular ? "default" : "outline"} 
        className={`w-full ${popular ? 'bg-jurist-600 hover:bg-jurist-700' : ''}`}
      >
        Escolher plano
      </Button>
    </CardFooter>
  </Card>
);

const LawyerRegistration = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const plans = [
    {
      id: "basic",
      title: "Básico",
      price: "R$29,90",
      features: [
        "Perfil no diretório",
        "5 áreas de especialização",
        "Visibilidade básica",
        "Suporte por email"
      ]
    },
    {
      id: "pro",
      title: "Profissional",
      price: "R$69,90",
      features: [
        "Perfil destacado",
        "10 áreas de especialização",
        "Leads prioritários",
        "Suporte prioritário",
        "Estatísticas de visualização"
      ],
      popular: true
    },
    {
      id: "premium",
      title: "Premium",
      price: "R$129,90",
      features: [
        "Perfil em destaque máximo",
        "Especialidades ilimitadas",
        "Leads exclusivos",
        "Suporte exclusivo",
        "Estatísticas avançadas",
        "Selos de verificação"
      ]
    }
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      oab: "",
      specialization: "",
      plan: selectedPlan || "",
    },
  });

  const selectPlan = (planId: string) => {
    setSelectedPlan(planId);
    form.setValue("plan", planId);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Cadastro enviado com sucesso! Em breve entraremos em contato para finalizar o processo.");
    
    // Simulação de envio para processamento de pagamento
    setTimeout(() => {
      setStep(3);
      window.scrollTo(0, 0);
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-block rounded-full bg-jurist-100 px-3 py-1 text-sm text-jurist-800 mb-4">
            Área do Advogado
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Cadastre-se como Advogado Parceiro
          </h1>
          <p className="text-muted-foreground text-lg">
            Aumente sua visibilidade e receba consultas de potenciais clientes.
          </p>
        </section>

        {step === 1 && (
          <section className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">Escolha seu plano</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <SubscriptionPlan
                  key={plan.id}
                  title={plan.title}
                  price={plan.price}
                  features={plan.features}
                  popular={plan.popular}
                  onSelect={() => selectPlan(plan.id)}
                />
              ))}
            </div>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Todos os planos incluem um período de teste de 7 dias.</p>
              <p>Você pode cancelar a qualquer momento.</p>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="max-w-2xl mx-auto glass-card p-8">
            <div className="mb-6 flex items-center gap-2">
              <div className="bg-jurist-100 rounded-full p-2">
                <Briefcase className="h-5 w-5 text-jurist-600" />
              </div>
              <h2 className="text-2xl font-semibold">
                Plano selecionado: {plans.find(p => p.id === selectedPlan)?.title}
              </h2>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="Seu nome completo" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="seu@email.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="(11) 99999-9999" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="oab"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número da OAB</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="Ex: 123456/SP" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especialização principal</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione sua especialização" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {specializations.map((spec) => (
                              <SelectItem key={spec.value} value={spec.value}>
                                {spec.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-medium">Total:</p>
                      <p className="text-sm text-muted-foreground">Cobrança mensal</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">{plans.find(p => p.id === selectedPlan)?.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-1/3"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-2/3 bg-jurist-600 hover:bg-jurist-700"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Prosseguir para pagamento
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </section>
        )}

        {step === 3 && (
          <section className="max-w-2xl mx-auto glass-card p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Cadastro Recebido!</h2>
            <p className="text-muted-foreground mb-6">
              Obrigado por se cadastrar como advogado parceiro no JuristAssist. 
              Enviaremos um e-mail com os próximos passos e instruções para completar seu perfil.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-jurist-600 hover:bg-jurist-700"
            >
              Voltar para a página inicial
            </Button>
          </section>
        )}
        
        <section className="max-w-3xl mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-jurist-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-jurist-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Credibilidade</h3>
              <p className="text-sm text-muted-foreground">
                Aumente sua credibilidade com o selo de verificação do JuristAssist.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-jurist-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-jurist-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Visibilidade</h3>
              <p className="text-sm text-muted-foreground">
                Seja encontrado por clientes buscando exatamente a sua especialidade.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-jurist-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-jurist-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Crescimento</h3>
              <p className="text-sm text-muted-foreground">
                Expanda sua carteira de clientes e aumente seus rendimentos.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default LawyerRegistration;
