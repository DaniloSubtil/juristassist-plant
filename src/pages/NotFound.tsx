
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-jurist-50 rounded-full flex items-center justify-center mb-6">
          <FileQuestion className="w-12 h-12 text-jurist-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          A página que você está procurando não foi encontrada ou está temporariamente indisponível.
        </p>
        <Link 
          to="/" 
          className="bg-jurist-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-jurist-700 button-transition"
        >
          Voltar para o início
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
