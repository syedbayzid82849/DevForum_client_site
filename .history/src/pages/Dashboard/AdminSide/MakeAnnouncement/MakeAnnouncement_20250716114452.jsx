// src/pages/Admin/MakeAnnouncement.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MakeAnnouncement = () => {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure()

    const mutation = useMutation({
        mutationFn: async (announcement) => {
            const res = await axios.post("http://localhost:3000/announcements", announcement);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Announcement added successfully!");
            reset();
        },
        onError: () => {
            toast.error("Failed to add announcement.");
        }
    });

    const onSubmit = (data) => {
        setLoading(true);
        const newAnnouncement = {
            authorName: data.authorName,
            authorImage: data.authorImage,
            title: data.title,
            description: data.description,
            createdAt: new Date(),
        };
        mutation.mutate(newAnnouncement);
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">📢 Make an Announcement</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Author Name</label>
                    <input
                        {...register("authorName", { required: true })}
                        type="text"
                        placeholder="Admin Name"
                        className="w-full input input-bordered"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Author Image URL</label>
                    <input
                        {...register("authorImage", { required: true })}
                        type="text"
                        placeholder="https://..."
                        className="w-full input input-bordered"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                        {...register("title", { required: true })}
                        type="text"
                        placeholder="Short Title"
                        className="w-full input input-bordered"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Announcement details..."
                        className="w-full textarea textarea-bordered"
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Publishing..." : "Publish"}
                </button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;
