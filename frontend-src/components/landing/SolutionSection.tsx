import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MessageSquare, Cpu, Link2, Landmark, ArrowRight } from "lucide-react";

const steps = [
  { label: '"Quiero enviar $200 a mi mamá"', sub: "WhatsApp", icon: MessageSquare, color: "text-primary" },
  { label: "AI Agent procesa intent + datos", sub: "Claude API", icon: Cpu, color: "text-secondary" },
  { label: "USDC se deposita en escrow on-chain", sub: "Solana", icon: Link2, color: "text-accent" },
  { label: "Off-ramp automático a cuenta bancaria", sub: "SPEI", icon: Landmark, color: "text-primary" },
];

const SolutionSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            La Solución: <span className="text-gradient-brand">RemesaBlink</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Un AI Agent en WhatsApp que permite enviar USDC de USA a pesos mexicanos vía SPEI. Sin apps nuevas, sin wallets complicadas.
          </p>
        </div>

        {/* Flow steps */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 max-w-5xl mx-auto mb-12">
          {steps.map((step, i) => (
            <div key={step.sub} className="flex items-center gap-4 flex-1">
              <div
                className="reveal liquid-glass rounded-2xl p-6 flex-1 text-center hover:scale-[1.03] transition-transform duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <step.icon className={`w-8 h-8 ${step.color} mx-auto mb-3`} />
                <p className="text-sm text-foreground/70 mb-2 leading-snug">{step.label}</p>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{step.sub}</span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-foreground/20 hidden lg:block shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="reveal text-center">
          <p className="liquid-glass-strong rounded-2xl inline-block px-8 py-4 text-foreground/70 text-base sm:text-lg font-light">
            El usuario solo usa WhatsApp. <em className="font-serif text-foreground italic">La blockchain y la IA trabajan invisiblemente.</em>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
