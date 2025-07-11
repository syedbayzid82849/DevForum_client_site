import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";


function BannerSearch() {
    const [searchTag, setSearchTag] = useState("");

    // useQuery টা শুধু তখনই fetch করবে যখন searchTag ভ্যালু থাকবে
    const { data: results = [], isLoading, isError, refetch } = useQuery(
        ["posts", searchTag],
        () => fetchPostsByTag(searchTag),
        {
            enabled: false, // শুরুতে অটো fetch বন্ধ থাকবে
        }
    );

    const handleSearch = () => {
        if (searchTag.trim()) {
            refetch();
        }
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
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error occurred while fetching posts.</p>}
                {!isLoading && results.length === 0 && <p>No results found.</p>}
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
