import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllTagsSection = ({ onTagClick }) => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axios.get("https://your-server-url.com/tags")
            .then(res => {
                setTags(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch tags", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center">Loading tags...</p>;

    return (
        <div className="my-6 px-4">
            <h2 className="text-xl font-semibold mb-3">🔖 Popular Tags</h2>
            <div className="flex flex-wrap gap-3">
                {tags.map((tag, i) => (
                    <button
                        key={i}
                        onClick={() => onTagClick(tag)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
                    >
                        #{tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllTagsSection;
