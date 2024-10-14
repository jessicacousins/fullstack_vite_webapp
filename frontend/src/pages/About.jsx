import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

const About = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/news");

        setNewsArticles(response.data.results);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="holygrail-layout">
      {/* Header */}
      <header className="header">
        <h1>Your Personal Feed</h1>
      </header>

      {/* Main content and sidebars */}
      <div className="content-container">
        <aside className="sidebar left-sidebar">
          <h2>Sponsored</h2>
          <p>Google Ad here</p>
        </aside>

        <main className="main-content">
          <h2>News and Updates</h2>

          <section>
            <h3>Trending Topics</h3>
            {loading && <p>Loading news...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && newsArticles.length > 0
              ? newsArticles.map((article, index) => (
                  <div key={index} className="news-article">
                    <h4>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {article.title}
                      </a>
                    </h4>
                    {article.image_url && (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="news-image"
                      />
                    )}
                    {article.description && <p>{article.description}</p>}
                    <p className="news-meta">
                      Source: {article.source_id} | Published:{" "}
                      {new Date(article.pubDate).toLocaleString()}
                    </p>
                  </div>
                ))
              : null}
          </section>

          {/* Other sections remain the same */}
          <section>
            <h3>Popular Posts</h3>
            <p>{/* Your existing content */}</p>
          </section>
          <section>
            <h3>Your Suggested Content</h3>
            <p>{/* Your existing content */}</p>
          </section>
        </main>

        <aside className="sidebar right-sidebar">
          <h2>Messages</h2>
          <p>Direct Messages and friends list populate here</p>
        </aside>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; 2024 [Update Name Here]. All rights reserved.
          <br />
          News data provided by{" "}
          <a
            className="footerLink"
            href="https://newsdata.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            NewsData.io
          </a>
        </p>
      </footer>
    </div>
  );
};

export default About;
