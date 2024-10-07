import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="holygrail-layout">
      {/* Header */}
      <header className="header">About Us - Header</header>

      {/* Main content and sidebars */}
      <div className="content-container">
        <aside className="sidebar left-sidebar">Left Sidebar</aside>

        <main className="main-content">
          <h1>About Us</h1>
          <section>
            <h2>Our Purpose</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </section>
          <section>
            <h2>Our Mission</h2>
            <p>
              Phasellus imperdiet libero sit amet nisi efficitur, vitae vehicula
              felis sodales...
            </p>
          </section>
          <section>
            <h2>Contact Information</h2>
            <p>Reach us at: contact@example.com</p>
          </section>
        </main>

        <aside className="sidebar right-sidebar">Right Sidebar</aside>
      </div>

      {/* Footer */}
      <footer className="footer">Footer Information</footer>
    </div>
  );
};

export default About;
