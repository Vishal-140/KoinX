import logo from './logo.svg';
import './App.css';
import CoinPage from './pages/CoinPage';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <CoinPage/>
    </div>
  );
}

export default App;
