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
      <header className="header">
        <h1 className="news-title">Latest News and Trending Topics</h1>
      </header>

      <div className="content-container">
        {/* Left Sidebar with Ads */}
        <aside className="sidebar left-sidebar">
          <h2>Sponsored Ads</h2>
          <div className="custom-ad">
            <h3>🍕 Local Pizza Place</h3>
            <img
              src="/adSampleImage.png"
              alt="Hair Salon Ad"
              className="ad-image"
            />
            <p>Try the best slices in town! 123 Pizza Lane, PizzaCity</p>
          </div>
          <div className="custom-ad">
            <h3>✂️ Hair Salon</h3>
            <img
              src="/adSampleImage.png"
              alt="Hair Salon Ad"
              className="ad-image"
            />
            <p>Get a fresh look today! Visit Glamorous, Main Street</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <h2 className="news-subtitle">News and Updates</h2>
          <section>
            <h3 className="trending-topics">Trending Topics</h3>
            {loading && <p>Loading news...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && newsArticles.length > 0 ? (
              newsArticles.map((article, index) => (
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
            ) : (
              <p>No news available at the moment.</p>
            )}
          </section>
        </main>

        {/* Right Sidebar with More Ads */}
        <aside className="sidebar right-sidebar">
          <h2>Sponsored Ads</h2>
          <div className="custom-ad">
            <h3>🔧 Local Plumber</h3>
            <img
              src="/adSampleImage.png"
              alt="Hair Salon Ad"
              className="ad-image"
            />
            <p>
              Laying down the best pipe! Call an expert plumber: (123) 456-7890
            </p>
          </div>
          <div className="custom-ad">
            <h3>🐶 Doggie Daycare</h3>
            <img
              src="/adSampleImage.png"
              alt="Hair Salon Ad"
              className="ad-image"
            />
            <p>Your pup's second home! Open 7 days a week.</p>
          </div>
        </aside>
      </div>

      <footer className="footer">
        <p>
          &copy; 2025 JMC App. All rights reserved.
          <br />
          News data provided by{" "}
          <a
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
