import React, { Component } from "react";

import Header from "./components/Header/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer/>
      </div>
    );
  }
}

export default App;
