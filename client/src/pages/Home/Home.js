import {Link} from "react-router-dom";
import "./Home.css";


function Home() {
  return (
    <div className="App">
      <h1>Testing homepage</h1>
      <Link to="/app">Surfel App</Link>
    </div>
  );
}

export default Home;
