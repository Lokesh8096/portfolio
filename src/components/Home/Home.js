// import React, { Component } from "react";
// import SliderComponent from "./Slider";
// import "./Home.css";

// class Home extends Component {
//   render() {
//     return (
//       <div className="home">
//         {/* <div className="slider-section">
//           <SliderComponent />
//         </div> */}
//         <div className="home-content">
//           <h1>Welcome to My Portfolio</h1>
//           <p>I am a Web Developer specializing in modern web technologies.</p>
//         </div>
//         {/* <div className="slider-section">
//           <SliderComponent />
//         </div> */}
//       </div>
//     );
//   }
// }

// export default Home;



import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <section id="home" className="home">
        <div className="home-content">
          <h1>Welcome to My Portfolio</h1>
          <p>
            Hi, I'm Lokesh, a passionate web developer with expertise in React, Python, and modern technologies.
          </p>
          
          <a href="#about" className="btn">Learn More About Me</a>
          <a href="#contact" className="btn-hire">Hire Me</a>
        </div>
      </section>
    );
  }
}

export default Home;
