import "./hippique.css";
import HipNav from "./components/HipNav";
import HipFooter from "./components/HipFooter";

export const metadata = {
  title: "Hippique.immo — Exclusief Hippisch Vastgoed",
  description:
    "Het meest gespecialiseerde kantoor voor stoeterijen, maneges, landgoederen en hippisch vastgoed in de Benelux en Noord-Frankrijk.",
};

export default function HippiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hi-body">
      <HipNav />
      <main>{children}</main>
      <HipFooter />
    </div>
  );
}
