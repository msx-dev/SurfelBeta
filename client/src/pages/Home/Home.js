import {Link} from "react-router-dom";
import "./Home.css";
import Logo from "../../public/Logo/Logo.png";


function Home() {
  return (
    <div className="App">
      <div className="navigation-bar">
        <div id="navigation-container">
          <div className="logo-container">
            <img className="navigation-logo" src={Logo}/>
            <h1 className="logo-name">SurfLog</h1>
          </div>
          <ul>
            <li><a href="/app">Features</a></li>
            <li><a href="/app">About</a></li>
            <li><a href="/app">App</a></li>
          </ul>
        </div>
      </div>
      <div className="main-hero">

      </div>
      <Link to="/app">Surfel App</Link>
    </div>
  );
}

export default Home;
