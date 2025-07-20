// AllComments.jsx
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const feedbackOptions = [
    "Inappropriate Language",
    "Spam or Irrelevant",
    "Offensive Content",
];

const AllComments = () => {
    const { postId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [reported, setReported] = useState({});

    const { data: comments = [], refetch } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${postId}`);
            return res.data;
        },
    });

    const handleFeedbackChange = (commentId, feedback) => {
        setSelectedFeedback((prev) => ({ ...prev, [commentId]: feedback }));
    };

    const handleReport = async (commentId) => {
        const feedback = selectedFeedback[commentId];
        try {
            const res = await axiosSecure.patch(`/comments/report/${commentId}`, {
                feedback,
            });
            if (res.data.modifiedCount > 0) {
                setReported((prev) => ({ ...prev, [commentId]: true }));
                Swal.fire("Reported!", "Your report has been submitted.", "success");
                refetch();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const showModal = (text) => {
        Swal.fire({
            title: "Full Comment",
            text,
            confirmButtonText: "Close",
        });
    };

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">All Comments</h2>
            <table className="table w-full border">
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
                        const isReported = reported[comment._id] || comment.reported;
                        const feedback = selectedFeedback[comment._id];

                        const truncated =
                            comment.text.length > 20
                                ? `${comment.text.slice(0, 20)}...`
                                : comment.text;

                        return (
                            <tr key={comment._id}>
                                <td>{comment.email}</td>
                                <td>
                                    {comment.text.length > 20 ? (
                                        <>
                                            {truncated}{" "}
                                            <button
                                                onClick={() => showModal(comment.text)}
                                                className="text-blue-500 underline"
                                            >
                                                Read More
                                            </button>
                                        </>
                                    ) : (
                                        comment.text
                                    )}
                                </td>
                                <td>
                                    <select
                                        className="select select-sm select-bordered"
                                        onChange={(e) =>
                                            handleFeedbackChange(comment._id, e.target.value)
                                        }
                                        disabled={isReported}
                                        defaultValue=""
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
                                        disabled={!feedback || isReported}
                                        onClick={() => handleReport(comment._id)}
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
    );
};

export default AllComments;
