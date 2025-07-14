import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CommentModal = ({ postId, onClose }) => {
    const axiosSecure = useAxiosSecure();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axiosSecure.get(`/comments/${postId}`).then(res => setComments(res.data));
    }, [postId, axiosSecure]);

    const handleSubmit = async () => {
        const commentData = {
            postId,
            text: newComment,
            userName: "Anonymous",
        };
        await axiosSecure.post("/comments", commentData);
        setNewComment("");
        const res = await axiosSecure.get(`/comments/${postId}`);
        setComments(res.data);
    };

    return (
        <div className="fixed inset-0 bg-ga bg-opacity-transparent flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                <div className="h-40 overflow-y-auto space-y-2 mb-4">
                    {comments.map((comment, index) => (
                        <p key={index} className="text-gray-700 border-b pb-1">{comment.userName}: {comment.text}</p>
                    ))}
                </div>
                <textarea
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full border rounded p-2 mb-2"
                    placeholder="Write your comment..."
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-1 bg-gray-400 rounded text-white">Close</button>
                    <button onClick={handleSubmit} className="px-4 py-1 bg-blue-600 rounded text-white">Post</button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
