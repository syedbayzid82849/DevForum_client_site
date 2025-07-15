import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/outline';


const PostCard = ({ post }) => {


    return (
        <>
            <div className="max-w-3xl w-full mx-auto border rounded-xl p-4 bg-white shadow-md mb-4">
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
                        <span>{post.downVote.length} like</span>
                        <ThumbDownIcon className="h-4 w-4 text-red-600 mr-1 ml-4" />
                        <span>{post.upVote.length} dislike</span>
                    </div>

                    <div>
                        <span>{post.commentCount || 0} comment</span>
                    </div>

                </div>

            </div>
        </>
    );
};

export default PostCard;
