import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ReportedCommends = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const fetchReports = async () => {
        try {
            const res = await axiosSecure.get("/reports", { withCredentials: true });
            setReports(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch reports:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // Delete Comment by ID
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
            try {
                const res = await axiosSecure.delete(`/comments/${commentId}`, { withCredentials: true });
                if (res.data?.deletedCount > 0) {
                    await axiosSecure.delete(`/reports/by-comment/${commentId}`, { withCredentials: true });
                    fetchReports(); // refresh
                    Swal.fire("Deleted!", "The comment has been deleted.", "success");
                }
            } catch (err) {
                console.error("Delete failed", err);
                Swal.fire("Error", "Failed to delete comment.", "error");
            }
        }
    };

    // Ignore Report
    const handleIgnore = async (reportId) => {
        try {
            const res = await axiosSecure.delete(`/reports/${reportId}`, { withCredentials: true });
            if (res.data?.deletedCount > 0) {
                fetchReports();
                Swal.fire("Ignored", "Report has been ignored.", "info");
            }
        } catch (err) {
            console.error("Ignore failed", err);
            Swal.fire("Error", "Failed to ignore report.", "error");
        }
    };

    if (loading) return <lod;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>
            {reports.length === 0 ? (
                <p>No reports found.</p>
            ) : (
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Comment ID</th>
                            <th className="p-2 border">Feedback</th>
                            <th className="p-2 border">Reporter</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={report._id}>
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{report.commentId}</td>
                                <td className="p-2 border">{report.feedback}</td>
                                <td className="p-2 border">{report.reporterEmail}</td>
                                <td className="p-2 border space-x-2">
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
