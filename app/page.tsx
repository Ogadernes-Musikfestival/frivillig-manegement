import PanelGridEntry from "./globals/PanelGridEntry";
import Sidebar from "./globals/Sidebar";

export default function Home() {
  return (
    <main className="grid">
      <Sidebar />
      <PanelGridEntry />
    </main>
  );
}
