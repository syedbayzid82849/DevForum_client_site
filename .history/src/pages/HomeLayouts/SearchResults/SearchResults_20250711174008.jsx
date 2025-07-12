// src/components/SearchResults/SearchResults.jsx

import PostCard from "../../../components/PostCard/PostCard";

const SearchResults = ({ results = [], isLoading, isError }) => {
    if (isLoading) {
        return <p className="text-center mt-4">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500 mt-4">Something went wrong while searching.</p>;
    }

    if (results.length === 0) {
        return <p className="text-center mt-4">No posts found for this tag.</p>;
    }

    return (
        <div className="mt-6 max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">🔍 Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {results.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
