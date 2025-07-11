import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/";

const BannerSearch = ({ setSearchResult, setSearchLoading, setSearchError }) => {
    const [searchTag, setSearchTag] = useState("");
    const axiosSecure = useAxiosSecure();

    const handleSearch = async () => {
        if (!searchTag.trim()) return;
        setSearchLoading(true);
        setSearchError(false);
        try {
            const res = await axiosSecure.get(`/posts/search?tag=${encodeURIComponent(searchTag)}`);
            setSearchResult(res.data);
        } catch (error) {
            console.error("Search error", error);
            setSearchError(true);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleTagClick = (tag) => {
        setSearchTag(tag);
        handleSearch();
    };

    const { data: tags = [], isLoading: tagsLoading, isError: tagsError } = useQuery({
        queryKey: ["all-tags"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        }
    });

    if (tagsLoading) return <LoadingSpinner />;
    if (tagsError) return <p className="text-center text-red-500">Failed to load tags.</p>;

    return (
        <div className="text-center">
            <input
                type="text"
                placeholder="Search by tag..."
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                className="input input-bordered w-60"
            />
            <button onClick={handleSearch} className="btn btn-primary sm:mt-2 ml-2">
                Search
            </button>

            {/* Popular Tags */}
            <div className="my-6 px-4">
                <h2 className="text-xl font-semibold mb-3 text-left">🔖 Popular Tags</h2>
                <div className="flex flex-wrap gap-3 justify-center">
                    {tags.map((tag, i) => (
                        <button
                            key={i}
                            onClick={() => handleTagClick(tag)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default BannerSearch;