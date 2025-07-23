// Dashboard/MakeAnnouncement.jsx

import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../context/AuthContext";

const MakeAnnouncement = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const announcementData = {
            authorName: user?.displayName || "Unknown",
            authorImage: user?.photoURL || null,
            title: data.title,
            description: data.description,
            createdAt: new Date(),
        };

        try {
            const res = await axiosSecure.post("/announcements", announcementData);
            if (res.data.insertedId) {
                Swal.fire("Success!", "Announcement posted successfully.", "success");
                reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Failed to post announcement.", "error");
        }
    };

    return (
        <div className="w-[95%] md:max-w-7xl mt-7 h-full mx-auto my-auto items-center p-6  shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center ">📢 Make an Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-white">Author Name</span>
                    </label>
                    <input
                        type="text"
                        readOnly
                        className="input input-bordered w-full cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter announcement title"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter announcement details"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                    Post Announcement
                </button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;
