import {Link} from "react-router-dom";
import "./Home.css";
import FullLogo from "../../public/Logo/LogoFull.png";
import Dolar from "../../public/icons/free.png";
import Global from "../../public/icons/international.png";
import Thumb from "../../public/icons/snap.png";
import Device from "../../public/icons/responsive.png";

function Home() {
  return (
    <div className="App">
      <div className="navigation-bar">
        <div id="navigation-container">
          <div className="logo-container">
            <img className="navigation-logo" src={FullLogo}/>
          </div>
          <ul>
            <li className="navbar-link-li"><a className="navbar-link" href="#features">Features</a></li>
            <li className="navbar-link-li"><a className="navbar-link" href="/app">About</a></li>
            <li className="navbar-link-li"><a className="navbar-link" href="/app">App</a></li>
            <li className="navbar-link-li"><a className="navbar-link" href="/app">How To</a></li>
          </ul>
        </div>
      </div>

      <div className="main-hero">
      </div>

      <div className="features" id="features">
        <div className="features-wrapper">

          <div className="feature-card">
            <div className="feature-card-inner">
              <div className="card-front">
                <img src={Global} className="feature-image"/>
              </div>
              <div className="card-back">
                <p>This is inner text</p>
              </div>
            </div>
          </div>


           <div className="feature-card">
            <div className="feature-card-inner">
              <div className="card-front">
                <img src={Dolar} className="feature-image"/>
              </div>
              <div className="card-back">
                <p>This is inner text</p>
              </div>
            </div>
          </div>


           <div className="feature-card">
            <div className="feature-card-inner">
              <div className="card-front">
                <img src={Thumb} className="feature-image"/>
              </div>
              <div className="card-back">
                <p>This is inner text</p>
              </div>
            </div>
          </div>


           <div className="feature-card">
            <div className="feature-card-inner">
              <div className="card-front">
                <img src={Device} className="feature-image"/>
              </div>
              <div className="card-back">
                <p>This is inner text</p>
              </div>
            </div>
          </div>

        </div>
      </div>


      <Link to="/app">Surfel App</Link>
    </div>
  );
}

export default Home;
