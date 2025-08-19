import "./App.css";
import BrochureCarousel from "./components/BrouchureCarousel";
import { usePlantsFromCSV } from "./hooks/usePlantsFromCSV";

function App() {
   const  { loading, plants, error } = usePlantsFromCSV( "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEv0zZITBKWwg8VJkPpq9BYjujLpAWoX7baPb2eLqE0ta84COtdESHdot5mJs0NwGBoPKAtXCJ5VZF/pub?output=csv")

  return (
   
      <div className="body">
        <header>Søke gartneri</header>
        <main>
          {loading || plants.length < 3 || error ? <p>Loading plants...</p> : <BrochureCarousel></BrochureCarousel>}
        </main>
        <footer>&copy; 2025 Daniel Bence Søke. All rights reserved.</footer>
      </div>
    
  );
}

export default App;
