import React from "react";

export default function Result({ title, url, description, author, publishedAt }) {
    return (
        <div className="result">
            <h2>{title}</h2>
            <p>{description}</p>
            <p><strong>Author:</strong> {author ? author.join(', ') : 'Unknown'}</p>
            <p><strong>Published At:</strong> {new Date(publishedAt).toLocaleString()}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
    );
}