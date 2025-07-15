import { ThumbUpIcon, ChatAltIcon, ShareIcon, ThumbDownIcon } from '@heroicons/react/outline';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CommentModal from '../CommentModal/CommentModal';
import {
    FacebookShareButton,
} from 'react-share';
import { useNavigate } from 'react-router';

const PostCard = ({ post }) => {
    const navigate = useNavigate()
    const handlePostCard = () => {
        navigate(`/post/${post._id}`);
    }
    const { user } = useContext(AuthContext);
    console.log(user);
    const [upVoteCount, setUpVoteCount] = useState(post.upVote?.length || 0);
    const [downVoteCount, setDownVoteCount] = useState(post.downVote?.length || 0);
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    console.log(showModal);

    const handleUpVote = async () => {
        console.log('ok');
        if (!user) return;
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
                onClick={handlePostCard}
                className="max-w-3xl w-full mx-auto border rounded-xl p-4 bg-white shadow-md mb-4">
<div></div>

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
                        onClick={() => setShowModal(true)}
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
