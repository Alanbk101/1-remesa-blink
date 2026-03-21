import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const phases = [
  {
    title: "Fase 1 — Hackathon MVP",
    borderClass: "border-top-green",
    period: "Semana 1-2",
    items: ["Escrow USDC en Solana devnet", "AI Agent WhatsApp funcional", "Off-ramp simulado"],
  },
  {
    title: "Fase 2 — Beta Privada",
    borderClass: "border-top-cyan",
    period: "Mes 2-3",
    items: ["Integración Bitso/Bando API", "SPEI real (sandbox)", "KYC básico"],
  },
  {
    title: "Fase 3 — Lanzamiento",
    borderClass: "border-top-purple",
    period: "Mes 4-6",
    items: ["Mainnet Solana", "Múltiples corredores LATAM", "App companion (opcional)"],
  },
];

const RoadmapSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            Roadmap
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {phases.map((phase, i) => (
            <div
              key={phase.title}
              className={`reveal liquid-glass rounded-2xl p-6 ${phase.borderClass} hover:scale-[1.03] transition-transform duration-300`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="text-base font-semibold text-foreground mb-1">{phase.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">{phase.period}</p>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="text-sm text-foreground/60 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
