// src/components/SearchResults/SearchResults.jsx

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
        <div className="mt-6 px-4">
            <h2 className="text-xl font-semibold mb-4">🔍 Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((post) => (
                    <PostCard
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
