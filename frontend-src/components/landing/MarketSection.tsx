import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { TrendingUp, Globe, Shield, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "$64.7B", label: "Remesas a México (2024, récord histórico)", icon: TrendingUp },
  { value: "$150B+", label: "Corredor de remesas US-LATAM total", icon: Globe },
  { value: "71%", label: "Instituciones LATAM usando stablecoins", icon: Shield },
];

const reasons = [
  "GENIUS Act (USA) — primer marco regulatorio federal para stablecoins",
  "Meta planea integrar pagos crypto en WhatsApp (2026)",
  "Nuevo impuesto 1% a remesas desde USA — stablecoins como alternativa",
  "Felix Pago ya procesó $1B+ con USDC-SPEI vía WhatsApp",
];

const MarketSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            Oportunidad de Mercado
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal liquid-glass-strong rounded-2xl p-8 text-center hover:scale-[1.03] transition-transform duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <s.icon className="w-7 h-7 text-primary mx-auto mb-3" />
              <p className="text-3xl sm:text-4xl font-bold text-foreground tabular-nums mb-2">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="reveal max-w-2xl mx-auto liquid-glass rounded-2xl p-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">¿Por qué ahora?</h3>
          <ul className="space-y-4">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm text-foreground/70">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
