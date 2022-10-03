import {Link} from "react-router-dom";
import "./Home.css";
import FullLogo from "../../public/Logo/LogoFull.png";
import Dolar from "../../public/icons/free.png";
import Global from "../../public/icons/international.png";
import Thumb from "../../public/icons/snap.png";
import Device from "../../public/icons/responsive.png";
import Beach from "../../public/images/MarkersBeach.jpg";
import Namibia from "../../public/images/Namibia.jpg";
import Many from "../../public/images/MarkersSurf3.jpg";
import Analytics from "../../public/images/MarkerAnalytics.jpg"
import { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';


function Home() {
  useEffect(() => {
    Aos.init({
      duration : 2000
    });
  }, []);
  return (
    <div className="App">

      {/* Navigation */}
      <div className="navigation-bar">
        <div id="navigation-container">
          <div className="logo-container">
            <img className="navigation-logo" src={FullLogo}/>
          </div>
          <ul>
            <li className="navbar-link-li"><a className="navbar-link" href="/app">App</a></li>
            <li className="navbar-link-li"><a className="navbar-link" href="#about">About</a></li>
            <li className="navbar-link-li"><a className="navbar-link" href="#features">Features</a></li>
            <li className="navbar-link-li"><a className="navbar-link" href="#future">Future</a></li>
          </ul>
        </div>
      </div>

      {/* Main Hero */}
      <div className="main-hero">
        <h1 className="main-title-hero" data-aos="fade-in" data-aos-easing="linear"  data-aos-duration="1500" data-aos-delay="400">Logging every single <br/>surf spot on the planet.</h1>
        <a href="/app" className="main-hero-href" data-aos="fade-in" data-aos-easing="linear"  data-aos-duration="1500" data-aos-delay="800">
          <button className="main-hero-button">Go to App</button>
        </a>
      </div>

      {/* About */}
      <div id="about" className="about">
        <div className="about-section">
        <h1 className="section-title">ABOUT</h1>
        {/* Technology meets surfing, transforming the surf community, Bringing surfers together, power in numbers (35mil), no heavy lifting for users */}
          <div className="about-section-insides">
            <div className="about-text-wrapper"  data-aos="fade-in" data-aos-easing="linear"  data-aos-duration="500">
              <h1 className="about-sub-title">A take on infinity.</h1>
              <p className="about-paragraph">There are countless surf spots around the world and locating every single one, is 
              a daunting task, to say the least. Dozens of web forums, applications and maps are trying their best to locate, store and share them with the world. Even the largest
              forecast applications contain information for only a couple thousand surf spots.
              </p>
            </div>
            <img src={Beach} className="about-image" alt="beach with markers"/>
          </div>
        </div>

        <div className="about-section">
        {/* Technology meets surfing, transforming the surf community, Bringing surfers together, power in numbers (35mil), no heavy lifting for users */}
          <div className="about-section-insides">
            <img src={Namibia} className="about-image" alt="beach with markers"/>
            <div className="about-text-wrapper" data-aos="fade-in" data-aos-easing="linear"  data-aos-duration="500">
              <h1 className="about-sub-title-right">Locating hidden gems.</h1>
              <p className="about-paragraph">Many spots are hidden, undocumented, marvels of our oceans. Most of the times, only known
              to locals. <br/>SurfLog will pave the way to discovery of the rarest spots around the globe. From the vast dunes of the Namib desert, where 
              the Atlantic Ocean meets the scorching desert, all the way to the freezing waters of Greenland.
              </p>
            </div>
          </div>
        </div>

        <div className="about-section">
        {/* Technology meets surfing, transforming the surf community, Bringing surfers together, power in numbers (35mil), no heavy lifting for users */}
          <div className="about-section-insides">
            <div className="about-text-wrapper" data-aos="fade-in" data-aos-easing="linear"  data-aos-duration="500">
              <h1 className="about-sub-title">Power is in numbers.</h1>
              <p className="about-paragraph">It's a task, far too heavy, for a single person, but together we can achieve it. <br/>
              There are approximately 35 million surfers in the world, each with it's favorite spot. Every new surfer 
              is a step closer to logging all surf breaks in the 5 oceans of the world. <br/><br/>SurfLog is not a business, nor is it a service - it is a community. 
              </p>
            </div>
            <img src={Many} className="about-image-tall" alt="beach with markers"/>
          </div>
        </div>

        <div className="about-section">
        {/* Technology meets surfing, transforming the surf community, Bringing surfers together, power in numbers (35mil), no heavy lifting for users */}
          <div className="about-section-insides">
            <img src={Analytics} className="about-image" alt="beach with markers"/>
            <div className="about-text-wrapper" data-aos="fade-in" data-aos-easing="linear"  data-aos-duration="500">
              <h1 className="about-sub-title-right">Complex analytics, simple user experience.</h1>
              <p className="about-paragraph">Forecasting surf conditions is a difficult and time-consuming task. <br/><br/>
              Hundreds of forecasting apps, covering only a fraction of all surf spots and not containing all the parameters you need. SurfLog 
              does all the heavy-lifting analytics for users.<br/> Zero guidance needed.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Features */}
      <div className="features" id="features">
        <h1 className="section-title-black">FEATURES</h1>
        <div className="features-wrapper">
          <div className="card-wrapper">

            <div className="feature-card" data-aos="zoom-in-down" data-aos-easing="linear"  data-aos-duration="300" data-aos-delay="300">
              <div className="feature-card-inner">
                <div className="card-front">
                  <img src={Global} className="feature-image"/>
                </div>
                <div className="card-back">
                  <h2 className="card-back-title">Entire planet.</h2>
                  <p className="card-back-text">From equator, to equator. <br/>From prime meridian, to prime meridian.</p>
                </div>
              </div>
            </div>


            <div className="feature-card" data-aos="zoom-in-down" data-aos-easing="linear"  data-aos-duration="300" data-aos-delay="600">
              <div className="feature-card-inner">
                <div className="card-front">
                  <img src={Dolar} className="feature-image"/>
                </div>
                <div className="card-back">
                  <h2 className="card-back-title">Completely free to use.</h2>
                  <p className="card-back-text">No subscription, no bullshit. <br/>Register and immediatelly start using.</p>
                </div>
              </div>
            </div>


            <div className="feature-card" data-aos="zoom-in-down" data-aos-easing="linear"  data-aos-duration="300" data-aos-delay="900">
              <div className="feature-card-inner">
                <div className="card-front">
                  <img src={Thumb} className="feature-image"/>
                </div>
                <div className="card-back">
                  <h2 className="card-back-title">Simple, fast and reliable.</h2>
                  <p className="card-back-text">Simple user interface. <br/>No difficult and time-consuming configurations.</p>
                </div>
              </div>
            </div>


            <div className="feature-card" data-aos="zoom-in-down" data-aos-easing="linear"  data-aos-duration="300" data-aos-delay="1200">
              <div className="feature-card-inner">
                <div className="card-front">
                  <img src={Device} className="feature-image"/>
                </div>
                <div className="card-back">
                <h2 className="card-back-title">Responsive.</h2>
                  <p className="card-back-text">Anywhere, anytime. <br/>On your phone in the back of a 1966 VW Vanagon, or on your work desktop in a dreadful office.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="future" id="future">
        <h1 className="section-title">FUTURE</h1>

      </div>
    </div>
  );
}

export default Home;
