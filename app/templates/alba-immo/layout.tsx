import "./hippique.css";
import HipNav from "./components/HipNav";
import HipFooter from "./components/HipFooter";
import HipCursor from "./components/HipCursor";
import { LangProvider } from "./LangContext";

export const metadata = {
  title: "Hippique.immo — Exclusief Hippisch Vastgoed",
  description:
    "Het meest gespecialiseerde kantoor voor stoeterijen, maneges, landgoederen en hippisch vastgoed in binnen- en buitenland.",
};

export default function HippiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LangProvider>
      <div className="hi-body">
        <HipCursor />
        <HipNav />
        <main>{children}</main>
        <HipFooter />
      </div>
    </LangProvider>
  );
}
