// PostCard.jsx
import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const feedbackOptions = [
    "Inappropriate language",
    "Spam or irrelevant",
    "Offensive or harmful"
];

const PostCard = () => {
    const { postId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [reportedComments, setReportedComments] = useState({});
    const [modalComment, setModalComment] = useState("");

    const { data: comments = [], isLoading } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${postId}`);
            return res.data;
        }
    });

    const handleFeedbackChange = (commentId, feedback) => {
        setSelectedFeedback(prev => ({
            ...prev,
            [commentId]: feedback
        }));
    };

    const handleReport = async (commentId) => {
        try {
            await axiosSecure.patch(`/comments/report/${commentId}`, {
                feedback: selectedFeedback[commentId]
            });
            setReportedComments(prev => ({
                ...prev,
                [commentId]: true
            }));
            Swal.fire("Reported!", "The comment has been reported.", "success");
        } catch (error) {
            Swal.fire("Error", "Failed to report the comment.", "error");
        }
    };

    const renderCommentText = (text, id) => {
        if (text.length <= 20) return text;
        return (
            <>
                {text.slice(0, 20)}...
                <button
                    onClick={() => setModalComment(text)}
                    className="text-blue-500 ml-1 underline"
                >
                    Read More
                </button>
            </>
        );
    };

    if (isLoading) return <p>Loading comments...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Comments</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => {
                            const isReported = reportedComments[comment._id];
                            const feedback = selectedFeedback[comment._id] || "";
                            return (
                                <tr key={comment._id}>
                                    <td>{comment.email}</td>
                                    <td>{renderCommentText(comment.text, comment._id)}</td>
                                    <td>
                                        <select
                                            className="select select-bordered"
                                            value={feedback}
                                            onChange={(e) =>
                                                handleFeedbackChange(comment._id, e.target.value)
                                            }
                                            disabled={isReported}
                                        >
                                            <option value="">Select feedback</option>
                                            {feedbackOptions.map((fb, idx) => (
                                                <option key={idx} value={fb}>
                                                    {fb}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleReport(comment._id)}
                                            disabled={!feedback || isReported}
                                        >
                                            {isReported ? "Reported" : "Report"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Read More Modal */}
            {modalComment && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-md w-11/12 md:w-1/2">
                        <h3 className="text-xl font-bold mb-2">Full Comment</h3>
                        <p className="mb-4">{modalComment}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => setModalComment("")}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
