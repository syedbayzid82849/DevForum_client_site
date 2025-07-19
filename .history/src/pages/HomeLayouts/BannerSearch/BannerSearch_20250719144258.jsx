import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BannerSearch = () => {
    const [searchTag, setSearchTag] = useState("");
    const axiosSecure = useAxiosSecure();

    // ⬇️ React Query
    const {
        data: searchResult = [],
        isLoading: searchLoading,
        isError: searchError,
        refetch,
    } = useQuery({
        queryKey: ["searchTag", searchTag],
        enabled: !!searchTag, // only fetch if searchTag is not empty
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/search?tag=${encodeURIComponent(searchTag)}`);
            return res.data;
        },
    });

    // ✅ Show log only when searchTag changes
    useEffect(() => {
        if (searchTag) {
            console.log("Search Tag updated:", searchTag);
        }
    }, [searchTag]);

    const handleSearch = (e) => {
        e.preventDefault();
        const value = e.target.search.value.trim();
        setSearchTag(value);
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by Tag"
                    className="input input-bordered"
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {searchLoading && <p>Loading...</p>}
            {searchError && <p>Something went wrong!</p>}
            {!searchLoading && searchResult?.length > 0 && (
                <div className="mt-4">
                    <h2>Search Results:</h2>
                    <ul className="list-disc ml-5">
                        {searchResult.map((post) => (
                            <li key={post._id}>{post.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BannerSearch;
