import { CHARACTERS } from "./data/characters";
import { CharacterGrid } from "./components/CharacterGrid";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <h1 className="text-xl font-bold tracking-wide text-white">
          HSR Team Generator
        </h1>
      </header>

      {/* Main */}
      <main className="px-4 py-6 sm:px-6">
        <CharacterGrid characters={CHARACTERS} />
      </main>
    </div>
  );
}

export default App;
