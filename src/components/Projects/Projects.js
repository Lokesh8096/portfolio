import React, { Component } from "react";
import "./Projects.css";

class Projects extends Component {
  render() {
    const projects = [
      {
        name: "Portfolio Website",
        description: "A personal portfolio built with React.js.",
        gitLink: "https://github.com/yourusername/portfolio",
      },
      {
        name: "LogInPage",
        description: "LogIn page Using React.",
        gitLink: "https://github.com/Lokesh8096/LogIn-Page.git",
      },
      {
        name: "Wikipedia Search",
        description: "A small Web page to Search the wikipedia Using JavaScript",
        gitLink: "https://github.com/Lokesh8096/wikipidia_search.git",
      },
    ];

    return (
      <section id="projects" className="projects">
        <h2>My Projects</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="btn">
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Projects;
