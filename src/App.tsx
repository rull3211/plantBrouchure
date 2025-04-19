import "./App.css";
import BrochureCarousel from "./components/BrouchureCarousel";

function App() {
  return (
    <div className="body">
      <header>Søke gartneri</header>
      <main>
        <BrochureCarousel></BrochureCarousel>
      </main>
      <footer>&copy; 2025 Daniel Bence Søke. All rights reserved.</footer>
    </div>
  );
}

export default App;
