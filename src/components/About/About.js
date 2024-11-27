import React, { Component } from "react";
import "./About.css";
import lok from '../../Pictures/lokesh picture.jpg'
class About extends Component {
  render() {
    return (
      <section id="about" className="about">
        <img src={lok}  alt="myimage" className="image" />
        <h2>About Me</h2>
        <p>
          Hi, I'm a passionate web developer with skills in React, Python, and other modern technologies.
        </p>
      </section>
    );
  }
}

export default About;
