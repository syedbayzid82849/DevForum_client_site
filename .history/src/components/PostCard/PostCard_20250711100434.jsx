import React from 'react';
import { DotsHorizontalIcon, ThumbUpIcon, ChatAltIcon, ShareIcon } from '@heroicons/react/outline'; // Heroicons থেকে আইকন ইম্পোর্ট করুন (npm install @heroicons/react)

const PostCard = ({ userName, userImage, postText, postImage, timeAgo }) => {
    return (
        <div className="bg-white rounded-lg shadow-md max-w-xl mx-auto my-6 overflow-hidden">
            {/* Header Section */}
            <div className="flex items-center p-4">
                <img
                    src={userImage}
                    alt={userName}
                    className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                />
                <div className="flex-1">
                    <p className="font-semibold text-gray-800">{userName}</p>
                    <p className="text-gray-500 text-xs">{timeAgo}</p>
                </div>
                <DotsHorizontalIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>

            {/* Post Content */}
            <div className="px-4 py-2">
                <p className="text-gray-800 mb-2">{postText}</p>
                {postImage && (
                    <img
                        src={postImage}
                        alt="Post Content"
                        className="w-full h-auto object-cover rounded-lg mt-2"
                    />
                )}
            </div>

            {/* Likes/Comments Info */}
            <div className="flex items-center justify-between px-4 py-3 text-gray-600 text-sm border-b border-gray-200">
                <div className="flex items-center">
                    <ThumbUpIcon className="h-4 w-4 text-blue-600 mr-1" />
                    <span>{/* Dynamic likes count */} 163 likes</span>
                </div>
                <div>
                    <span>{/* Dynamic comments count */} 37 comments</span>
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