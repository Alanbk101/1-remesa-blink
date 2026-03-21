import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Check, X, Minus } from "lucide-react";

const rows = [
  { feature: "Comisión", wu: "5-7%", felix: "1-2%", rb: "0.5%" },
  { feature: "Tiempo", wu: "1-3 días", felix: "Minutos", rb: "Segundos" },
  { feature: "Interfaz", wu: "Sucursal/App", felix: "App propia", rb: "WhatsApp" },
  { feature: "Tecnología", wu: "Legacy", felix: "Crypto (parcial)", rb: "Solana + AI" },
  { feature: "On-chain", wu: "No", felix: "Parcial", rb: "100% transparente" },
  { feature: "AI Agent", wu: "No", felix: "No", rb: "Claude NLP" },
];

const CellIcon = ({ val }: { val: string }) => {
  if (val === "No") return <X className="w-4 h-4 text-destructive/60 mx-auto" />;
  if (val === "Parcial") return <Minus className="w-4 h-4 text-muted-foreground mx-auto" />;
  return null;
};

const CompetitiveSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            Ventaja Competitiva
          </h2>
        </div>

        <div className="reveal max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left p-4" />
                <th className="p-4 text-center">Western Union</th>
                <th className="p-4 text-center">Felix Pago</th>
                <th className="p-4 text-center">
                  <span className="text-gradient-brand font-semibold text-sm normal-case tracking-normal">RemesaBlink</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`${i % 2 === 0 ? "bg-foreground/[0.02]" : ""}`}
                >
                  <td className="p-4 text-foreground/70 font-medium">{row.feature}</td>
                  <td className="p-4 text-center text-muted-foreground">
                    <CellIcon val={row.wu} />
                    {row.wu !== "No" && row.wu !== "Parcial" && row.wu}
                  </td>
                  <td className="p-4 text-center text-muted-foreground">
                    <CellIcon val={row.felix} />
                    {row.felix !== "No" && row.felix !== "Parcial" && row.felix}
                  </td>
                  <td className="p-4 text-center text-primary font-semibold">
                    {row.rb === "100% transparente" || row.rb === "Claude NLP" ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4" /> {row.rb}
                      </span>
                    ) : (
                      row.rb
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveSection;
