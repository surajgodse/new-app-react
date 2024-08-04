import { useState, useEffect } from "react";
import axios from "axios";
import Result from "./Result";
import "./App.css";

export default function News() {
    const [info, setInfo] = useState([]);
    const [category, setCategory] = useState("all");

    const categories = ["all", "business", "entertainment", "politics", "health", "science", "sports", "technology"];

    const fetchNews = (selectedCategory = "all") => {
        const apiKey = "pub_50045cceef4ca19689d1d5e60f4cbdb72c4f7"; // Replace with your actual API key
        let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=us`;

        if (selectedCategory !== "all") {
            url += `&category=${selectedCategory}`;
        }

        axios.get(url)
            .then(res => {
                if (res.data && res.data.results) {
                    setInfo(res.data.results);
                } else {
                    console.error("Unexpected API response structure:", res.data);
                    setInfo([]);
                }
            })
            .catch(err => {
                console.error("Error fetching news:", err);
                alert("There was an issue fetching the news. Please try again later.");
            });
    };

    useEffect(() => {
        fetchNews(category);
    }, [category]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div className="app-container">
            <h1>NewsVerse</h1>
            <form className="news-form">
                <select value={category} onChange={handleCategoryChange}>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </form>
            <div className="results-container">
                {info.map((e, index) => (
                    <Result
                        key={index}
                        title={e.title}
                        url={e.link}
                        description={e.description}
                        author={e.creator}
                        publishedAt={e.pubDate}
                    />
                ))}
            </div>
            <footer>
                <p>Created by @Suraj Godse</p>
                <a href="https://www.linkedin.com/in/suraj-godse" target="_blank" rel="noopener noreferrer">
                    <img src="images/linkedin-logo.png" alt="LinkedIn" />
                </a>
                <a href="https://github.com/surajgodse" target="_blank" rel="noopener noreferrer">
                    <img src="images/github-logo.png" alt="GitHub" />
                </a>
            </footer>
        </div>
    );
}