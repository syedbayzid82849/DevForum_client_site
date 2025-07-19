import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const BannerSearch = ({ setSearchResult, setSearchLoading, setSearchError }) => {
    const [searchTag, setSearchTag] = useState("");
    const axiosSecure = useAxiosSecure();

    // 🔍 Search query
    const {
        data: searchData = [],
        isLoading: isSearchLoading,
        isError: isSearchError,
        refetch: refetchSearch,
    } = useQuery({
        queryKey: ["search-posts", searchTag],
        enabled: false, // Only fetch on click
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/search?tag=${encodeURIComponent(searchTag)}`);
            return ;
        },
    });
    console.log(searchTag);

    // 🔄 Reflect to parent
    useEffect(() => {
        setSearchResult(searchData);
    }, [searchData, setSearchResult]);

    useEffect(() => {
        setSearchLoading(isSearchLoading);
    }, [isSearchLoading, setSearchLoading]);

    useEffect(() => {
        setSearchError(isSearchError);
    }, [isSearchError, setSearchError]);

    const handleSearch = () => {
        if (!searchTag.trim()) return;
        refetchSearch();
    };

    const handleTagClick = (tag) => {
        setSearchTag(tag);
        refetchSearch(); // search immediately
    };

    const {
        data: tags = [],
        isLoading: tagsLoading,
        isError: tagsError
    } = useQuery({
        queryKey: ["all-tags"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        },
    });

    if (tagsLoading) return <LoadingSpinner />;
    if (tagsError) return <p className="text-center text-red-500">Failed to load tags.</p>;

    return (
        <div className="text-center">
            <div className="relative w-60 mx-auto">
                <input
                    type="text"
                    placeholder="Search by tag..."
                    value={searchTag}
                    onChange={(e) => setSearchTag(e.target.value)}
                    className="input input-bordered w-full pr-10"
                />
                {searchTag && (
                    <button
                        onClick={() => setSearchTag("")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
                        title="Clear"
                    >
                        &times;
                    </button>
                )}
            </div>
            <button onClick={handleSearch} className="btn btn-primary sm:mt-2 ml-2">
                Search
            </button>

            {/* Popular Tags */}
            <div className="my-6 px-4">
                <h2 className="text-xl font-semibold mb-3 text-left">🔖 Popular Tags</h2>
                <div className="flex flex-wrap gap-3 justify-center">
                    {tags.map((tagObj, i) => (
                        <button
                            key={tagObj._id || i}
                            onClick={() => handleTagClick(tagObj.tag)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
                        >
                            #{tagObj.tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerSearch;
