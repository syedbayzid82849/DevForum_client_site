// src/pages/AdminDashboard/ManageUsers.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(
                searchTerm
                    ? `/users/search?name=${searchTerm}`
                    : `/users`
            );
            return res.data;
        },
    });

    const handleMakeAdmin = async (id) => {
        try {
            await axiosSecure.patch(`/users/admin/${id}`);
            refetch();
        } catch (err) {
            console.error("Error making admin:", err);
        }
    };

    const handleRemoveAdmin = async (id) => {
        try {
            await axiosSecure.patch(`/users/remove-admin/${id}`);
            refetch();
        } catch (err) {
            console.error("Error removing admin:", err);
        }
    };


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered mb-4 w-full md:w-1/2"
            />

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Membership</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === "admin" ? (
                                        <button
                                            className="btn btn-xs btn-outline btn-error"
                                            onClick={() => handleRemoveAdmin(user._id)}
                                        >
                                            Cancel Admin
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-xs btn-outline"
                                            onClick={() => handleMakeAdmin(user._id)}
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {user.badge === "Gold" ? (
                                        <span className="badge badge-warning">Gold</span>
                                    ) : (
                                        <span className="badge badge-neutral">Bronze</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
