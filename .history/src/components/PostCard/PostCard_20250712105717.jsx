// src/pages/HomeLayouts/AllPosts/PostCard.jsx
import { FaThumbsUp, FaThumbsDown, FaCommentDots } from "react-icons/fa";

const PostCard = ({ post }) => {
    return (
        <div className="w-3/5 mx-auto border rounded-xl p-4 bg-white shadow-md space-y-2">
            {/* Author Info */}
            <div className="flex items-center gap-3">
                <img
                    src={post.authorImage}
                    alt="Author"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h4 className="font-semibold">{post.authorName}</h4>
                    <small className="text-gray-500">
                        {new Date(post.createdAt).toLocaleString()}
                    </small>
                </div>
            </div>

            {/* Title */}
           <div></div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
                {post.tags?.map((tag, idx) => (
                    <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Reactions */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <div className="flex gap-4 items-center">
                    <span className="flex items-center gap-1">
                        <FaThumbsUp /> {post.upVotes?.length || 0}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaThumbsDown /> {post.downVotes?.length || 0}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaCommentDots /> {post.commentCount || 0}
                    </span>
                </div>
                <button className="text-blue-600 hover:underline">View Details</button>
            </div>
        </div>
    );
};

export default PostCard;
