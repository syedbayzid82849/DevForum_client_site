import { ThumbUpIcon, ChatAltIcon, ShareIcon, ThumbDownIcon } from '@heroicons/react/outline';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
    FacebookShareButton,
} from 'react-share';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const PostCard = ({ post }) => {
    const navigate = useNavigate()
    const handlePostCard = () => {
        navigate(`/post/${post._id}`);
    }
    const handleCommend = () => {

    }
    const { user } = useContext(AuthContext);
    const [upVoteCount, setUpVoteCount] = useState(post.upVote?.length || 0);
    const [downVoteCount, setDownVoteCount] = useState(post.downVote?.length || 0);
    const axiosSecure = useAxiosSecure();

    // get how many commended in post 
    const { data: comments = [] } = useQuery({
        queryKey: ["comments", post._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${post._id}`);
            return res.data;
        }
    });


    const handleUpVote = async () => {
        if (!user){
            navigate('')
        };
        try {
            await axiosSecure.put(`/posts/upvote/${post._id}`, { userId: user.uid });
            setUpVoteCount(prev => prev + 1);
            setDownVoteCount(prev => Math.max(0, prev - (post.downVote?.includes(user.uid) ? 1 : 0)));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownVote = async () => {
        if (!user) return;
        try {
            await axiosSecure.put(`/posts/downvote/${post._id}`, { userId: user.uid });
            setDownVoteCount(prev => prev + 1);
            setUpVoteCount(prev => Math.max(0, prev - (post.upVote?.includes(user.uid) ? 1 : 0)));
        } catch (err) {
            console.error(err);
        }
    };

    const shareUrl = `${window.location.origin}/posts/${post._id}`;
    const shareTitle = post.title;

    return (
        <>
            <div
                className="max-w-3xl w-full mx-auto border rounded-xl p-4 bg-white shadow-md mb-4">
                <div
                    onClick={handlePostCard}
                >
                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                        <img
                            src={post.authorImage}
                            alt="Author"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <h4 className="font-semibold text-black">{post.authorName}</h4>
                            <small className="text-gray-500">
                                {new Date(post.createdAt).toLocaleString()}
                            </small>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <h3 className="text-xl font-bold mt-2 text-gray-800 line-clamp-1">{post.title}</h3>
                        <p className="text-gray-600 mt-1 break-words line-clamp-2">{post.description}</p>
                    </div>

                    <div>
                        <img src={post.image || 'https://i.ibb.co/W4Yjw790/default-image.png'} alt={post.title} className="w-full h-48 object-cover rounded-md" />
                    </div>

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

                    {/* Likes/Comments Info */}
                    <div className="flex items-center justify-between px-4 py-3 text-gray-600 text-sm border-b border-gray-200">
                        <div className="flex items-center">
                            <ThumbUpIcon className="h-4 w-4 text-blue-600 mr-1" />
                            <span>{upVoteCount} like</span>
                            <ThumbDownIcon className="h-4 w-4 text-red-600 mr-1 ml-4" />
                            <span>{downVoteCount} dislike</span>
                        </div>

                        <div>
                            <span>{comments.length || 0} comment</span>
                        </div>

                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-around p-2 overflow-auto">
                    <button onClick={() => handleUpVote()} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-grow justify-center transition-colors duration-200">
                        <ThumbUpIcon className="h-5 w-5 text-gray-600" />
                        <span className="font-semibold text-gray-600">Like</span>
                    </button>
                    <button onClick={() => handleDownVote()} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-grow justify-center transition-colors duration-200">
                        <ThumbDownIcon className="h-5 w-5 text-gray-600" />
                        <span className="font-semibold text-gray-600">Dislike</span>
                    </button>
                    <button
                        onClick={() => handleCommend()}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-grow justify-center transition-colors duration-200">
                        <ChatAltIcon className="h-5 w-5 text-gray-600" />
                        <span className="font-semibold text-gray-600">Comment</span>
                    </button>
                    <FacebookShareButton url={shareUrl} quote={shareTitle}>
                        <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-grow justify-center transition-colors duration-200">
                            <ShareIcon className="h-5 w-5 text-blue-700" />
                            <span className="font-semibold text-gray-700">Share</span>
                        </div>
                    </FacebookShareButton>
                </div>
            </div>
        </>
    );
};

export default PostCard;
