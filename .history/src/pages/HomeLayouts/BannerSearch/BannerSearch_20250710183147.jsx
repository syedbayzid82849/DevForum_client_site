// BannerSearch.jsx
import React, { use, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function BannerSearch() {
    const [searchTag, setSearchTag] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleSearch = async () => {
        if (!searchTag.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`/posts/search?tag=${encodeURIComponent(searchTag)}`);
            setResults(response.data);
        } catch (error) {
            console.error("Search error:", error);
            setResults([]);
        }
        setLoading(false);
    };

    return (
        <div style={{ marginTop: "1rem" }}>
            <input
                type="text"
                placeholder="Search by tag..."
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                style={{ padding: "0.5rem", width: "250px" }}
            />
            <button onClick={handleSearch} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
                Search
            </button>

            <div style={{ marginTop: "1rem" }}>
                {loading && <p>Loading...</p>}
                {!loading && results.length === 0 && <p>No results found.</p>}
                <ul>
                    {results.map((post) => (
                        <li key={post._id} style={{ marginBottom: "1rem" }}>
                            <h4>{post.title}</h4>
                            <p>Tags: {post.tags.join(", ")}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BannerSearch;
