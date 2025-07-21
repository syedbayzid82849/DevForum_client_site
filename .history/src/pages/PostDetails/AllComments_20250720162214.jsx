import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const AllComments = () => {
    const { postId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [reportedComments, setReportedComments] = useState([]);
    const [modalComment, setModalComment] = useState(null);

    const { data: comments = [], isLoading } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${postId}`);
            return res.data;
        },
    });

    if (isLoading) {
        <LoadingSpinner></LoadingSpinner>                                                            
    }

    const handleReport = async (commentId) => {
        try {
            await axiosSecure.patch(`/comments/report/${commentId}`, {
                reporter-email: 'husains82849@gmai1.com';
                feedback: selectedFeedback[commentId]
            });
            Swal.fire("Reported!", "The comment has been reported.", "success");
            setReportedComments((prev) => [...prev, commentId]);
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", err.response?.data?.message || "Failed to submit report.", "error");

        }
    };

    const feedbackOptions = [
        "Inappropriate language",
        "Spam content",
        "Off-topic comment",
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">All Comments</h2>

            {comments.length === 0 && (
                <p className="text-gray-500 italic">No comments available yet.</p>
            )}

            {comments.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Comment</th>
                                <th>Feedback</th>
                                <th>Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((cmt) => (
                                <tr key={cmt._id}>
                                    <td>{cmt.email}</td>
                                    <td>
                                        {cmt.comment.length > 20 ? (
                                            <>
                                                {cmt.comment.slice(0, 20)}...
                                                <button
                                                    className="text-blue-600 underline ml-1"
                                                    onClick={() => setModalComment(cmt.comment)}
                                                >
                                                    Read More
                                                </button>
                                            </>
                                        ) : (
                                            cmt.comment
                                        )}
                                    </td>
                                    <td>
                                        <select
                                            className="select select-sm"
                                            onChange={(e) =>
                                                setSelectedFeedback({
                                                    ...selectedFeedback,
                                                    [cmt._id]: e.target.value,
                                                })
                                            }
                                            defaultValue=""
                                        >
                                            <option disabled value="">
                                                Choose Feedback
                                            </option>
                                            {feedbackOptions.map((opt, i) => (
                                                <option key={i}>{opt}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-error text-white"
                                            disabled={
                                                !selectedFeedback[cmt._id] ||
                                                reportedComments.includes(cmt._id)
                                            }
                                            onClick={() => handleReport(cmt._id)}
                                        >
                                            {reportedComments.includes(cmt._id)
                                                ? "Reported"
                                                : "Report"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Read More Modal */}
            {modalComment && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Full Comment</h3>
                        <p className="py-4">{modalComment}</p>
                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={() => setModalComment(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default AllComments;
