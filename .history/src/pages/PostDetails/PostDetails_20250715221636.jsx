// src/pages/PostDetails/PostDetails.jsx
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { ThumbUpIcon, ThumbDownIcon, ChatAltIcon } from "@heroicons/react/outline";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";

const PostDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext);
    const [commentText, setCommentText] = useState("");

    // ✅ Get Post by ID
    const { data: post = {}, refetch } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/${id}`);
            return res.data;
        },
    });
    console.log(object);

    // ✅ Get Comments for this post
    const { data: comments = [] } = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${id}`);
            return res.data;
        },
    });

    // ✅ Handle Upvote
    const handleUpvote = async () => {
        if (!user) return;
        await axiosSecure.put(`/posts/upvote/${id}`, { userId: user.uid });
        refetch();
    };

    // ✅ Handle Downvote
    const handleDownvote = async () => {
        if (!user) return;
        await axiosSecure.put(`/posts/downvote/${id}`, { userId: user.uid });
        refetch();
    };

    // ✅ Submit Comment
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        await axiosSecure.post("/comments", {
            postId: id,
            comment: commentText,
            email: user?.email,
        });

        setCommentText("");
        queryClient.invalidateQueries(["comments", id]);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.description}</p>

            <div className="flex gap-4 mb-6 text-sm text-gray-700">
                <button onClick={handleUpvote} className="flex items-center gap-1 text-blue-600">
                    <ThumbUpIcon className="h-4 w-4" /> {post?.upVote?.length || 0} Upvotes
                </button>
                <button onClick={handleDownvote} className="flex items-center gap-1 text-red-500">
                    <ThumbDownIcon className="h-4 w-4" /> {post?.downVote?.length || 0} Downvotes
                </button>
                <div className="flex items-center gap-1">
                    <ChatAltIcon className="h-4 w-4" /> {comments.length} Comments
                </div>
            </div>

            {/* Comment Box */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment..."
                    className="w-full border rounded p-3"
                ></textarea>
                <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                    Submit Comment
                </button>
            </form>

            {/* All Comments */}
            <div>
                <h3 className="text-lg font-semibold mb-2">All Comments</h3>
                {comments.map((comment, index) => (
                    <div key={index} className="border-t pt-2 mt-2">
                        <p className="text-sm font-medium">{comment.email}</p>
                        <p className="text-gray-700">{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostDetails;
