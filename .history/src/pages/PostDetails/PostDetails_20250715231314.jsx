// src/pages/PostDetails/PostDetails.jsx
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { ThumbUpIcon, ThumbDownIcon, ChatAltIcon } from "@heroicons/react/outline";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
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
        if (!user) return toast.error("Please login to upvote");
        await axiosSecure.put(`/posts/upvote/${id}`, { userId: user.uid });
        refetch();
    };

    // ✅ Handle Downvote
    const handleDownvote = async () => {
        if (!user) return toast.error("Please login to downvote");
        await axiosSecure.put(`/posts/downvote/${id}`, { userId: user.uid });
        refetch();
    };

    // ✅ Submit Comment
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("Please login to comment");
        if (!commentText.trim()) return;

        await axiosSecure.post("/comments", {
            postId: id,
            comment: commentText,
            email: user?.email,
        });

        setCommentText("");
        queryClient.invalidateQueries(["comments", id]);
    };

    const shareUrl = `${window.location.origin}/post/${id}`;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md mt-5">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={post.authorImage || "/default.jpg"}
                    alt="Author"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <h4 className="font-semibold text-black">{post.authorName || "Unknown"}</h4>
                    <p className="text-gray-500 text-sm">
                        {post.createdAt && formatDistanceToNow(new Date(post.createdAt))} ago
                    </p>
                </div>
            </div>

            {/* Post Content */}
            <h2 className="text-2xl font-bold mb-2 break-words text-black">{post.title}</h2>
            <p className="text-gray-600 mb-4 break-words">{post.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 my-2">
                {post.tags?.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Share Buttons */}
            <div className="flex gap-3 mb-6">
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>

            {/* Vote & Comment Count */}
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
            <form onSubmit={handleCommentSubmit} className="mb-6 text-black">
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
                <h3 className="text-lg font-semibold mb-2 text-black">All Comments</h3>
                {comments.map((comment, index) => (
                    <div key={index} className="border-t pt-2 mt-2">
                        <p className="text-sm font-medium text-black">{comment.email}</p>
                        <p className="text-gray-700">{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostDetails;
