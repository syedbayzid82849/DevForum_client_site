import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllTagsSection = ({ onTagClick }) => {
    const axiosSecure = useAxiosSecure();

    const { data: tags = [], isLoading, isError } = useQuery({
        queryKey: ["all-tags"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center">Loading tags...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load tags.</p>;

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
