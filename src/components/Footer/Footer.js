import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <section id="Footer" className="contact">
        <p>Email: lokeshk80964@gmail.com</p>
        <p>
          LinkedIn: <a href="https://www.linkedin.com/in/krovvidi-lokesh-395210237">Profile</a>
        </p>
        <p>
          GitHub: <a href="https://github.com/Lokesh8096">Lokesh8096</a>
        </p>
      </section>
    );
  }
}

export default Footer;