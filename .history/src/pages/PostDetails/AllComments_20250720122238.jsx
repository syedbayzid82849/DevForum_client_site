// src/components/AllComments.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllComments = ({ postId }) => {
    const axiosSecure = useAxiosSecure();

    const { data: comments = [] } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${postId}`);
            return res.data;
        },
    });

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-black">All Comments</h3>
            {comments.map((comment, index) => (
                <div key={index} className="border-t pt-2 mt-2">
                    <p className="text-sm font-medium text-black break-words">{comment.email}</p>
                    <p className="text-gray-700 break-words">{comment.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default AllComments;
