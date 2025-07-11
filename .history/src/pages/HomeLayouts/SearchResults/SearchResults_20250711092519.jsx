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
                    <div key={post._id} className="card bg-white p-4 shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                            <img src={post.authorImage} alt="Author" className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-medium">{post.authorName}</span>
                        </div>
                        <h2 className="text-xl font-bold mb-1">{post.title}</h2>
                        <p className="text-sm text-gray-600 mb-2">Tags: {post.tags?.join(", ")}</p>
                        <p className="text-sm text-gray-500">
                            Votes: {post.upVotes?.length - post.downVotes?.length || 0} | Comments: {post.commentCount || 0}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
