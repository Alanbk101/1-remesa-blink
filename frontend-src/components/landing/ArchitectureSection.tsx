import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MessageSquare, Cpu, Link2, Landmark } from "lucide-react";

const cards = [
  {
    title: "Frontend",
    icon: MessageSquare,
    borderClass: "border-top-green",
    techs: ["WhatsApp Business API", "Meta Cloud API", "Webhooks"],
  },
  {
    title: "AI Agent",
    icon: Cpu,
    borderClass: "border-top-orange",
    techs: ["Claude API (Sonnet)", "NLP + Intent Parser", "Session Manager"],
  },
  {
    title: "Blockchain",
    icon: Link2,
    borderClass: "border-top-purple",
    techs: ["Solana (Devnet)", "Anchor/Rust Escrow", "USDC SPL Token"],
  },
  {
    title: "Off-Ramp",
    icon: Landmark,
    borderClass: "border-top-cyan",
    techs: ["Exchange API (Bitso)", "SPEI Gateway", "MXN Settlement"],
  },
];

const ArchitectureSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            Arquitectura Técnica
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-10">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`reveal liquid-glass rounded-2xl p-6 ${card.borderClass} hover:scale-[1.03] transition-transform duration-300`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <card.icon className="w-7 h-7 text-foreground/50 mb-4" />
              <h3 className="text-base font-semibold text-foreground mb-3">{card.title}</h3>
              <ul className="space-y-1.5">
                {card.techs.map((t) => (
                  <li key={t} className="text-xs text-muted-foreground">{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="reveal text-center text-xs text-muted-foreground/60 tracking-wider">
          Node.js &nbsp;|&nbsp; Anchor/Rust &nbsp;|&nbsp; React &nbsp;|&nbsp; Claude API &nbsp;|&nbsp; Solana Web3.js
        </p>
      </div>
    </section>
  );
};

export default ArchitectureSection;
