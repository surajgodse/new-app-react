import { useState, useEffect } from "react";
import axios from "axios";
import Result from "./Result";
import "./App.css";  // Import the CSS file

export default function News() {
    const [info, setInfo] = useState([]);
    const [category, setCategory] = useState("all");

    const categories = ["all", "business", "entertainment", "general", "health", "science", "sports", "technology"];

    const fetchNews = (selectedCategory = "all") => {
        const categoryQuery = selectedCategory !== "all" ? `&category=${selectedCategory}` : "";
        const url = `https://newsapi.org/v2/top-headlines?country=in${categoryQuery}&apiKey=6a37849b182047839bd5bbcf6cc6e5c3`;

        axios.get(url)
            .then(res => setInfo(res.data.articles))
            .catch(err => alert("issue" + err));
    };

    useEffect(() => {
        fetchNews(category); // Fetch news based on the current category when the component mounts or category changes
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
                        <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                </select>
            </form>
            <div className="results-container">
                {info.map((e, index) => (
                    <Result
                        key={index}
                        title={e.title}
                        url={e.url}
                        description={e.description}
                        author={e.author}
                        publishedAt={e.publishedAt}
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