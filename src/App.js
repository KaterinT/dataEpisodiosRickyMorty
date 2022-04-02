import './App.css';
import CountriesTables from './components/CountriesTables';

function App() {
  return (
    <>
    <div className="d-flex flex-column align-items-center">
      <h1>Información de Episodios de Ricky y Morty</h1>
    </div>
    <div className="box2">
    <CountriesTables />
    </div>
    </>
  );
}

export default App;
