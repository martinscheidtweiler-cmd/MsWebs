export const metadata = {
  title: "Hippique Admin",
  description: "Beheerpaneel Hippique.immo",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: 0, padding: 0, height: "100vh", overflow: "hidden" }}>
      {children}
    </div>
  );
}
