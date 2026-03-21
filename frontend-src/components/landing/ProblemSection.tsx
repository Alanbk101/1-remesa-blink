import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { AlertTriangle, Clock, Frown } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Comisiones abusivas",
    desc: "Western Union cobra 5-7% por transferencia. En $500 USD, pierdes hasta $35 en comisiones.",
    borderClass: "border-left-red",
  },
  {
    icon: Clock,
    title: "Lentitud",
    desc: "Las transferencias tradicionales toman 1-3 días hábiles. El dinero urgente no puede esperar.",
    borderClass: "border-left-orange",
  },
  {
    icon: Frown,
    title: "Fricción",
    desc: "Requiere ir a una sucursal, llenar formularios, presentar ID. Apps existentes son complicadas para muchos.",
    borderClass: "border-left-red",
  },
];

const ProblemSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            El Problema
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            El corredor US-México es el mayor flujo de remesas del mundo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={`reveal liquid-glass rounded-2xl p-6 ${p.borderClass} hover:scale-[1.03] transition-transform duration-300`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p.icon className="w-8 h-8 text-destructive mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
