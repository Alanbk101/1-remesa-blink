import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MessageCircle } from "lucide-react";

const messages = [
  { from: "user", text: "Hola, quiero enviar $200 a mi mamá" },
  {
    from: "bot",
    text: "¡Claro! $200 USD = $3,408 MXN (tipo de cambio: 17.20).\nComisión: $1 USD (0.5%).\nTu mamá recibe: $3,390.80 MXN.\n\nNecesito el nombre y CLABE de tu mamá.",
  },
  { from: "user", text: "María López, CLABE: 012345678901234567" },
  {
    from: "bot",
    text: "¡Listo! Confirma tu remesa:\n$200 USD → María López\nRecibe: $3,390.80 MXN\n\nResponde SÍ para confirmar.",
  },
  { from: "user", text: "SÍ" },
  {
    from: "bot",
    text: "✅ ¡Remesa enviada!\nTX: sol...7x4f\n\nMaría recibirá el depósito SPEI en minutos.",
  },
];

const DemoSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            Demo: Conversación Real
          </h2>
        </div>

        <div className="reveal max-w-lg mx-auto rounded-3xl overflow-hidden shadow-lg" style={{ transitionDelay: "100ms" }}>
          {/* WhatsApp header */}
          <div className="flex items-center gap-3 px-5 py-3 bg-primary">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">RemesaBlink</p>
              <p className="text-xs text-white/70">en línea</p>
            </div>
          </div>

          {/* Chat body */}
          <div className="flex flex-col gap-3 p-4 min-h-[400px] bg-card">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                  msg.from === "user"
                    ? "wa-bubble-user self-end text-foreground/90"
                    : "wa-bubble-bot self-start text-foreground/80"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
