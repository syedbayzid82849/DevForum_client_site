import React from 'react';
import { DotsHorizontalIcon, ThumbUpIcon, ChatAltIcon, ShareIcon } from '@heroicons/react/outline'; 

const PostCard = ({ post }) => { 
    const {
        authorImage,
        authorName,
        title,
        description,
        upVote,
        downVote,
        createdAt
    } = post;
    

    const formatTimeAgo = (isoDate) => {
        const date = new Date(isoDate);
        const now = new Date();
        const seconds = Math.round((now - date) / 1000);
        const minutes = Math.round(seconds / 60);
        const hours = Math.round(minutes / 60);
        const days = Math.round(hours / 24);

        if (seconds < 60) return `${seconds}s ago`;
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 30) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const timeAgoString = formatTimeAgo(createdAt);

    const votes = upVote?.length + downVote?.length;
    console.log(votes);
    const likesCount = upVote ? upVote.length : 0;
    const commentsCount = 37;
    return (
        <div className="bg-white rounded-lg shadow-md max-w-xl mx-auto my-6 overflow-hidden w-full">
            {/* Header Section */}
            <div className="flex items-center p-4">
                <img
                    src={authorImage || 'https://i.ibb.co/CByG1gV/user-avatar.png'} 
                    alt={authorName || 'Author'}
                    className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                />
                <div className="flex-1">
                    <p className="font-semibold text-gray-800">{authorName || 'Unknown Author'}</p>
                    <p className="text-gray-500 text-xs">{timeAgoString}</p>
                </div>
                <DotsHorizontalIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>

            {/* Post Content */}
            <div className="px-4 py-2">
                <h3 className="text-xl font-bold mb-1 text-gray-900">{title}</h3> {/* টাইটেল যোগ করা হয়েছে */}
                <p className="text-gray-800 mb-2">{description}</p> {/* ডেসক্রিপশনকে পোস্ট টেক্সট হিসেবে ব্যবহার */}
                {/* যদি আপনার পোস্টের JSON এ একটি 'imageUrl' ফিল্ড থাকত, তাহলে সেটি এখানে ব্যবহার করা যেত */}
                {/* {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Post Content"
                        className="w-full h-auto object-cover rounded-lg mt-2"
                    />
                )} */}
            </div>

            {/* Likes/Comments Info */}
            <div className="flex items-center justify-between px-4 py-3 text-gray-600 text-sm border-b border-gray-200">
                <div className="flex items-center">
                    <ThumbUpIcon className="h-4 w-4 text-blue-600 mr-1" />
                    <span>{likesCount} likes</span>
                </div>
                <div>
                    <span>{commentsCount} comments</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around p-2">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-grow justify-center transition-colors duration-200">
                    <ThumbUpIcon className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold text-gray-600">Like</span>
                </button>
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-grow justify-center transition-colors duration-200">
                    <ChatAltIcon className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold text-gray-600">Comment</span>
                </button>
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-grow justify-center transition-colors duration-200">
                    <ShareIcon className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold text-gray-600">Share</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;