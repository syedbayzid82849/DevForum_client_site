import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportedCommends = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        axios.get("http://localhost:3000/reports", { withCredentials: true })
            .then(res => {
                setReports(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch reports:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading reports...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>
            {reports.length === 0 ? (
                <p>No reports found.</p>
            ) : (
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Comment ID</th>
                            <th className="p-2 border">Feedback</th>
                            <th className="p-2 border">Reporter Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={report._id}>
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{report.commentId}</td>
                                <td className="p-2 border">{report.feedback}</td>
                                <td className="p-2 border">{report.reporterEmail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReportedCommends;
