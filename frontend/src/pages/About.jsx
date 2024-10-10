import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="holygrail-layout">
      {/* Header */}
      <header className="header">[Username Here] Personal Feed</header>

      {/* Main content and sidebars */}
      <div className="content-container">
        <aside className="sidebar left-sidebar">
          Left Sidebar - Google Ad here
        </aside>

        <main className="main-content">
          <h1>About Us - News and Updates</h1>
          <section>
            <h2>Trending Topics</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              sequi, similique minus, est placeat praesentium incidunt
              blanditiis animi aliquam eos quidem! Est vero quisquam veniam
              reiciendis aperiam mollitia tenetur vel provident! Blanditiis,
              doloribus. Quibusdam a vitae aut cumque iste minus exercitationem
              quis accusantium sint non ratione pariatur vero laudantium
              doloremque quod eveniet eos optio ea natus, reiciendis maxime
              fugit? Sunt, perspiciatis. Et ipsa dolorum quam inventore
              corrupti, laborum id nostrum sit amet, deserunt labore, magni
              asperiores placeat possimus nam perspiciatis fugit facilis quis!
              Quae aliquid voluptate doloremque? Cupiditate, vel rem, dicta
              blanditiis libero fugit ab asperiores natus magni consequatur
              deleniti!
            </p>
          </section>
          <section>
            <h2>Popular Posts</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              dolore molestiae saepe voluptatem, provident ea, sed voluptates,
              exercitationem praesentium impedit nemo quae doloremque dolorem.
              Quis molestiae dicta quisquam illo accusantium in ipsum corrupti
              similique aut maiores quaerat, doloribus cum nesciunt earum
              inventore a dolore labore expedita reprehenderit sit? Ratione,
              sapiente.
            </p>
          </section>
          <section>
            <h2>Your Suggested Content</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              at.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              at.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              at.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              at.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              at.
            </p>
          </section>
        </main>

        <aside className="sidebar right-sidebar">
          Direct Messages and friends list populate here
        </aside>
      </div>

      {/* Footer */}
      <footer className="footer">Footer Information</footer>
    </div>
  );
};

export default About;
