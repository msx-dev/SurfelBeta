import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home';
import Surfel from './pages/Surfel/Surfel';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Surfel/>}/>
      </Routes>
    </div>
  );
}

export default App;
