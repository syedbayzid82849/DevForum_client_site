// AllComments.jsx
import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const feedbackOptions = [
    "Inappropriate language",
    "Spam or irrelevant",
    "Harassment or abuse",
];

const AllComments = () => {
    const { postId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [reportedIds, setReportedIds] = useState({});
    const [modalComment, setModalComment] = useState(null);

    const { data: comments = [], refetch } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${postId}`);
            return res.data;
        },
    });

    const handleFeedbackChange = (commentId, value) => {
        setSelectedFeedback((prev) => ({ ...prev, [commentId]: value }));
    };

    const handleReport = async (comment) => {
        const payload = {
            commentId: comment._id,
            postId,
            feedback: selectedFeedback[comment._id],
            commentText: comment.comment,
            commenter: comment.email,
        };

        const res = await axiosSecure.post("/reports", payload);
        if (res.data.insertedId) {
            Swal.fire("Reported!", "The comment has been reported.", "success");
            setReportedIds((prev) => ({ ...prev, [comment._id]: true }));
        }
    };

    return (
        <div className="overflow-x-auto mt-6 px-4">
            <h2 className="text-xl font-semibold mb-4">All Comments</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Comment</th>
                        <th>Feedback</th>
                        <th>Report</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment) => {
                        const text = comment.comment;
                        const isLong = text.length > 20;
                        const displayed = isLong ? `${text.slice(0, 20)}...` : text;

                        return (
                            <tr key={comment._id}>
                                <td>{comment.email}</td>
                                <td>
                                    {displayed}
                                    {isLong && (
                                        <button
                                            className="text-blue-500 ml-2"
                                            onClick={() => setModalComment(text)}
                                        >
                                            Read More
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <select
                                        className="select select-sm"
                                        onChange={(e) =>
                                            handleFeedbackChange(comment._id, e.target.value)
                                        }
                                        value={selectedFeedback[comment._id] || ""}
                                    >
                                        <option disabled value="">
                                            Select Feedback
                                        </option>
                                        {feedbackOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning"
                                        disabled={
                                            !selectedFeedback[comment._id] || reportedIds[comment._id]
                                        }
                                        onClick={() => handleReport(comment)}
                                    >
                                        {reportedIds[comment._id] ? "Reported" : "Report"}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Modal */}
            {modalComment && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg max-w-md w-full">
                        <h3 className="font-bold text-lg mb-2">Full Comment</h3>
                        <p className="mb-4">{modalComment}</p>
                        <button
                            onClick={() => setModalComment(null)}
                            className="btn btn-sm btn-error"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllComments;
