import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ReportedCommends = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // ✅ Fetch reports using React Query
    const { data: reports = [], isLoading } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosSecure.get("/reports", { withCredentials: true });
            return res.data;
        }
    });

    // ✅ Delete Comment Mutation
    const deleteCommentMutation = useMutation({
        mutationFn: async (commentId) => {
            return await axiosSecure.delete(`/comments/deleteComments/${commentId}`, { withCredentials: true });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reports']);
            Swal.fire("Deleted!", "The comment has been deleted.", "success");
        },
        onError: () => {
            Swal.fire("Error", "Failed to delete comment.", "error");
        }
    });

    const handleDeleteComment = async (commentId) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this comment permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirm.isConfirmed) {
            deleteCommentMutation.mutate(commentId);
        }
    };

    // ✅ Ignore Report Mutation
    const ignoreReportMutation = useMutation({
        mutationFn: async (reportId) => {
            return await axiosSecure.delete(`/reports/${reportId}`, { withCredentials: true });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reports']);
            Swal.fire("Ignored", "Report has been ignored.", "info");
        },
        onError: () => {
            Swal.fire("Error", "Failed to ignore report.", "error");
        }
    });

    const handleIgnore = (reportId) => {
        ignoreReportMutation.mutate(reportId);
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>
            {reports.length === 0 ? (
                <p>No reports found.</p>
            ) : (
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border text-black">#</th>
                            <th className="p-2 border text-black">Comment ID</th>
                            <th className="p-2 border text-black">Feedback</th>
                            <th className="p-2 border text-black">Reporter</th>
                            <th className="p-2 border text-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={report._id}>
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{report.commentId}</td>
                                <td className="p-2 border">{report.feedback}</td>
                                <td className="p-2 border">{report.reporterEmail}</td>
                                <td className="p-2 border space-x-2 mx-auto">
                                    <button
                                        onClick={() => handleDeleteComment(report.commentId)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete Comment
                                    </button>
                                    <button
                                        onClick={() => handleIgnore(report._id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Ignore
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReportedCommends;
